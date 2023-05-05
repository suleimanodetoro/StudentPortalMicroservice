import FormikText from "../../../../components/formik/FormikText";
import YUP from "../../../../constants/yup";

const useFormAssets = () => {
  const validationSchema = YUP.object({
    password: YUP.string().required("Password is required"),
    // .min(8, "Password must be at least 8 characters")
    // .matches(
    //   /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/,
    //   "Password must contain at least one letter, one number, and one special character"
    // )
    confirmPassword: YUP.string()
      .required("Confirm Password is required")
      .oneOf([YUP.ref("password"), null], "Passwords must match"),
  });

  const initialValues = (data) => {
    const value = {
      password: "",
      confirmPassword: "",
    };

    return value;
  };

  const formFields = [
    {
      label: "New Password",
      component: FormikText,
      name: "password",
      type: "password",
    },
    {
      label: "Confirm Password",
      component: FormikText,
      name: "confirmPassword",
      type: "password",
    },
  ];
  return {
    validationSchema,
    formFields,
    initialValues,
  };
};

export default useFormAssets;
