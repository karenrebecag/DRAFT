/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: 'var(--color-primary)',
        secondary: 'var(--color-secondary)',
        bgWhite: '#F3F3F3',
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
        heading: ['Arapey', 'serif'],
        arapey: ['Arapey', 'serif'],
        poppins: ['Poppins', 'sans-serif'],
      },
      fontSize: {
        // Arapey styles
        'arapey-heading': ['128px', { lineHeight: '125px', fontStyle: 'italic', fontWeight: '400' }],
        'arapey-card-title': ['96px', { lineHeight: '125px', fontStyle: 'italic', fontWeight: '400' }],
        // Poppins styles
        'poppins-heading': ['120px', { lineHeight: '125px', fontWeight: '300' }],
        'poppins-body': ['32px', { lineHeight: '55px', fontWeight: '300' }],
        'poppins-button': ['24px', { lineHeight: 'auto', fontWeight: '500' }],
        'poppins-tag': ['20px', { lineHeight: 'auto', fontWeight: '500' }],
        'poppins-review-title': ['32px', { lineHeight: '55px', fontWeight: '600' }],
        'poppins-pricing': ['64px', { lineHeight: '90px', fontWeight: '500' }],
        'poppins-currency': ['40px', { lineHeight: '90px', fontWeight: '500' }],
        'poppins-pricing-subtitle': ['16px', { lineHeight: '25px', fontWeight: '400' }],
        'poppins-category-tag': ['20px', { lineHeight: 'auto', fontWeight: '600' }],
        'poppins-card-desc-md': ['20px', { lineHeight: '30px', fontWeight: '500' }],
        'poppins-card-desc': ['24px', { lineHeight: '35px', fontWeight: '400' }],
        'pricing-feature': ['20px', { lineHeight: 'auto', fontWeight: '400' }],
      },
    },
  },
  plugins: [],
}
