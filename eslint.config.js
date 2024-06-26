const globals = require('globals');
const js = require('@eslint/js');

module.exports = [
  js.configs.recommended,
  {
    languageOptions: {
      globals: globals.node,
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
  },
  // ...standard,
  // ...prettier,
  {
    plugins: {
      // prettier: prettierPlugin,
    },
    rules: {
      // "prettier/prettier": "error", // הפעלת כללי Prettier כשגיאות ESLint
      'no-unused-vars': 'warn', // התרעה על משתנים לא בשימוש
      'quotes': ['error', 'single'], // הגדרת ציטוטים ליחידים
      'semi': ['error', 'always'], // דרישת נקודה-פסיק בסוף שורות
      'comma-dangle': ['error', 'always-multiline'], // דרישת פסיק נגרר ברשימות רב-שורתיות
    },
  },
];
