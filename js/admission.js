document.addEventListener("DOMContentLoaded", () => {
  const admissionForm = document.getElementById("admissionForm");
  if (admissionForm) {
    admissionForm.addEventListener("submit", (event) => handleSubmit(event, "admissionForm"));
  }
});
