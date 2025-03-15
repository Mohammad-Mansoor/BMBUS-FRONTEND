import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  useDraggable,
  Spinner,
  addToast,
} from "@heroui/react";
import { MdDelete } from "react-icons/md";
import { deleteRoute } from "../../../services/operator-routes-service";
import { toast } from "react-toastify";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function ConfirmDeleteModal({
  isOpen,
  onClose,
  onOpenChange,
  setDeleteRouteId,
  deleteRouteId,
  deleteRouteName,
  setDeleteRouteName,
}) {
  const targetRef = React.useRef(null);
  const { moveProps } = useDraggable({ targetRef, isDisabled: !isOpen });
  const [deletingRoute, setDeletingRoute] = useState(false);
  const queryClient = useQueryClient();

  const { mutate, errors } = useMutation({
    mutationKey: ["deleting-route"],
    mutationFn: async () => {
      setDeletingRoute(true);
      try {
        const res = await deleteRoute(deleteRouteId);
        return res;
      } catch (error) {
        throw error;
      }
    },
    onSuccess: () => {
      addToast({
        title: "Deleting Route",
        description: "Route Deleted Successfully",
        variant: "solid",
        color: "success",
      });
      queryClient.invalidateQueries(["routes"]);
      setDeleteRouteId("");
      setDeleteRouteName("");
      onClose();
      setDeletingRoute(false);
      onClose();
    },
    onError: (error) => {
      console.log(error, "this is erro");
      addToast({
        title: "Deleting Route",
        description: `${error?.response.data.detail}`,
        variant: "solid",
        color: "danger",
      });
      setDeletingRoute(false);
    },
  });

  return (
    <>
      <Modal
        shadow="lg"
        size="lg"
        backdrop="transparent"
        ref={targetRef}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="top"
        // classNames={{
        //   backdrop:
        //     "bg-gradient-to-t from-[#FF2327]/5 to-[#FF2327]/5 backdrop-opacity-10",
        // }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader {...moveProps} className="flex flex-col gap-1">
                <div className="flex items-center justify-start gap-2">
                  <MdDelete size={20} color="red" />
                  <p> Delete Confirmation</p>
                </div>
              </ModalHeader>
              <ModalBody>
                <p>
                  Are You Sure to delete{" "}
                  <span className="font-bold">{deleteRouteName}</span> Route?
                </p>
                <p className="text-red-500">This Action Can not be undone.</p>
              </ModalBody>
              <ModalFooter>
                <Button
                  color="secondary"
                  className="hover:text-white"
                  variant="ghost"
                  onPress={() => {
                    setDeleteRouteId("");
                    setDeleteRouteName("");
                    onClose();
                  }}
                >
                  Close
                </Button>
                <Button
                  color="primary"
                  onPress={() => {
                    mutate();
                  }}
                  spinner={<Spinner variant="default" color="default" />}
                  spinnerPlacement="start"
                  isLoading={deletingRoute}
                  type="submit"
                  variant="solid"
                >
                  Delete
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
