const getProfileLetter = () => {
  if (typeof window !== "undefined") {
    const result = localStorage
      .getItem("name")
      .toString()
      .split(" ")[0]
      .charAt(0)
      .toUpperCase();
    return result;
  }
};

export default getProfileLetter;
