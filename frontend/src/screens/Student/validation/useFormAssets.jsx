import { useQuery } from "@tanstack/react-query";
import { fetchCourse } from "../../../api/courseResourceAPi";
import FormikMultiSelect from "../../../components/formik/FormikMultiSelect";
import FormikText from "../../../components/formik/FormikText";
import YUP from "../../../constants/yup";
import { isRequireField } from "../../../helper/functions";
import { serializeFormikSelect } from "../../../helper/serializeSelect";

const useFormAssets = () => {
  const validationSchema = YUP.object({
    name: YUP.string().required(isRequireField()),
    fathersName: YUP.string().required(isRequireField()),
    mothersName: YUP.string().required(isRequireField()),
    courses: YUP.array().required(isRequireField()),
  });

  const initialValues = (data) => {
    const value = {
      name: data?.name ?? "",
      fathersName: data?.fathersName ?? "",
      mothersName: data?.mothersName ?? "",
      address: data?.address ?? "",
      courses: data?.courses?.map(({ id }) => id) ?? [],
    };
    return value;
  };

  const {
    data: courseList,
    isLoading: courseLoading,
    error: courseError,
  } = useQuery(["course-list"], fetchCourse);

  const formFields = [
    {
      label: "Name",
      name: "name",
      component: FormikText,
    },
    {
      label: "Fathers Name",
      name: "fathersName",
      component: FormikText,
    },
    {
      label: "Mothers Name",
      name: "mothersName",
      component: FormikText,
    },
    {
      label: "Address",
      name: "address",
      component: FormikText,
    },
    {
      label: "Select courses",
      name: "courses",
      options: serializeFormikSelect(courseList),
      component: FormikMultiSelect,
    },
  ];
  return {
    validationSchema,
    formFields,
    initialValues,
    courseLoading,
    courseError,
  };
};

export default useFormAssets;
