const { Given, When, Then } = require("@badeball/cypress-cucumber-preprocessor");

/****Scenario: Acceder au cours****/
When('I click on "start learning" button', function() {
    cy.get(this.data.btnLearning).click()
})

Then("I should have access to the courses",function() {
    //pour verifier la redirection depuis l'url à travers la commande "redirection" qu'on a créé depuis le fichier commands
   cy.redirection(this.data.pageCours)
    // Boucle pour vérifier la présence des 4 éléments
    for (let i = 0; i < 4; i++) {
        cy.get(this.data[`cours_${i}`]).should('exist');
    }
})
