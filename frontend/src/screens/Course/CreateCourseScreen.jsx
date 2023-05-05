import React from "react";
import { createCourse } from "../../api/courseResourceAPi";
import FormikForm from "../../components/formik/FormikForm";
import useCreate from "../../hooks/useCreate";
import useFormAssets from "./validation/useFormAssets";

const CreateCourseScreen = () => {
  const { isLoading, error, mutateAsync } = useCreate({
    fn: createCourse,
    invalidateKey: "course-list",
  });
  const { validationSchema, formFields, initialValues } = useFormAssets();

  return (
    <FormikForm
      title="Add Course"
      formLoading={isLoading}
      formError={error}
      initialValues={initialValues()}
      validationSchema={validationSchema}
      formFields={formFields}
      onSubmit={async (formData) => {
        await mutateAsync({
          ...formData,
          isActive: true,
        });
      }}
    />
  );
};

export default CreateCourseScreen;
