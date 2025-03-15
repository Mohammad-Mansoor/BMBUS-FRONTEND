import {
  Form,
  Input,
  Button,
  Card,
  AutocompleteItem,
  Autocomplete,
  Chip,
  Tooltip,
  addToast,
  Spinner,
} from "@heroui/react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { IoMdArrowRoundForward } from "react-icons/io";
import { IoArrowBack } from "react-icons/io5";
import { Link, useNavigate, useParams } from "react-router-dom";
import { MdDelete, MdStopScreenShare } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import {
  createOperatorRoute,
  getCities,
  getRoute,
  updateOperatorRoute,
} from "../../services/operator-routes-service";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import { myFilter } from "../../utils/myFilterFunctionForAutomcomplete";

function CreateRoute() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const [creatingRoute, setCreatingRoute] = useState(false);
  const [origin, setOrigin] = useState("");
  const [destination, setDistination] = useState("");
  const [totalDistance, setTotalDistance] = useState("");
  const [status, setStatus] = useState("");
  const [stops, setStops] = useState([]);
  const [city, setCity] = useState("");
  const [stopOrder, setStopOrder] = useState("");
  const [stopType, setStopType] = useState("");
  const [translations, setTranslations] = useState({
    en: "",
    ps: "",
    fa: "",
  });
  const [stopErrors, setStopErrors] = useState({
    cityError: "",
    orderError: "",
    typeError: "",
  });
  const { id } = useParams();
  console.log(typeof id, "this is the type of id ");

  useEffect(() => {
    const getRoutee = async () => {
      try {
        const res = await getRoute(id);
        setStops(res.data.stops);
        setDistination(res.data.destination.id);
        setOrigin(res?.data?.origin?.id);
        setTotalDistance(res?.data?.total_distance_km);
        setStatus(res?.data?.status);
        // setEn(res?.data?.name);
        handleTranslationChange("en", res?.data?.translations?.en?.name);
        handleTranslationChange("ps", res?.data?.translations?.ps?.name);
        handleTranslationChange("fa", res?.data?.translations?.fa?.name);
        console.log(res.data, "this is the single route");
      } catch (error) {
        console.log(error);
      }
    };
    if (id == "null") {
      return;
    } else {
      getRoutee();
    }
  }, [id, i18n.language]);

  const {
    isLoading: citiesLoading,
    data: cities,
    error: citiesError,
  } = useQuery({
    queryKey: ["cities", i18n.language],
    queryFn: getCities,
  });

  // console.log("these are citites see this: ", citiess);
  const handleValidation = () => {
    let newErrors = {};
    if (!city) {
      newErrors.city = "Stop City is required!";
    }

    // Validate Stop Order
    if (!stopOrder) {
      newErrors.stopOrder = "Stop Order is required!";
    } else if (isNaN(stopOrder)) {
      newErrors.stopOrder = "Stop Order must be a number!";
    }

    // Validate Stop Type
    if (!stopType) {
      newErrors.stopType = "Stop Type is required!";
    }

    setStopErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const routeStatuses = [
    { name: "active", id: 1 },
    { name: "inactive", id: 2 },
  ];
  const stopTypes = [
    { name: "Major", id: 1 },
    { name: "Rest", id: 2 },
    { name: "Washroom", id: 3 },
  ];

  const resetStopFields = () => {
    setStopOrder("");
    setStopType("");
    setCity("");
  };

  const removeStop = (index) => {
    const updatedStops = stops.filter((s, i) => i !== index);
    setStops(updatedStops);
  };
  const resetrouteFields = () => {
    setOrigin("");
    setStatus("");
    setTotalDistance("");
    setStops([]);
    setDistination("");
    handleTranslationChange("en", "");
    handleTranslationChange("ps", "");
    handleTranslationChange("fa", "");
  };

  const {
    isLoading: updatingRoute,
    mutate: updateMutate,
    error: updateError,
  } = useMutation({
    mutationFn: async (payload) => {
      setCreatingRoute(true);
      try {
        const res = await updateOperatorRoute(id, payload);

        console.log("updating route");
        return res;
      } catch (error) {
        throw error;
      }
    },
    onSuccess: (data) => {
      console.log(data);
      addToast({
        title: "Update Route",
        description: "Route Updated Successfully",
        variant: "solid",
        color: "success",
      });

      setCreatingRoute(false);
      queryClient.invalidateQueries({ queryKey: ["routes"] });
      navigate("/operator-routes");
    },
    onError: (error) => {
      console.log(error);
      addToast({
        title: "Failed to Update Route",
        description: "Oops, there is an issue with updating the route",
        variant: "solid",
        color: "danger",
      });
      setCreatingRoute(false);
      resetrouteFields();
    },
  });

  const { isLoading, mutate, error } = useMutation({
    mutationFn: async (payload) => {
      setCreatingRoute(true);

      const res = await createOperatorRoute(payload);
      return res;
    },
    onSuccess: (data) => {
      addToast({
        title: "Route Created",
        description: "Route Successfully Created",
        color: "success",
        variant: "solid",
      });

      resetrouteFields();
      setCreatingRoute(false);
      queryClient.invalidateQueries({ queryKey: ["routes"] });
      navigate("/operator-routes");

      console.log("Post created successfully:", data);
    },
    onError: (error) => {
      addToast({
        title: "Error",
        description: `${error.response.data.message}`,
        color: "danger",
        variant: "solid",
      });

      setCreatingRoute(false);
      console.error("Error creating post:", error);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formValuesObject = Object.fromEntries(formData);
    const payload = {
      translations: {
        en: { name: formValuesObject.en },
        ps: { name: formValuesObject.ps },
        fa: { name: formValuesObject.fa },
      },
      destination,
      origin,
      status,
      total_distance_km: totalDistance,
      stops,
    };
    if (id == "null") {
      mutate(payload);
    } else {
      updateMutate(payload);
    }
  };

  const handleTranslationChange = (field, value) => {
    setTranslations((prev) => ({ ...prev, [field]: value }));
  };

  const handleStopAdd = () => {
    console.log({ city, stopOrder, stopType });
    handleValidation();

    if (!city || !stopOrder || !stopType) {
      return;
    }
    setStops((prev) => [
      ...prev,
      { city, stop_order: stopOrder, stop_type: stopType },
    ]);
    resetStopFields();
  };
  return (
    <div className="w-full max-h-[92vh] h-full overflow-y-auto bg-gray-50 dark:bg-slate-800 rounded-md">
      <div className="w-full  py-1 px-3">
        <div className="my-2 flex items-center justify-between  ">
          <div>
            <h1 className="text-[24px]">
              {t("createOperatorPageValues.title")}
            </h1>
          </div>
          <Link
            to="/operator-routes "
            className="flex items-center gap-2 text-blue-500 hover:text-blue-400 hover:tracking-wider transition-all duration-300"
          >
            <h1 className="flex items-center">
              {t("createOperatorPageValues.goback")}
            </h1>
            {i18n.language == "en" ? (
              <IoMdArrowRoundForward size={15} className="mt-[6px]" />
            ) : (
              <IoArrowBack size={15} className="mt-[6px]" />
            )}
          </Link>
        </div>
        <Card
          radius="md"
          className="max-h-full w-full overflow-y-auto px-4 py-2"
        >
          <div className="w-full grid grid-cols-12 items-center gap-4">
            <div className="col-span-12">
              <h1 className="text-[20px] text-gray-500">
                {t("createOperatorPageValues.basic_information")}
              </h1>
            </div>
          </div>
          <Form
            onSubmit={handleSubmit}
            className="col-span-12 grid grid-cols-12 gap-4 pb-4 space-y-4"
          >
            <div className="col-span-12 md:col-span-6 lg:col-span-4 mt-4">
              <Input
                value={translations.en}
                required
                name="en"
                isClearable
                radius="sm"
                className="w-full dark:text-white !h-[40px] "
                placeholder={t("createOperatorPageValues.en_name_placeholder")}
                type="text"
                variant="bordered"
                color="default"
                onChange={(e) => {
                  handleTranslationChange("en", e.target.value);
                }}
                onClear={() => handleTranslationChange("en", "")}
                errorMessage={({ validationDetails }) => {
                  if (validationDetails.valueMissing) {
                    return t("createOperatorPageValues.en_validationError");
                  }
                }}
                label={t("createOperatorPageValues.en_name")}
                labelPlacement="outside"
              />
            </div>
            <div className="col-span-12 md:col-span-6 lg:col-span-4 mt-4 ">
              <Input
                value={translations.ps}
                required
                name="ps"
                isClearable
                radius="sm"
                className="w-full dark:text-white !h-[40px] "
                placeholder={t("createOperatorPageValues.ps_name_placeholder")}
                type="text"
                variant="bordered"
                color="default"
                onChange={(e) => {
                  handleTranslationChange("ps", e.target.value);
                }}
                // dir="rtl"
                onClear={() => handleTranslationChange("ps", "")}
                errorMessage={({ validationDetails }) => {
                  if (validationDetails.valueMissing) {
                    return t("createOperatorPageValues.ps_validationError");
                  }
                }}
                label={t("createOperatorPageValues.ps_name")}
                labelPlacement="outside"
              />
            </div>
            <div className="col-span-12 md:col-span-6 lg:col-span-4 mt-4 ">
              <Input
                value={translations.fa}
                required
                name="fa"
                isClearable
                radius="sm"
                className="w-full dark:text-white !h-[40px] "
                placeholder={t("createOperatorPageValues.fa_name_placeholder")}
                type="text"
                variant="bordered"
                color="default"
                onChange={(e) => {
                  handleTranslationChange("fa", e.target.value);
                }}
                onClear={() => handleTranslationChange("fa", "")}
                errorMessage={({ validationDetails }) => {
                  if (validationDetails.valueMissing) {
                    return t("createOperatorPageValues.fa_validationError");
                  }
                }}
                label={t("createOperatorPageValues.fa_name")}
                labelPlacement="outside"
              />
            </div>
            <div className="col-span-12 md:col-span-6 lg:col-span-4">
              <Autocomplete
                name="origin"
                isRequired
                errorMessage={t("createOperatorPageValues.origin_errorMessage")}
                validate={(value) => value === undefined || value === ""}
                className="!w-full !label:text-gray-300 "
                style={{ width: "100%" }}
                items={cities || []}
                selectedKey={origin}
                inputValue={
                  origin ? cities?.find((c) => c.id == origin)?.name : ""
                }
                placeholder={t("createOperatorPageValues.origin_placeholder")}
                variant="bordered"
                color="default"
                label={t("createOperatorPageValues.origin")}
                labelPlacement="outside"
                allowsCustomValue
                onSelectionChange={(key) => {
                  setOrigin(key);
                }}
              >
                {(item) => (
                  <AutocompleteItem
                    key={item.id}
                    className="!w-full "
                    variant="bordered"
                    color="danger"
                    textValue={item.name}
                    name="origin"
                  >
                    {item.name + ` (${item.province})`}
                  </AutocompleteItem>
                )}
              </Autocomplete>
            </div>
            <div className="col-span-12 md:col-span-6 lg:col-span-4">
              <Autocomplete
                name="destination"
                isRequired
                isOpen={false}
                errorMessage={t(
                  "createOperatorPageValues.destination_errorMessage"
                )}
                validate={(value) => value === undefined || value === ""}
                className="!w-full !label:text-gray-300 "
                style={{ width: "100%" }}
                defaultFilter={myFilter}
                defaultItems={cities}
                items={cities || []}
                selectedKey={destination}
                // inputValue={
                //   destination
                //     ? cities?.find((c) => c.id == destination)?.name
                //     : ""
                // }
                placeholder={t(
                  "createOperatorPageValues.destination_placeholder"
                )}
                variant="bordered"
                color="default"
                label={t("createOperatorPageValues.destination")}
                labelPlacement="outside"
                allowsCustomValue
                onSelectionChange={(key) => {
                  setDistination(key);
                }}
              >
                {(item) => (
                  <AutocompleteItem
                    key={item.id}
                    className="!w-full "
                    variant="bordered"
                    color="danger"
                    textValue={item.name}
                    name="destination"
                  >
                    {item.name + ` (${item.province})`}
                  </AutocompleteItem>
                )}
              </Autocomplete>
            </div>
            <div className="col-span-12 md:col-span-6 lg:col-span-4 mt-4">
              <Input
                value={totalDistance}
                required
                name="total_distance_km"
                isClearable
                radius="sm"
                className="w-full dark:text-white !h-[40px] "
                placeholder={t(
                  "createOperatorPageValues.total_distance_placeholder"
                )}
                type="text"
                variant="bordered"
                color="default"
                onChange={(e) => {
                  setTotalDistance(e.target.value);
                }}
                validate={(value) => {
                  if (isNaN(value)) {
                    return t(
                      "createOperatorPageValues.total_distance_numberError"
                    );
                  }
                  if (!value) {
                    return t(
                      "createOperatorPageValues.total_distance_requiredError"
                    );
                  }
                }}
                onClear={() => setTotalDistance("")}
                label={t("createOperatorPageValues.total_distance")}
                labelPlacement="outside"
              />
            </div>
            <div className="col-span-12 md:col-span-6 lg:col-span-4">
              <Autocomplete
                name="status"
                isRequired
                value={status}
                errorMessage={t(
                  "createOperatorPageValues.route_status_errorMessage"
                )}
                validate={(value) => value === undefined || value === ""}
                className="!w-full !label:text-gray-300 "
                style={{ width: "100%" }}
                items={routeStatuses}
                selectedKey={status}
                inputValue={status}
                placeholder={t("createOperatorPageValues.status_placeholder")}
                variant="bordered"
                color="default"
                label={t("createOperatorPageValues.route_status")}
                labelPlacement="outside"
                allowsCustomValue
                onSelectionChange={(key) => {
                  if (key == null) {
                    setStatus("");
                  } else {
                    setStatus(key);
                  }
                }}
              >
                {(item) => (
                  <AutocompleteItem
                    key={item.name}
                    className="!w-full "
                    variant="bordered"
                    color="danger"
                    textValue={item.name}
                    name="status"
                  >
                    {item.name}
                  </AutocompleteItem>
                )}
              </Autocomplete>
            </div>
            {/* <Form
              // onSubmit={handleStopAdd}
              className="w-full col-span-12 grid grid-cols-12 gap-4 pb-4 space-y-4 "
            > */}
            <div className="text-[20px] text-gray-500 col-span-12">
              <h1>{t("createOperatorPageValues.Route_stops")}</h1>
            </div>
            <div className="col-span-12 md:col-span-6 lg:col-span-4">
              <Autocomplete
                isInvalid={stopErrors.city ? true : false}
                classNames={{
                  inputWrapper: [
                    "border-2",
                    "data-[invalid=true]:border-red-500",
                    "data-[invalid=true]:focus:ring-red-500",
                  ],
                }}
                errorMessage={t(
                  "createOperatorPageValues.stop_city_errorMessage"
                )}
                validate={stopErrors.city ? true : false}
                className="!w-full !label:text-gray-300 "
                style={{ width: "100%" }}
                items={cities || []}
                selectedKey={city}
                inputValue={city ? cities?.find((c) => c.id == city)?.name : ""}
                placeholder={t(
                  "createOperatorPageValues.stop_city_placeholder"
                )}
                variant="bordered"
                color="default"
                label={t("createOperatorPageValues.stop_city")}
                labelPlacement="outside"
                allowsCustomValue
                onSelectionChange={(key) => {
                  if (key == null) {
                    setCity(null);
                  } else {
                    setCity(key);
                    if (stopErrors.city) {
                      delete stopErrors.city;
                    }
                  }
                }}
              >
                {(item) => (
                  <AutocompleteItem
                    key={item.id}
                    className="!w-full "
                    variant="bordered"
                    color="danger"
                    textValue={item.name}
                  >
                    {item.name + ` (${item.province})`}
                  </AutocompleteItem>
                )}
              </Autocomplete>
            </div>
            <div className="col-span-12 md:col-span-6 lg:col-span-4 mt-4">
              <Input
                value={stopOrder}
                isInvalid={stopErrors.stopOrder ? true : false}
                errorMessage={t(
                  "createOperatorPageValues.stop_order_errorMessage"
                )}
                classNames={{
                  inputWrapper: [
                    "data-[invalid=true]:border-red-500",
                    "data-[invalid=true]:focus:ring-red-500",
                  ],
                  errorMessage: "text-red-500",
                }}
                isClearable
                radius="sm"
                className="w-full dark:text-white !h-[40px] "
                placeholder={t(
                  "createOperatorPageValues.stop_order_placeholder"
                )}
                type="text"
                variant="bordered"
                color="default"
                onChange={(e) => {
                  setStopOrder(e.target.value);
                  if (stopErrors.stopOrder) {
                    delete stopErrors.stopOrder;
                  }
                }}
                onClear={() => setStopOrder("")}
                label={t("createOperatorPageValues.stop_order")}
                labelPlacement="outside"
              />
            </div>
            <div className="col-span-12 md:col-span-6 lg:col-span-4 flex flex-col gap-2">
              <Autocomplete
                errorMessage={t(
                  "createOperatorPageValues.stop_type_errorMessage"
                )}
                isInvalid={stopErrors.stopType ? true : false}
                classNames={{
                  inputWrapper: [
                    "border-2",
                    "data-[invalid=true]:border-red-500",
                    "data-[invalid=true]:focus:ring-red-500",
                  ],
                }}
                className="!w-full !label:text-gray-300 "
                style={{ width: "100%" }}
                items={stopTypes}
                selectedKey={stopType}
                inputValue={stopType}
                placeholder={t(
                  "createOperatorPageValues.stop_type_placeholder"
                )}
                variant="bordered"
                color="default"
                label={t("createOperatorPageValues.stop_type")}
                labelPlacement="outside"
                allowsCustomValue
                onSelectionChange={(key) => {
                  if (key == null) {
                    setStopType("");
                  } else {
                    if (stopErrors.stopType) {
                      delete stopErrors.stopType;
                    }
                    setStopType(key);
                  }
                }}
              >
                {(item) => (
                  <AutocompleteItem
                    key={item.name}
                    className="!w-full "
                    variant="bordered"
                    color="danger"
                    textValue={item.name}
                    name="stop_type"
                  >
                    {item.name}
                  </AutocompleteItem>
                )}
              </Autocomplete>
            </div>
            <div className="col-span-12 flex items-center justify-end">
              <Button
                variant="shadow"
                color="secondary"
                className="text-white"
                onPress={() => {
                  handleStopAdd();
                }}
              >
                {t("createOperatorPageValues.add_stop")}
              </Button>
            </div>
            <div className="my-2 col-span-12">
              <div className="w-full flex flex-col gap-6 p-6 bg-white shadow-md rounded-lg">
                {stops.length > 0 && (
                  <>
                    {" "}
                    <div className="w-full flex items-center justify-start px-4">
                      <h1 className="text-2xl font-semibold text-gray-800">
                        Route Stops
                      </h1>
                    </div>
                    <div className="flex flex-col gap-4">
                      {stops.map((stop, i) => {
                        const city = cities?.find((c) => c.id == stop.city);

                        return (
                          <div
                            key={i}
                            className="w-full flex items-center gap-4 bg-gray-50 hover:bg-gray-200 transition-all p-4 rounded-lg shadow-sm border border-gray-200"
                          >
                            {/* Stop Order */}
                            <div className="flex items-center justify-center w-10 h-10 bg-red-500 text-white rounded-full text-lg font-semibold">
                              {stop.stop_order}
                            </div>

                            {/* Stop Info */}
                            <div className="flex flex-col flex-1">
                              <h1 className="text-lg font-medium text-gray-900">
                                {city?.name}
                              </h1>
                              <p className="text-sm text-gray-500">
                                {city?.province}
                              </p>
                            </div>

                            {/* Stop Type */}
                            <div className="text-gray-700 font-medium text-sm px-4 py-2 bg-gray-200 rounded-md">
                              {stop.stop_type}
                            </div>

                            {/* Action Buttons */}
                            <div className="flex items-center gap-3">
                              <Tooltip
                                content={t(
                                  "createOperatorPageValues.edit_stop"
                                )}
                                showArrow={true}
                              >
                                <button className="p-2 rounded-full hover:bg-blue-100 transition">
                                  <FaRegEdit
                                    className="text-blue-500"
                                    size={20}
                                  />
                                </button>
                              </Tooltip>
                              <Tooltip
                                content={t(
                                  "createOperatorPageValues.delete_stop"
                                )}
                                showArrow={true}
                                color="danger"
                              >
                                <button
                                  type="button"
                                  className="p-2 rounded-full hover:bg-red-100 transition"
                                  onClick={() => {
                                    removeStop(i);
                                  }}
                                >
                                  <MdDelete
                                    className="text-red-500"
                                    size={20}
                                  />
                                </button>
                              </Tooltip>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </>
                )}
              </div>
            </div>
            {/* </Form> */}
            <div className="col-span-12 flex items-center justify-end">
              <Button
                spinner={<Spinner variant="default" />}
                spinnerPlacement="start"
                isLoading={creatingRoute}
                type="submit"
                variant="ghost"
                color="primary"
              >
                {t("createOperatorPageValues.submit")}
              </Button>
            </div>
          </Form>
        </Card>
      </div>
    </div>
  );
}

export default CreateRoute;
