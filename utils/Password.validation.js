const validator = (password) => {
  let validate = /^(?=.*[!@#$%^&*])(?=.*\d).{8,}$/.test(password);
  return validate;
};

module.exports = {
  validator,
};
