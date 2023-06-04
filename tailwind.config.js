/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    fontFamily: {
      sans: ['"Pretendard Variable"'],
      display: ['"Onest"', '"Pretendard Variable"'],
    },
    screens: {
      "3xl": { max: "1663px" },
      "2xl": { max: "1535px" },
      xl: { max: "1279px" },
      lg: { max: "1023px" },
      slg: { max: "895px" },
      md: { max: "767px" },
      sm: { max: "639px" },
      ssm: { max: "575px" },
      xs: { max: "511px" },
      "2xs": { max: "383px" },
      "2.5xs": { max: "319px" },
      "3xs": { max: "255px" },
    },
    extend: {},
  },
  plugins: [],
};
