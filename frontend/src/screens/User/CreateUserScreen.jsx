import React from "react";
import { signUp } from "../../api/userAPIs";
import FormikForm from "../../components/formik/FormikForm";
import useCreate from "../../hooks/useCreate";
import useFormAssets from "./validation/useFormAssets";

const CreateUserScreen = () => {
  const { isLoading, error, mutateAsync } = useCreate({
    fn: signUp,
    invalidateKey: "user-list",
  });

  const {
    validationSchema,
    formFields,
    initialValues,
    companyLoading,
    companyError,
  } = useFormAssets();

  return (
    <FormikForm
      title="Add User"
      formLoading={isLoading || companyLoading}
      formError={error || companyError}
      initialValues={initialValues()}
      validationSchema={validationSchema}
      formFields={formFields}
      onSubmit={async (formData) => {
        await mutateAsync({
          ...formData,
          appUserRoles: [
            {
              name: formData.appUserRoles,
            },
          ],
          company: {
            id: formData?.company,
          },
          isActive: true,
        });
      }}
    />
  );
};

export default CreateUserScreen;
