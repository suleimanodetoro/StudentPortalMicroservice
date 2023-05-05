import FormikText from "../../../components/formik/FormikText";
import YUP from "../../../constants/yup";
import { isRequireField } from "../../../helper/functions";

const useFormAssets = () => {
  const validationSchema = YUP.object({
    name: YUP.string().required(isRequireField()),
    coursePrice: YUP.number()
      .typeError("price must be a number")
      .required("price is required")
      .positive("price must be a positive number"),
  });

  const initialValues = (data) => {
    const value = {
      name: data?.name ?? "",
      coursePrice: data?.coursePrice ?? "",
    };
    return value;
  };

  const formFields = [
    {
      label: "Name",
      name: "name",
      component: FormikText,
    },
    {
      label: "Price",
      name: "coursePrice",
      component: FormikText,
    },
  ];
  return { validationSchema, formFields, initialValues };
};

export default useFormAssets;
