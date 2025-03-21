import {
  Form,
  Input,
  Button,
  Card,
  AutocompleteItem,
  Autocomplete,
  Chip,
  Tooltip,
} from "@heroui/react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { IoMdArrowRoundForward } from "react-icons/io";
import { IoArrowBack } from "react-icons/io5";
import { Link } from "react-router-dom";
import { MdDelete, MdStopScreenShare } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";

function Contact() {
  const { t, i18n } = useTranslation();
  const [origin, setOrigin] = useState("");
  const [destination, setDistination] = useState("");
  const [totalDistance, setTotalDistance] = useState("");
  const [status, setStatus] = useState("");
  const [stops, setStops] = useState([]);
  const [city, setCity] = useState("");
  const [stopOrder, setStopOrder] = useState("");
  const [stopType, setStopType] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [stopErrors, setStopErrors] = useState({
    cityError: "",
    orderError: "",
    typeError: "",
  });

  const handleValidation = () => {
    let newErrors = {};

    // Validate City
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
  const [translations, setTranslations] = useState({
    en: "",
    ps: "",
    fa: "",
  });

  const cities = [
    { id: 1, name: "Kishim", province: "Badakhshan" },
    { id: 2, name: "Bala Murghab", province: "Badghis" },
    { id: 3, name: "Nahrin", province: "Baghlan" },
  ];
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
  const onSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    // Convert to object
    const formValuesObject = Object.fromEntries(formData);

    const payload = {
      translations: {
        en: formValuesObject.en,
        ps: formValuesObject.ps,
        fa: formValuesObject.fa,
      },
      destination: destination,
      origin: origin,
      status: status,
      total_distance_km: totalDistance,
      stops: stops,
    };
    console.log("Form values as object:", formValuesObject);
    console.log(payload, "this is payload for create route");
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
            <h1 className="text-[24px]">Create New Route</h1>
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
              <h1 className="text-[20px] text-gray-500">Basic Information</h1>
            </div>
          </div>
          <Form
            onSubmit={onSubmit}
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
                placeholder={"Enter English Route Name"}
                type="text"
                variant="bordered"
                color="default"
                onChange={(e) => {
                  handleTranslationChange("en", e.target.value);
                }}
                onClear={() => handleTranslationChange("en", "")}
                errorMessage={({ validationDetails }) => {
                  if (validationDetails.valueMissing) {
                    return "English Route Name is Required!";
                  }
                }}
                label={"English Route Name"}
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
                placeholder={"Enter Pashto Route Name"}
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
                    return "Pashto Route Name is Required!";
                  }
                }}
                label={"Pashto Route Name"}
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
                placeholder={"Enter Dari Route Name"}
                type="text"
                variant="bordered"
                color="default"
                onChange={(e) => {
                  handleTranslationChange("fa", e.target.value);
                }}
                onClear={() => handleTranslationChange("fa", "")}
                errorMessage={({ validationDetails }) => {
                  if (validationDetails.valueMissing) {
                    return "Dari Route Name is Required!";
                  }
                }}
                label={"Dari Route Name"}
                labelPlacement="outside"
              />
            </div>
            <div className="col-span-12 md:col-span-6 lg:col-span-4">
              <Autocomplete
                name="origin"
                isRequired
                errorMessage="Origin City is requried!"
                validate={(value) => value === undefined || value === ""}
                className="!w-full !label:text-gray-300 "
                style={{ width: "100%" }}
                items={cities}
                selectedKey={origin}
                inputValue={
                  origin ? cities.find((c) => c.id == origin)?.name : ""
                }
                placeholder="Select Origin"
                variant="bordered"
                color="default"
                label={"Origin City"}
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
                errorMessage="Distination City is requried!"
                validate={(value) => value === undefined || value === ""}
                className="!w-full !label:text-gray-300 "
                style={{ width: "100%" }}
                items={cities}
                selectedKey={destination}
                inputValue={
                  destination
                    ? cities.find((c) => c.id == destination)?.name
                    : ""
                }
                placeholder="Select Destination"
                variant="bordered"
                color="default"
                label={"Destination City"}
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
                placeholder={"Enter Total Distance in KM"}
                type="text"
                variant="bordered"
                color="default"
                onChange={(e) => {
                  setTotalDistance(e.target.value);
                }}
                validate={(value) => {
                  if (isNaN(value)) {
                    return "Total Distance in KM must be a number";
                  }
                  if (!value) {
                    return "Total Distance in KM is required!";
                  }
                }}
                onClear={() => setTotalDistance("")}
                label={"Total Distance (KM)"}
                labelPlacement="outside"
              />
            </div>
            <div className="col-span-12 md:col-span-6 lg:col-span-4">
              <Autocomplete
                name="status"
                isRequired
                value={status}
                errorMessage="Route Status is required!"
                validate={(value) => value === undefined || value === ""}
                className="!w-full !label:text-gray-300 "
                style={{ width: "100%" }}
                items={routeStatuses}
                selectedKey={status}
                inputValue={status}
                placeholder="Select Route Status"
                variant="bordered"
                color="default"
                label={"Route Status"}
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
              <h1>Route Stops</h1>
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
                errorMessage="Stop City is requried!"
                validate={stopErrors.city ? true : false}
                className="!w-full !label:text-gray-300 "
                style={{ width: "100%" }}
                items={cities}
                selectedKey={city}
                inputValue={city ? cities.find((c) => c.id == city)?.name : ""}
                placeholder="Select Stop City"
                variant="bordered"
                color="default"
                label={"Stop City"}
                labelPlacement="outside"
                allowsCustomValue
                onSelectionChange={(key) => {
                  setCity(key);
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
                errorMessage="Stop Order is required"
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
                placeholder={"Enter Stop Order"}
                type="text"
                variant="bordered"
                color="default"
                onChange={(e) => {
                  setStopOrder(e.target.value);
                }}
                onClear={() => setStopOrder("")}
                label={"Stop Order"}
                labelPlacement="outside"
              />
            </div>
            <div className="col-span-12 md:col-span-6 lg:col-span-4 flex flex-col gap-2">
              <Autocomplete
                errorMessage="Stop Type is requried!"
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
                placeholder="Select Stop Type"
                variant="bordered"
                color="default"
                label={"Stop Type"}
                labelPlacement="outside"
                allowsCustomValue
                onSelectionChange={(key) => {
                  if (key == null) {
                    setStopType("");
                  } else {
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
                Add Stop
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
                        const city = cities.find((c) => c.id == stop.city);

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
                              <Tooltip content="Edit Stop" showArrow={true}>
                                <button className="p-2 rounded-full hover:bg-blue-100 transition">
                                  <FaRegEdit
                                    className="text-blue-500"
                                    size={20}
                                  />
                                </button>
                              </Tooltip>
                              <Tooltip
                                content="Remove Stop"
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
              <Button type="submit" variant="bordered">
                Submit
              </Button>
            </div>
          </Form>
        </Card>
      </div>
    </div>
  );
}

export default Contact;
