module.exports = {
    "env": {
        "browser": true,
        "es2021": true,
        "node": true,
        "mocha": true
    },
    "extends": ["airbnb","airbnb-base","prettier","eslint:recommended","plugin:node/recommended"],
    "parserOptions": {
        "ecmaVersion": 13,
        "sourceType": "module"
    },
    "rules": {
        "no-console": 0,
        "no-underscore-dangle": 0,
        "no-unused-vars": ["error", { "argsIgnorePattern": "next" }],
        "no-use-before-define": ["error", { "variables": false }],
        "no-multi-str": 0
    }
};
