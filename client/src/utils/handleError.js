import Swal from "sweetalert2";

export const handleError = (error, title) => {
  if (error.response) {
    Swal.fire({
      icon: "error",
      title,
      text: JSON.stringify(error.response.data),
    });
  } else {
    Swal.fire({
      icon: "error",
      title,
      text: error,
    });
  }
};
