import React from "react";
import { getCourse, updateCourse } from "../../api/courseResourceAPi";
import FormikForm from "../../components/formik/FormikForm";
import useGetAndUpdate from "../../hooks/useGetAndUpdate";
import useFormAssets from "./validation/useFormAssets";

const EditCourseScreen = () => {
  const { id, data, isLoading, error, updateLoading, updateError, patcher } =
    useGetAndUpdate({
      key: "courseData",
      invalidateKey: "course-list",
      fetchFn: getCourse,
      updateFn: updateCourse,
    });

  const { validationSchema, formFields, initialValues } = useFormAssets();

  return (
    <FormikForm
      title="Edit Course"
      initialValues={initialValues(data)}
      formLoading={isLoading || updateLoading}
      formError={error || updateError}
      validationSchema={validationSchema}
      formFields={formFields}
      onSubmit={async (formData) =>
        await patcher({
          ...formData,
          id,
          isActive: true,
        })
      }
    />
  );
};

export default EditCourseScreen;
