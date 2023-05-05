import { useMutation } from "@tanstack/react-query";
import { Field, Form, Formik } from "formik";
import { Link, useHistory } from "react-router-dom";
import * as Yup from "yup";
import { signUp } from "../api/userAPIs";
import Error from "../components/common/Error";
import InvalidInputAlert from "../components/common/InvalidInputAlert";
import { SuccessMsg } from "../components/common/reusable/ToasterNotification";

const registerSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email format.")
    .min(4, "Email must have at least 4 characters.")
    .required("Email is required."),
  password: Yup.string()
    .min(4, "Password must have at least 4 characters.")
    // .matches(
    //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{4,}$/,
    //   "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character."
    // )
    .required("Password is required."),
  name: Yup.string()
    .min(4, "Name must have at least 4 characters.")
    .required("Name is required."),
  fathersName: Yup.string()
    .min(4, "Father's name must have at least 4 characters.")
    .required("Father's name is required."),
  mothersName: Yup.string()
    .min(4, "Mother's name must have at least 4 characters.")
    .required("Mother's name is required."),
  address: Yup.string()
    .min(4, "Address must have at least 4 characters.")
    .required("Address is required."),
  description: Yup.string()
    .min(4, "Description must have at least 4 characters.")
    .required("Description is required."),
});

const initialValues = {
  name: "",
  password: "",
  email: "",
  fathersName: "",
  mothersName: "",
  address: "",
  description: "",
};

/* eslint-disable jsx-a11y/anchor-is-valid */
const RegisterScreen = () => {
  const history = useHistory();

  const { isLoading, error, mutateAsync } = useMutation(
    (data) => signUp(data),
    {
      onSuccess: () => {
        SuccessMsg("Successfully registered, please login!");
        history.push("/");
      },
    }
  );

  return (
    <div className="container overflow-hidden">
      <section className="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-6 col-md-9 d-flex flex-column align-items-center justify-content-center">
              <div className="d-flex justify-content-center py-4">
                <Link to="/" className="logo d-flex align-items-center w-auto">
                  <span className="d-none d-lg-block">
                    Student Management
                  </span>
                </Link>
              </div>
              {/* <!-- End Logo --> */}

              <div className="card mb-3">
                <div className="card-body">
                  <div className="pt-4 pb-2">
                    <h5 className="card-title text-center pb-0 fs-4">
                      Create an Account
                    </h5>
                    <p className="text-center small">
                      Enter your personal details to create account
                    </p>
                  </div>
                  <Error error={error} />
                  <Formik
                    initialValues={initialValues}
                    validationSchema={registerSchema}
                    onSubmit={async (apiData) =>
                      mutateAsync({
                        ...apiData,
                        appUserRoles: [
                          {
                            name: "USER",
                          },
                        ],
                      })
                    }
                  >
                    {({ errors, touched }) => (
                      <fieldset disabled={isLoading}>
                        <Form className="row justify-content-center g-3 needs-validation">
                          <div className="col-md-6">
                            <label htmlFor="name" className="form-label">
                              Name
                            </label>
                            <Field
                              type="text"
                              name="name"
                              id="name"
                              className="form-control"
                            />
                            {touched.name && (
                              <InvalidInputAlert error={errors.name} />
                            )}
                          </div>
                          <div className="col-md-6">
                            <label htmlFor="address" className="form-label">
                              Address
                            </label>
                            <Field
                              type="text"
                              name="address"
                              id="address"
                              className="form-control"
                            />
                            {touched.address && (
                              <InvalidInputAlert error={errors.address} />
                            )}
                          </div>

                          <div className="col-md-6">
                            <label htmlFor="fathersName" className="form-label">
                              Fathers Name
                            </label>
                            <Field
                              type="text"
                              name="fathersName"
                              id="fathersName"
                              className="form-control"
                            />
                            {touched.fathersName && (
                              <InvalidInputAlert error={errors.fathersName} />
                            )}
                          </div>
                          <div className="col-md-6">
                            <label htmlFor="mothersName" className="form-label">
                              Mothers Name
                            </label>
                            <Field
                              type="text"
                              name="mothersName"
                              id="mothersName"
                              className="form-control"
                            />
                            {touched.mothersName && (
                              <InvalidInputAlert error={errors.mothersName} />
                            )}
                          </div>

                          <div className="col-md-6">
                            <label htmlFor="email" className="form-label">
                              Email
                            </label>
                            <div>
                              <div className="input-group has-validation">
                                <span className="input-group-text" id="email">
                                  @
                                </span>
                                <Field
                                  type="text"
                                  name="email"
                                  className="form-control"
                                />
                              </div>
                              {touched.email && (
                                <InvalidInputAlert error={errors.email} />
                              )}
                            </div>
                          </div>

                          <div className="col-md-6">
                            <label htmlFor="password" className="form-label">
                              Password
                            </label>
                            <Field
                              type="password"
                              name="password"
                              id="password"
                              className="form-control"
                            />
                            {touched.password && (
                              <InvalidInputAlert error={errors.password} />
                            )}
                          </div>
                          <div className="col-md-12">
                            <label htmlFor="description" className="form-label">
                              Description
                            </label>
                            <Field
                              type="text"
                              name="description"
                              id="description"
                              className="form-control"
                              as="textarea"
                              rows={3}
                            />
                            {touched.description && (
                              <InvalidInputAlert error={errors.description} />
                            )}
                          </div>

                          <div className="d-flex flex-column align-items-center justify-content-center col-12">
                            <div>
                              <button
                                className="btn btn-primary w-100 mb-2"
                                type="submit"
                                disabled={isLoading}
                              >
                                Create Account
                              </button>
                            </div>
                            <div>
                              <p className="small mb-0">
                                Already have an account?{" "}
                                <Link to="/">Log in</Link>
                              </p>
                            </div>
                          </div>
                        </Form>
                      </fieldset>
                    )}
                  </Formik>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default RegisterScreen;
