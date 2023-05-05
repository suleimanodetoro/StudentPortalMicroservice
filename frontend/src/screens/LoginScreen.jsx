import { useMutation } from "@tanstack/react-query";
import { Field, Form, Formik } from "formik";
import jwtDecode from "jwt-decode";
import { useTranslation } from "react-i18next";

import { Link, useHistory } from "react-router-dom";
import * as yup from "yup";
import { signIn } from "../api/userAPIs";
import Error from "../components/common/Error";
import InvalidInputAlert from "../components/common/InvalidInputAlert";
import { isEmpty } from "../helper/functions";
const loginSchema = yup.object().shape({
  username: yup.string().required("Please enter your username."),
  password: yup.string().required(" Please enter your password."),
});

const LoginScreen = () => {
  const history = useHistory();

  const { t } = useTranslation();

  const { isLoading, error, mutateAsync } = useMutation(
    (data) => signIn(data),
    {
      onSuccess: (data) => {
        if (!isEmpty(data)) {
          const user = jwtDecode(data);

          if (user) {
            localStorage.setItem("userInfo", JSON.stringify(user));
          }
          if (data) {
            localStorage.setItem("authInfo", JSON.stringify(data));
          }
          history.push("/");
          window.location.reload();
        }
      },
    }
  );

  return (
    <div className="container">
      <section className="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-4 col-md-6 d-flex flex-column align-items-center justify-content-center">
              <div className="d-flex justify-content-center py-4">
                <Link to="/" className="logo d-flex align-items-center w-auto">
                  <span className="d-none d-lg-block">
                    {" "}
                    {t("Student Management")}
                  </span>
                </Link>
              </div>
              {/* <!-- End Logo --> */}

              <div className="card mb-3">
                <div className="card-body">
                  <div className="py-4 pb-2">
                    <h5 className="card-title text-center pb-0 fs-4">
                      Login to Your Account
                    </h5>
                    <p className="text-center small">
                      Enter your username & password to login
                    </p>
                  </div>
                  <Error error={error} />

                  <Formik
                    initialValues={{
                      username: "",
                      password: "",
                    }}
                    validationSchema={loginSchema}
                    onSubmit={async (data) => mutateAsync(data)}
                  >
                    {({ errors }) => (
                      <fieldset disabled={isLoading}>
                        <Form className="row g-3 pb-3">
                          <div className="col-12">
                            <label
                              htmlFor="yourUsername"
                              className="form-label"
                            >
                              Username
                            </label>
                            <div>
                              <div className="input-group has-validation">
                                <span className="input-group-text">@</span>
                                <Field
                                  id="yourUsername"
                                  type="text"
                                  name="username"
                                  className="form-control"
                                />
                              </div>
                              <InvalidInputAlert error={errors.username} />
                            </div>
                          </div>

                          <div className="col-12">
                            <label
                              htmlFor="yourPassword"
                              className="form-label"
                            >
                              Password
                            </label>
                            <Field
                              id="yourPassword"
                              type="password"
                              name="password"
                              className="form-control"
                            />
                            <InvalidInputAlert error={errors.password} />
                          </div>

                          <div className="col-12">
                            <button
                              className="btn btn-primary w-100"
                              type="submit"
                              disabled={isLoading}
                            >
                              {isLoading ? "Please wait..." : "Login"}
                            </button>
                          </div>
                          <div className="col-12">
                            <p className="small mb-0">
                              Don't have account?{" "}
                              <Link to="/register">Create an account</Link>
                            </p>
                          </div>
                        </Form>
                      </fieldset>
                    )}
                  </Formik>
                </div>
              </div>
              <div className="d-flex justify-content-end">
                {/* <LangChange /> */}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LoginScreen;
