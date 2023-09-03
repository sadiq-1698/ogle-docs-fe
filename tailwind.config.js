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
      colors: {
        brand: "#f1f3f4",
        black: {
          default: "#000000",
          1: "#484B4E",
          2: "#2F4858",
          3: "#2C2926",
        },
        grey: {
          default: "#grey",
          1: "#ede5e5",
          2: "#7B7F83",
          3: "#676A6E",
          4: "#838587",
          5: "#C3C7CB",
          6: "#f1f3f4",
        },
        blue: {
          default: "blue",
          1: "#00235B",
        },
      },
    },
  },
  plugins: [],
};
