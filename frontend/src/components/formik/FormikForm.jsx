import { Form, Formik } from "formik";
import Card from "../common/Card";
import Error from "../common/Error";
import SubmitBtn from "../common/SubmitBtn";
import Title from "../common/Title";

const FormikForm = ({
  title = "",
  onSubmit = null,
  formdata = false,
  formLoading = false,
  formError = "",
  label,
  initialValues = null,
  validationSchema = null,
  formFields = [],
}) => (
  <Card className="p-4">
    {title && <Title title={title} />}
    <Error error={formError} />
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      enableReinitialize
      onSubmit={onSubmit}
      encType={formdata ? "multipart/form-data" : null}
    >
      <Form>
        <fieldset disabled={formLoading}>
          {formFields.map(({ component: Component, ...field }) => (
            <div key={field.name}>
              <Component
                label={field.label}
                name={field.name}
                options={field.options}
                placeholder={field.placeholder}
                {...field}
              />
            </div>
          ))}
          <SubmitBtn label={label} loading={formLoading} />
        </fieldset>
      </Form>
    </Formik>
  </Card>
);

export default FormikForm;
