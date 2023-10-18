/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          0: "#213435",
          10: "#375758",
          20: "#46685B",
          30: "#709287",
          40: "#96B8AD",
          50: "#B1DBCE",
          60: "#C6F3E5",
          70: "#F3FFFB",
        },
        gray: {
          0: "#475467",
          10: "#AEAEAE",
          20: "#D9D9D9",
          30: "#EEEDED",
        },
        error: {
          10: "#EB4141",
        },
        almostWhite: {
          0: "#FAFFFD",
        },
      },
    },
  },
  plugins: [
    require("tailwindcss-radix")({
      variantPrefix: "rdx",
    }),
    function ({ addVariant }) {
      addVariant("child", "& > *")
      addVariant("child-hover", "& > *:hover")
    },
    require("tailwindcss-animated"),
  ],
}
