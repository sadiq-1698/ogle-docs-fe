const getDisplayTexts = (isLoginMode) => {
  return {
    heading: isLoginMode
      ? "Login to your account"
      : "Signup to create an account",
    paragraph: isLoginMode
      ? "Don't have an account yet? "
      : "Already have an account? ",
    linkName: isLoginMode ? "Signup" : "Login",
    linkUrl: isLoginMode ? "/auth/register" : "/auth/login",
    action: isLoginMode ? "Login" : "Signup",
  };
};

export default getDisplayTexts;
