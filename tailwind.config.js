/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // backgroundImage: {
      //   hero: "url('../public/images/background.png)",
      // },
      keyframes: {
        bouncer: {
          "0%": { transform: " translateY(0)" },
          "25%": { transform: "translateY(6px)" },
          "50%": { transform: "translateY(6px)" },
          "75%": { transform: "translateY(6px)" },
          "100%": { transform: "translateY(0px)" },
        },
      },
      animation: {
        bouncing: "bouncer 3s cubic-bezier(0.280, 0.840, 0.420, 1) infinite",
      },
      colors: {
        primary: "#89CFF0", // Baby blue as primary color
        secondary: "#FFFFFF", // White as secondary color
        text: "#000000", // Black for text
        babyBlue: "#085CA6", // Baby blue
        bg1: "#89CFF0",
        bg2: "#89CFF0",
      },
      borderRadius: {
        standard: '6px', // Less rounded corners (was 12px)
        button: '6px',  // Less rounded buttons (was 50px)
      },
      backgroundImage: {
        'pattern': "url(\"data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23000000' fill-opacity='0.2' fill-rule='evenodd'%3E%3Cpath d='M0 0h40v40H0V0zm1 1v38h38V1H1z'/%3E%3C/g%3E%3C/svg%3E\")",
      }
    },
  },
  plugins: [],
};
