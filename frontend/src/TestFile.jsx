import React from "react";
import ModalLayout from "./components/common/Modal";
import useModalToggle from "./hooks/useModalToggle";

const ReusableModal = ({ title, body, buttonText }) => {
  const { show, handleShow, handleClose } = useModalToggle();

  return (
    <>
      <button className="btn btn-primary" onClick={handleShow}>
        open
      </button>
      <ModalLayout
        title="jdjddj"
        show={show}
        handleClose={handleClose}
        preventDefault
      >
        hahah
      </ModalLayout>
    </>
  );
};

export default ReusableModal;

// import { ErrorMessage, Field, Form, Formik } from "formik";
// import React from "react";
// import { fileToByteArray } from "./helper/functions";

// const TestFile = () => {
//   const handleSubmit = (values, { setSubmitting }) => {
//     console.log(values.selectedFile);
//   };

//   const initialValues = {
//     selectedFile: null,
//   };

//   const validate = (values) => {
//     const errors = {};

//     if (!values.selectedFile) {
//       errors.selectedFile = "Please select a file";
//     }

//     return errors;
//   };

//   return (
//     <Formik
//       initialValues={initialValues}
//       validate={validate}
//       onSubmit={handleSubmit}
//     >
//       {() => (
//         <Form>
//           <Field name="selectedFile">
//             {({ form }) => (
//               <div>
//                 <input
//                   type="file"
//                   onChange={(event) => {
//                     const data = fileToByteArray(event.currentTarget.files[0]);
//                     data.then((file) => {
//                       form.setFieldValue("selectedFile", file);
//                     });
//                   }}
//                 />
//                 <ErrorMessage name="selectedFile" />
//               </div>
//             )}
//           </Field>
//           <button type="submit">Submit</button>
//         </Form>
//       )}
//     </Formik>
//   );
// };

// export default TestFile;
