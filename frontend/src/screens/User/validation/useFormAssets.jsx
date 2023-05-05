import { useQuery } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";
import { fetchAllCompanies } from "../../../api/companyResourceAPi";
import FormikSelect from "../../../components/formik/FormikSelect";
import FormikText from "../../../components/formik/FormikText";
import ROLES from "../../../constants/Roles";
import YUP from "../../../constants/yup";
import { formatDateArrayToString } from "../../../helper/formatedDate";
import { isRequireField } from "../../../helper/functions";
import { serializeFormikSelect } from "../../../helper/serializeSelect";

const useFormAssets = () => {
  const { pathname } = useLocation();
  const disabled = `/${pathname.split("/")[1]}` === "/edit-user";
  const schemaRendering = disabled
    ? YUP.string()
    : YUP.string().required(isRequireField());

  const validationSchema = YUP.object({
    firstName: YUP.string().required(isRequireField()),
    lastName: YUP.string().required(isRequireField()),
    birthDate: YUP.string().required(isRequireField()),
    hireDate: YUP.string().required(isRequireField()),
    title: YUP.string().required(isRequireField()),
    address: YUP.string().required(isRequireField()),
    username: YUP.string().required(isRequireField()),
    email: schemaRendering,
    password: schemaRendering,
    appUserRoles: schemaRendering,
  });

  const initialValues = (data) => {
    const value = {
      firstName: data?.firstName ?? "",
      lastName: data?.lastName ?? "",
      birthDate: formatDateArrayToString(data?.birthDate) ?? "",
      hireDate: formatDateArrayToString(data?.hireDate) ?? "",
      title: data?.title ?? "",
      email: data?.email ?? "",
      username: data?.username ?? "",
      password: data?.password ?? "",
      address: data?.address ?? "",
      appUserRoles: data?.roles?.[0]?.name ?? "",
    };

    return value;
  };

  const {
    data: companyList,
    isLoading: companyLoading,
    error: companyError,
  } = useQuery(["all-company-list"], fetchAllCompanies);

  const formFields = [
    {
      label: "First Name",
      component: FormikText,
      name: "firstName",
    },
    {
      label: "Last Name",
      component: FormikText,
      name: "lastName",
    },
    {
      label: "DOB",
      component: FormikText,
      name: "birthDate",
      type: "date",
    },
    {
      label: "Hire Date",
      component: FormikText,
      name: "hireDate",
      type: "date",
    },
    {
      label: "title",
      component: FormikText,
      name: "title",
    },

    {
      label: "address",
      component: FormikText,
      name: "address",
      type: "textarea",
    },
    {
      label: "Select Company",
      name: "company",
      options: serializeFormikSelect(companyList),
      component: FormikSelect,
    },

    {
      label: "username",
      component: FormikText,
      name: "username",
    },
    {
      label: "Email",
      component: FormikText,
      name: "email",
      type: "email",
      disabled,
    },
    {
      label: "Password",
      component: FormikText,
      name: "password",
      type: "password",
      disabled,
    },
    {
      label: "Select Role",
      name: "appUserRoles",
      component: FormikSelect,
      options: Object.values(ROLES).map((item) => ({
        value: item,
        label: item.split("_").join(" "),
      })),
      disabled,
    },
  ];
  return {
    validationSchema,
    formFields,
    initialValues,
    companyLoading,
    companyError,
  };
};

export default useFormAssets;
