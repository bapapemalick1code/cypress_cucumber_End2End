const { defineConfig } = require("cypress");
                              /////*************///////

//conf recuperer depuis https://github.com/bapapemalick1code/cypress-cucumber-preprocessor/blob/master/examples/browserify-cjs/cypress.config.js
const {addCucumberPreprocessorPlugin,} = require("@badeball/cypress-cucumber-preprocessor");
const {preprocessor,} = require("@badeball/cypress-cucumber-preprocessor/browserify");

//Config pour le download file
const {downloadFile} = require('cypress-downloadfile/lib/addPlugin')

async function setupNodeEvents(on, config) {
  // This is required for the preprocessor to be able to generate JSON reports after each run, and more,
  await addCucumberPreprocessorPlugin(on, config);

  on("file:preprocessor", preprocessor(config));
  on('task', {downloadFile}) //Config pour le download file
  // Make sure to return the config object as it might have been modified by the plugin.
  return config;
}



module.exports = defineConfig({
  projectId: '8kcuuh',
  e2e: {
    setupNodeEvents,
    baseUrl: "https://learn.cypress.io",  //
    //specPattern: "**/*.feature", //spécifier les types de fichier qu'on veut afficher lorsqu'on lance notre cypress
    specPattern: "**/*.js", //spécifier les types de fichier qu'on veut afficher lorsqu'on lance notre cypress
    //config pour les reports
    reporter: "mochawesome",
    reporterOptions: {
    charts: true,
    overwrite: false,
    html: false,
    json: true,
    reportDir: "cypress/report/mochawesome-report"
    }
  }
});
