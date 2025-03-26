@type {import('tailwindcss').Config}
module.exports = {
    content: [
      "./pages/**/*.{js,ts,jsx,tsx}",
      "./components/**/*.{js,ts,jsx,tsx}",
      // Add any other directories that contain your components
    ],
    theme: {
      extend: {
        // Add your theme customizations here
      },
    },
    plugins: [
      // Add any plugins here
    ],
  }