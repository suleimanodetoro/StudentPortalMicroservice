import React from "react";
import { getUser, updateUser } from "../../api/userAPIs";
import FormikForm from "../../components/formik/FormikForm";
import useGetAndUpdate from "../../hooks/useGetAndUpdate";
import useFormAssets from "./validation/useFormAssets";

const EditUserScreen = () => {
  const { id, data, isLoading, error, updateLoading, updateError, patcher } =
    useGetAndUpdate({
      key: "userData",
      invalidateKey: "user-list",
      fetchFn: getUser,
      updateFn: updateUser,
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
      title="Edit user"
      formLoading={isLoading || updateLoading || companyLoading}
      formError={error || updateError || companyError}
      validationSchema={validationSchema}
      formFields={formFields}
      initialValues={initialValues(data)}
      onSubmit={async (formData) =>
        await patcher({
          ...formData,
          id,
          appUserRoles: [
            {
              name: formData.appUserRoles,
            },
          ],
          isActive: true,
        })
      }
    />
  );
};

export default EditUserScreen;
