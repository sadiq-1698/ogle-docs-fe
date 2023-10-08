/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      boxShadow: {
        search:
          "0 1px 1px 0 rgb(65 69 73 / 30%), 0 1px 3px 1px rgb(65 69 73 / 15%)",
        dropdown:
          "0 3px 5px -1px rgb(0 0 0 / 20%), 0 6px 10px 0 rgb(0 0 0 / 14%), 0 1px 18px 0 rgb(0 0 0 / 12%)",
      },
      colors: {
        brand: "#f1f3f4",
        overlay: "rgba(0, 0, 0, 0.25)",
        black: {
          default: "#000000",
          1: "#484B4E",
          2: "#2F4858",
          3: "#2C2926",
          4: "rgba(0, 0, 0, 0.87)",
        },
        green: {
          1: "#c4eed0",
        },
        grey: {
          default: "#grey",
          1: "#ede5e5",
          2: "#7B7F83",
          3: "#676A6E",
          4: "#838587",
          5: "#C3C7CB",
          6: "#f1f3f4",
          7: "#e9eef6",
          8: "#e8ebee",
          9: "#444746",
          10: "rgb(241,243,244)",
          11: '#5f6368'
        },
        blue: {
          default: "blue",
          1: "#00235B",
          2: "#c2e7ff",
        },
      },
    },
  },
  plugins: [],
};
