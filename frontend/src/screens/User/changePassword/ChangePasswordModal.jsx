import { useMutation } from "@tanstack/react-query";
import React from "react";
import { updatePassword } from "../../../api/userAPIs";
import Modal from "../../../components/common/Modal";
import FormikFrom from "../../../components/formik/FormikForm";
import { USER_INFO } from "../../../constants/APP_INFO";
import useFormAssets from "./validation/useFormAssets";

const ChangePasswordModal = ({ handleClose, show }) => {
  const { validationSchema, formFields, initialValues } = useFormAssets();

  const { isLoading, error, mutateAsync } = useMutation(
    (data) => updatePassword(data),
    {
      onSuccess: () => {
        handleClose();
      },
    }
  );
  console.log(USER_INFO);
  return (
    <Modal handleClose={handleClose} show={show} width={600}>
      <FormikFrom
        title="Change Password"
        onSubmit={async (formData) => await mutateAsync(formData)}
        formLoading={isLoading}
        formError={error}
        validationSchema={validationSchema}
        formFields={formFields}
        initialValues={initialValues()}
      />
    </Modal>
  );
};

export default ChangePasswordModal;
