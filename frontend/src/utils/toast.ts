import Swal from "sweetalert2";

// Restrict 'type' to valid SweetAlert2 icon types
export const showToast = (
  type: "success" | "error" | "info" | "warning" = "info",
  message: string = "Something happened!",
  duration: number = 3000
) => {
  Swal.fire({
    toast: true,
    position: "top-end",
    icon: type,
    title: message,
    showConfirmButton: false,
    timer: duration,
    timerProgressBar: true,
  });
};
