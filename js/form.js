import { showToast } from "./toast.js";

export const initContactForm = () => {
  const form = document.getElementById("contactForm");
  if (!form) return;

  const submitButton = form.querySelector('button[type="submit"]');

  let phoneMask;
  const phoneInput = document.getElementById("phone");
  if (phoneInput) {
    phoneMask = IMask(phoneInput, { mask: "(00) 00000-0000" });
  }

  const inputs = Array.from(form.querySelectorAll("input, textarea"));
  inputs.forEach((input) => {
    input.addEventListener("input", () => {
      if (submitButton.disabled) {
        submitButton.disabled = false;
      }
    });
  });

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const subjectInput = document.getElementById("subject");
    const messageInput = document.getElementById("message");

    const ValidacaoEmail = (email) => {
      if (!email || email.trim() === "") return false;
      if (email.includes(" ")) return false;
      const atIndex = email.indexOf("@");
      if (atIndex <= 0 || email.lastIndexOf("@") !== atIndex) return false;
      const domainPart = email.substring(atIndex + 1);
      const domainParts = domainPart.split(".");
      return !(
        domainParts.length < 2 ||
        domainParts.some((p) => p.length === 0) ||
        domainParts[domainParts.length - 1].length < 2
      );
    };

    const phonePattern = /^\(\d{2}\) \d{5}-\d{4}$/;

    inputs.forEach((input) => input.classList.remove("is-invalid"));

    let isValid = true;
    if (nameInput.value.trim() === "") {
      nameInput.classList.add("is-invalid");
      isValid = false;
    }
    if (!ValidacaoEmail(emailInput.value)) {
      emailInput.classList.add("is-invalid");
      isValid = false;
    }
    if (phoneInput && !phonePattern.test(phoneInput.value)) {
      phoneInput.classList.add("is-invalid");
      isValid = false;
    }
    if (subjectInput.value.trim() === "") {
      subjectInput.classList.add("is-invalid");
      isValid = false;
    }
    if (messageInput.value.trim() === "") {
      messageInput.classList.add("is-invalid");
      isValid = false;
    }

    if (isValid) {
      submitButton.disabled = true;
      showToast("Enviando e-mail...", "info");

      emailjs.init("tsMjbKlsnyYBnsGic");

      const serviceID = "service_025yoxq";
      const templateID = "template_1xyb4us";

      const formData = {
        name: nameInput.value,
        email: emailInput.value,
        phone: phoneInput.value,
        subject: subjectInput.value,
        message: messageInput.value,
      };

      emailjs.send(serviceID, templateID, formData).then(
        (response) => {
          console.log("SUCCESS!", response.status, response.text);
          showToast("E-mail enviado com sucesso!", "success");
          form.reset();
          if (phoneMask) phoneMask.updateValue();
        },
        (error) => {
          console.log("FAILED...", error);
          submitButton.disabled = false;
          if (error.status === 429) {
            showToast(
              "Você atingiu o limite de envios. Tente novamente mais tarde.",
              "error"
            );
          } else {
            showToast(
              "Falha ao enviar o e-mail. Verifique sua conexão.",
              "error"
            );
          }
        }
      );
    } else {
      showToast("Por favor, corrija os campos inválidos.", "error");
    }
  });
};
