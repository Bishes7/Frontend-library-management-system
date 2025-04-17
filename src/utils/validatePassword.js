// validate:
// at least 6 characters required
// 1 UPPERCASE
// 1 lowercase
// 1 digit
// special character !@#$%^&*
// password must match

export const validator = (password = "", confirmPassword = "") => {
  const error = [];

  password.length < 6 && error.push("At least 6 characters required");

  !/[A-Z]/.test(password) && error.push("At least 1 UPPERCASE letter required");

  !/[a-z]/.test(password) && error.push("At least 1 lowecase letter required");

  !/[0-9]/.test(password) && error.push("At least 1 number required");

  !/[~!@#$%^&*]/.test(password) &&
    error.push("At least 1 special character required");

  password !== confirmPassword && error.push("Password dont match");
  return error;
};
