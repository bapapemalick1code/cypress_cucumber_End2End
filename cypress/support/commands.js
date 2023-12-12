// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import 'cypress-file-upload' 
require('cypress-downloadfile/lib/downloadFileCommand')

//créer une commande spéciale qui sera réutilisable pour checker le path
Cypress.Commands.add('redirection', (sectionName) => {
    cy.location().should((my_location) => {
        expect(my_location.hash).to.eq(sectionName)   
    })
})

Cypress.Commands.add('checkPathname', (sectionName) => {
    cy.location().should((my_location) => {
        expect(my_location.pathname).to.eq(sectionName)   
    })
})
