window.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector("#container");
  const registrationForm = document.querySelector("#registrationForm");
  const loginForm = document.querySelector("#loginForm");
  const eyeBtn = document.querySelectorAll(".eye");
  const validators = {
    username: (value) => [
      { test: value.length > 0, error: "Username is required" },
      {
        test: value.length >= 6,
        error: "Username must be at least 6 characters long",
      },
      {
        test: /^[a-zA-Z0-9]+$/.test(value),
        error: "Username must contain only letters and numbers",
      },
    ],
    email: (value) => [
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
    ],
    password: (value) => [
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
    ],
  };
  let formSubmitted = false;

  // Toggle error message
  const toggleErrorMessage = (element, isValid, message = " ") => {
    const errorMessage = element.nextElementSibling;
    errorMessage.textContent = message;
    errorMessage.classList.toggle("active", !isValid);
  };

  // Validate input
  const validateInput = (input) => {
    const rules = validators[input.id](input.value);
    const failedRule = rules.find((rule) => !rule.test);

    if (failedRule) {
      toggleErrorMessage(input, false, failedRule.error);
      return false;
    } else {
      toggleErrorMessage(input, true);
      return true;
    }
  };

  // Validate form
  const validateForm = (element) => {
    let allValid = true;
    [...element.elements].forEach((input) => {
      if (validators[input.id]) {
        const isValid = validateInput(input);
        if (!isValid) allValid = false;
      }
    });
    return allValid;
  };

  // Register input event listeners
  registrationForm.querySelectorAll("input").forEach((input) => {
    input.addEventListener("input", () => {
      if (validators[input.id] && formSubmitted) {
        validateInput(input);
      }
    });
  });
  // Register form submission handler
  registrationForm.addEventListener("submit", (event) => {
    event.preventDefault();
    formSubmitted = true; // Mark the form as submitted
    const isFormValid = validateForm(registrationForm);
    if (isFormValid) {
      alert("Form submitted successfully");
      registrationForm.reset();
      formSubmitted = false; // Reset submission state
      [...registrationForm.elements].forEach((input) => {
        if (validators[input.id]) toggleErrorMessage(input, true);
      });
    }
  });

  // Login form submission handler
  loginForm.addEventListener("submit", (event) => {
    event.preventDefault();
    formSubmitted = true; // Mark the form as submitted
    const isFormValid = validateForm(loginForm);
    if (isFormValid) {
      alert("Login Form submitted successfully");
      loginForm.reset();
      formSubmitted = false; // Reset submission state
      [...loginForm.elements].forEach((input) => {
        if (validators[input.id]) toggleErrorMessage(input, true);
      });
    }
  });

  //Login input validation listener
  loginForm.querySelectorAll("input").forEach((input) => {
    input.addEventListener("input", () => {
      if (validators[input.id] && formSubmitted) {
        validateInput(input);
      }
    });
  });

  document.querySelector("#register").addEventListener("click", () => {
    container.classList.add("active");
    registrationForm.reset();
  });
  document.querySelector("#login").addEventListener("click", () => {
    container.classList.remove("active");
    loginForm.reset();
  });

  // Toggle password visibility
  eyeBtn.forEach((btn) => {
    btn.addEventListener("click", () => {
      const input = btn.previousElementSibling;
      const type =
        input.getAttribute("type") === "password" ? "text" : "password";
      input.setAttribute("type", type);
      btn.classList.toggle("fa-eye");
      btn.classList.toggle("fa-eye-slash");
    });
  });
});
