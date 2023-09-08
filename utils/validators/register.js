const registerInvalid = (fieldsState) => {
  return (
    fieldsState.password.trim().toString() !==
    fieldsState.confirm_password.trim().toString()
  );
};

export default registerInvalid;
