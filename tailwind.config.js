module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./layout/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1273f8",
        accent: "#EF6BFF",
        darkText: "#302c26",
        darkBlue: "#111A2C",
        darkGray: "#525C67",
        darkGray2: "#757D85",
        gray: "#898B9A",
        gray2: "#BBBDC1",
        gray3: "#CFD0D7",
        lightGray1: "#DDDDDD",
        lightGray2: "#F5F5F8",
      },
      flexGrow: {
        2: 2,
        3: 3,
      },
    },
  },
  plugins: [],
};
