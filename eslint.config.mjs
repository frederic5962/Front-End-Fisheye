import globals from 'globals';
import pluginJs from '@eslint/js';

export default [
  {
    languageOptions: {
      globals: globals.browser,
      ecmaVersion: 2021,
      sourceType: 'module',
    },
    rules: {
      indent: ['error', 2],  // "indent" : Assure une indentation cohérente de 2 espaces.
      'no-unused-vars': ['warn'],  // "no-unused-vars" : Génère un avertissement pour les variables inutilisées.
      'no-debugger': ['warn'],  // "no-debugger" : Génère un avertissement si debugger est utilisé (utile pour éviter de le laisser dans le code final).
      eqeqeq: ['error', 'always'],  // "eqeqeq" : Requiert l'utilisation de === et !== pour les comparaisons.
      curly: ['error', 'multi-line'], // "curly" : Exige des accolades pour les blocs de code multi-lignes.
    },
  },

  pluginJs.configs.recommended,
];
