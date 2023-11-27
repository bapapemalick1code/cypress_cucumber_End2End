const { defineConfig } = require("cypress");

                              /////*************///////

//conf recuperer depuis https://github.com/bapapemalick1code/cypress-cucumber-preprocessor/blob/master/examples/browserify-cjs/cypress.config.js
const {
  addCucumberPreprocessorPlugin,
} = require("@badeball/cypress-cucumber-preprocessor");
const {
  preprocessor,
} = require("@badeball/cypress-cucumber-preprocessor/browserify");


async function setupNodeEvents(on, config) {
  // This is required for the preprocessor to be able to generate JSON reports after each run, and more,
  await addCucumberPreprocessorPlugin(on, config);

  on("file:preprocessor", preprocessor(config));

  // Make sure to return the config object as it might have been modified by the plugin.
  return config;
}


module.exports = defineConfig({
  projectId: '8kcuuh',
  e2e: {
    baseUrl: "https://learn.cypress.io",  //
    specPattern: "**/*.feature", //spécifier les types de fichier qu'on veut afficher lorsqu'on lance notre cypress
    setupNodeEvents, //
  },


                                /////*************///////

});
