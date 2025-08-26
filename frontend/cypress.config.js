// Cypress configuration for e2e tests
module.exports = {
  e2e: {
    specPattern: 'e2e/**/*.spec.js',
    baseUrl: 'http://localhost:5173',
    supportFile: false
  }
};
