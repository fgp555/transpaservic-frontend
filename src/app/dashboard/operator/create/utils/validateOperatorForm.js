export const validateOperatorForm = (formData) => {
  const errors = {};

  if (!formData.name || formData.name.trim().length < 3) {
    errors.name = "El nombre debe tener al menos 3 caracteres";
  }

  const whatsappRegex = /^[0-9]{10,15}$/;
  if (!formData.whatsapp || !whatsappRegex.test(formData.whatsapp)) {
    errors.whatsapp = "Ingrese un número de WhatsApp válido (10 dígitos)";
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!formData.email || !emailRegex.test(formData.email)) {
    errors.email = "Ingrese un correo electrónico válido";
  }

  const urlRegex = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([\/\w .-]*)*\/?$/;
  if (formData.website && !urlRegex.test(formData.website)) {
    errors.website = "Ingrese una URL válida";
  }

  return errors;
};
