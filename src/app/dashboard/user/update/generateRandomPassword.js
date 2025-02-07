import Swal from "sweetalert2"; // Para mostrar alertas

// Generar una contraseña aleatoria
const generateRandomPassword = () => {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()";
  const passwordLength = 12; // Longitud de la contraseña
  let randomPassword = "";

  for (let i = 0; i < passwordLength; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomPassword += characters[randomIndex];
  }

  return randomPassword;
};

export const handleGeneratePassword = () => {
  const newPassword = generateRandomPassword();
  setFormData((prev) => ({
    ...prev,
    password: newPassword,
  }));

  Swal.fire({
    title: "Contraseña generada",
    text: "Se ha generado una nueva contraseña.",
    icon: "success",
    confirmButtonText: "Aceptar",
    position: "bottom-end",
    showConfirmButton: false,
    timer: 3000,
    toast: true,
    customClass: {
      popup: "swal-popup-bottom-right",
    },
  });
};
