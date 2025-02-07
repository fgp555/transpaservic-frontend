export const validateOrderForm = (formData) => {
  const errors = {};

  if (!formData.operatorContract || formData.operatorContract.trim().length < 3) {
    errors.operatorContract = "El número de contrato debe tener al menos 3 caracteres";
  }

  if (!formData.orderNumber || formData.orderNumber.trim().length < 3) {
    errors.orderNumber = "El número de orden debe tener al menos 3 caracteres";
  }

  if (!formData.authorizationNumber || formData.authorizationNumber.trim().length < 3) {
    errors.authorizationNumber = "El número de autorización debe tener al menos 3 caracteres";
  }

  if (!formData.client || formData.client.trim().length < 3) {
    errors.client = "El nombre del cliente debe tener al menos 3 caracteres";
  }

  if (!formData.patientName || formData.patientName.trim().length < 3) {
    errors.patientName = "El nombre del paciente debe tener al menos 3 caracteres";
  }

  const idCardRegex = /^[0-9]{6,10}$/;
  if (!formData.idCard || !idCardRegex.test(formData.idCard)) {
    errors.idCard = "Ingrese una cédula de identidad válida (6-10 dígitos)";
  }

  const countryCodeRegex = /^\+?[0-9]{1,4}$/;
  if (!formData.countryCode || !countryCodeRegex.test(formData.countryCode)) {
    errors.countryCode = "Ingrese un código de país válido";
  }

  const phoneRegex = /^[0-9]{10,15}$/;
  if (!formData.userPhone || !phoneRegex.test(formData.userPhone)) {
    errors.userPhone = "Ingrese un número de celular válido (10-15 dígitos)";
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!formData.email || !emailRegex.test(formData.email)) {
    errors.email = "Ingrese un correo electrónico válido";
  }

  if (!formData.creationDate) {
    errors.creationDate = "Seleccione una fecha de emisión válida";
  }

  if (!formData.itinerary || formData.itinerary.trim().length < 3) {
    errors.itinerary = "Complete el itinerario";
  }

  if (!formData.quantity || formData.quantity <= 0) {
    errors.quantity = "La cantidad debe ser un número positivo";
  }

  if (!formData.value || formData.value <= 0) {
    errors.value = "El valor debe ser un número positivo";
  }

  if (!formData.travelDate) {
    errors.travelDate = "Seleccione una fecha de viaje válida";
  }

  if (!formData.remarks || formData.remarks.trim().length < 3) {
    errors.remarks = "Las observaciones deben tener al menos 3 caracteres";
  }

  return errors;
};
