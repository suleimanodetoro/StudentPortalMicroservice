import {
  fetchStudents,
  updateStudent,
} from "../../api/studentResourceAPi";
import FormikForm from "../../components/formik/FormikForm";
import useGetAndUpdate from "../../hooks/useGetAndUpdate";
import useFormAssets from "./validation/useFormAssets";

const StudentScreen = () => {
  const { data, isLoading, error, updateLoading, updateError, patcher } =
    useGetAndUpdate({
      key: "profile",
      invalidateKey: ["student/self", "course-list", "is-graduated"],
      fetchFn: fetchStudents,
      updateFn: (res) => updateStudent({ data: res.data, id: data.id }),
    });

  const {
    validationSchema,
    formFields,
    initialValues,
    courseLoading,
    courseError,
  } = useFormAssets();

  return (
    <FormikForm
      title="Profile info"
      initialValues={initialValues(data)}
      formLoading={isLoading || updateLoading || courseLoading}
      formError={error || updateError || courseError}
      validationSchema={validationSchema}
      formFields={formFields}
      onSubmit={async (formData) => {
        const apiData = {
          ...formData,
          courses: formData.courses.map((item) => ({
            id: item,
          })),
          id: data?.id,
          isActive: true,
          users: { id: data?.users?.id },
        };
        await patcher(apiData);
      }}
    />
  );
};

export default StudentScreen;
