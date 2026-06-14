window.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector("#container");
  const registrationForm = document.querySelector("#registrationForm");
  const loginForm = document.querySelector("#loginForm");
  const eyeBtn = document.querySelectorAll(".eye");

  const emailRules = (value) => [
    { test: value.length > 0, error: "Email is required" },
    { test: /@/.test(value), error: "Email must contain an @ symbol" },
    {
      test: /\.[a-zA-Z]{2,}$/.test(value),
      error: "Email must contain a valid domain",
    },
    {
      test: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value),
      error: "Email must be valid",
    },
  ];

  const passwordRules = (value) => [
    { test: value.length > 0, error: "Password is required" },
    {
      test: value.length >= 8,
      error: "Password must be at least 8 characters long",
    },
    {
      test: /\d/.test(value),
      error: "Password must contain at least one number",
    },
    {
      test: /[!@#$%^&*(),.?":{}|<>]/.test(value),
      error: "It must contain at least one special character",
    },
  ];

  const usernameRules = (value) => [
    { test: value.length > 0, error: "Username is required" },
    {
      test: value.length >= 6,
      error: "Username must be at least 6 characters long",
    },
    {
      test: /^[a-zA-Z0-9]+$/.test(value),
      error: "Username must contain only letters and numbers",
    },
  ];

  const validators = {
    username: usernameRules,
    email: emailRules,
    password: passwordRules,
  };

  const regValidators = {
    "reg-username": usernameRules,
    "reg-email": emailRules,
    "reg-password": passwordRules,
  };

  const loginValidators = {
    "login-email": emailRules,
    "login-password": passwordRules,
  };

  let formSubmitted = false;

  const toggleErrorMessage = (inputElement, isValid, massage = "") => {
    const inputGroup = inputElement.closest(".input-group");
    if (!inputGroup) return;

    const errorSpan = inputGroup.querySelector(".error");
    if (!errorSpan) return;

    errorSpan.textContent = massage;
    errorSpan.classList.toggle("active", isValid);
  };

  const validateInput = (input) => {
    const validationType = input.dataset.validate;

    if (!validationType || !validators[validationType]) return true;

    const rules = validators[validateType](input.value);

    const failedRule = rules.find((rule) => !rule.test);

    if (failedRule) {
      toggleErrorMessage(input, false, failedRule.error);
      return false;
    } else {
      toggleErrorMessage(input, true);
      return true;
    }
  };

  const clearAllErrors = () => {
    const errorElements = document.querySelectorAll(".error");
    errorElements.forEach((errorElement) => {
      errorElement.classList.remove("active");
      errorElement.textContent = "";
    });
  };

  // Register input event listeners
  registrationForm.querySelectorAll("input").forEach((input) => {
    input.addEventListener("input", () => {
      if (regValidators[input.id] && formSubmitted) {
        validateInput(input, regValidators);
      }
    });
  });
  // Register form submission handler
  registrationForm.addEventListener("submit", (event) => {
    event.preventDefault();
    formSubmitted = true; // Mark the form as submitted
    const isFormValid = validateForm(registrationForm, regValidators);
    if (isFormValid) {
      alert("Form submitted successfully");
      registrationForm.reset();
      formSubmitted = false; // Reset submission state
      [...registrationForm.elements].forEach((input) => {
        if (regValidators[input.id]) toggleErrorMessage(input, true);
      });
    }
  });

  // Login form submission handler
  loginForm.addEventListener("submit", (event) => {
    event.preventDefault();
    formSubmitted = true; // Mark the form as submitted
    const isFormValid = validateForm(loginForm, loginValidators);
    if (isFormValid) {
      alert("Login Form submitted successfully");
      loginForm.reset();
      formSubmitted = false; // Reset submission state
      [...loginForm.elements].forEach((input) => {
        if (loginValidators[input.id]) toggleErrorMessage(input, true);
      });
    }
  });

  //Login input validation listener
  loginForm.querySelectorAll("input").forEach((input) => {
    input.addEventListener("input", () => {
      if (loginValidators[input.id] && formSubmitted) {
        validateInput(input, loginValidators);
      }
    });
  });

  document.querySelector("#register").addEventListener("click", () => {
    container.classList.add("active");
    clearAllErrors();
    registrationForm.reset();
  });
  document.querySelector("#login").addEventListener("click", () => {
    container.classList.remove("active");
    clearAllErrors();
    loginForm.reset();
  });

  // Toggle password visibility
  eyeBtn.forEach((btn) => {
    btn.addEventListener("click", () => {
      const inputGroup = btn.closest(".input-group");
      const input = inputGroup.querySelector("input");

      if (!inputGroup) return;

      const type =
        input.getAttribute("type") === "password" ? "text" : "password";

      const icon = btn.querySelector("i");
      input.setAttribute("type", type);
      icon.classList.toggle("fa-eye");
      icon.classList.toggle("fa-eye-slash");
    });
  });
});
