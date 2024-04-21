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
