/* eslint-disable no-return-assign */
import swal from "sweetalert";
/* eslint-disable no-param-reassign */
export const jumpTo = (history, routeName) => history.push(routeName);

export const isEmpty = (value) =>
  value === undefined ||
  value === null ||
  (typeof value === "object" && Object.keys(value).length === 0) ||
  (typeof value === "string" && value.trim().length === 0);

export function fileToByteArray(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsArrayBuffer(file);
    reader.onload = () => {
      const buffer = reader.result;
      const bytes = new Uint8Array(buffer);
      resolve(Object.values(bytes));
    };
    reader.onerror = () => {
      reject(reader.error);
    };
  });
}

export const isCurrentPageValid = (pageNumber) =>
  pageNumber > 0 ? pageNumber - 1 : pageNumber;

// Seperating roles, based on decoded token
export const getAppropriateRole = (roles) => {
  if (roles?.includes(",")) {
    return roles.split(",")[0] === "ROLE_ADMIN"
      ? roles.split(",")[0]
      : roles.split(",")[1];
  }

  return roles;
};

export const isRequireField = (fieldName) =>
  fieldName ? `${fieldName} is required.` : "REQUIRED.";

export const formdataImage = (data, imageKey) => {
  let formData = new FormData();
  Object.entries(data).map(([key, value]) =>
    formData.append(key, key === imageKey ? value[0] : value)
  );
  return formData;
};

export const isConfirm = ({ title = "", text = "", callback }) => {
  swal({
    title: title || "Are you sure?",
    text: text || "Once deleted, you will not be able to recover this!",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  }).then((willDelete) => {
    if (willDelete === true && typeof callback === "function") {
      callback();
    }
  });
};

export const uuidv4 = () => {
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
    (
      c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
    ).toString(16)
  );
};

export const base64ToPdfDownload = ({ filename, fileSource }) => {
  let a = document.createElement("a"); //Create <a>
  a.href = "data:application/pdf;base64," + fileSource; //Pdf Base64 Goes here
  a.download = `${filename}.pdf`; //File name Here
  a.click(); //Downloaded file
};
