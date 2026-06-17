export const validateSignup = (data) => {
  const errors = [];

  if (!data.name || data.name.trim().length < 2) {
    errors.push("Name must be at least 2 characters");
  }

  if (!data.email || !isValidEmail(data.email)) {
    errors.push("Please provide a valid email address");
  }

  if (!data.password || data.password.length < 6) {
    errors.push("Password must be at least 6 characters");
  }

  if (data.password !== data.confirmPassword) {
    errors.push("Passwords do not match");
  }

  return {
    valid: errors.length === 0,
    errors,
  };
};

export const validateLogin = (data) => {
  const errors = [];

  if (!data.email || !isValidEmail(data.email)) {
    errors.push("Please provide a valid email address");
  }

  if (!data.password || data.password.length < 1) {
    errors.push("Password is required");
  }

  return {
    valid: errors.length === 0,
    errors,
  };
};

const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};
