import { NEW, RESUME } from "@/enums";

const getDocumentName = (params, document) => {
  if (params.id.toString() === NEW) {
    return "Blank Document";
  } else if (params.id.toString() === RESUME) {
    return "Sample resume";
  } else {
    return document?.name.toString();
  }
};

export default getDocumentName;
