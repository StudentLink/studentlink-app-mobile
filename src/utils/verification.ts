export const ValidatePassword = (password: string, confirmPassword: string) => {
  if (password === confirmPassword) {
    return true;
  }
  return false;
};

export const ValidateEmail = (email: string) => {
  const reg = /\S+@\S+\.\S+/;
  if (reg.test(email)) {
    return true;
  }
  return false;
};

export const CapitalizeData = (data: string) => {
  return data
    .split(" ")
    .map((y) => `${y[0].toUpperCase()}${y.slice(1)}`)
    .join(" ");
};

export const ValidateDataRegister = (
  firstname: string,
  lastname: string,
  username: string,
  email: string,
  password: string,
  confirmPassword: string
) => {
  if (firstname && lastname && username && email && password) {
    if (ValidateEmail(email) && ValidatePassword(password, confirmPassword)) {
      return true;
    }
  }
  return false;
};
