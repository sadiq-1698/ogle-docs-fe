import { NEW, RESUME } from "@/enums";

const getDocumentName = (params) => {
  if (params.id.toString() === NEW) {
    return "Blank Document";
  } else if (params.id.toString() === RESUME) {
    return "Sample resume";
  } else {
    return params.id.toString();
  }
};

export default getDocumentName;
