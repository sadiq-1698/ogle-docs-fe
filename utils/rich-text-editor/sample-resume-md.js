import { NEW, RESUME, SAMPLE_RESUME_MD } from "@/enums";

const getEditorMDTemplate = (params) => {
  if (params.id.toString() === NEW) {
    return ``;
  } else if (params.id.toString() === RESUME) {
    return SAMPLE_RESUME_MD;
  } else {
    return null;
  }
};

export default getEditorMDTemplate;
