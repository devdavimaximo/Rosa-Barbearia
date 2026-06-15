/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#3D574C',
          dark:    '#2A4339',
          light:   '#4e6e61',
        },
        cream: {
          DEFAULT: '#FCEFCF',
          dark:    '#f0ddb2',
        },
        bege: '#f7edd4',
      },
      fontFamily: {
        sans:  ['Inter', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      },
      borderRadius: {
        sm: '6px',
        md: '12px',
        lg: '20px',
      },
      boxShadow: {
        sm:    '0 1px 4px rgba(0,0,0,0.07), 0 1px 2px rgba(0,0,0,0.05)',
        md:    '0 4px 16px rgba(0,0,0,0.09), 0 2px 6px rgba(0,0,0,0.05)',
        lg:    '0 12px 40px rgba(0,0,0,0.13), 0 4px 12px rgba(0,0,0,0.07)',
        brand: '0 6px 20px rgba(42,67,57,0.35)',
        cream: '0 8px 24px rgba(0,0,0,0.18)',
        hero:  '0 8px 32px rgba(0,0,0,0.1)',
      },
      height:    { header: '72px' },
      minHeight: { header: '72px' },
      spacing:   { header: '72px' },
    },
  },
  plugins: [],
}
