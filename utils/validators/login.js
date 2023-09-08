const loginInvalid = (fieldsState) => {
  return (
    fieldsState.username.trim().toString().length <= 0 ||
    fieldsState.password.trim().toString().lenght <= 0
  );
};

export default loginInvalid;
