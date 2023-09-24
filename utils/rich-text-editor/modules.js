const modules = {
  toolbar: [
    [
      "bold",
      "italic",
      "underline",
      "strike",
      "blockquote",
      "code-block",
      "image",
      "link"
    ],
    [
      { list: "ordered" },
      { list: "bullet" },
      { script: "sub" },
      { script: "super" },
      { indent: "-1" },
      { indent: "+1" },
      { align: [] },
    ],
    [
      { size: ["small", "medium", "large", "huge"] },
      { header: [1, 2, 3, 4, 5, 6] },
      { font: [] },
    ],
    [{ color: [] }, { background: [] }], // dropdown with defaults from theme
    [{ direction: "rtl" }, "clean"],
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  },
};

export default modules;
