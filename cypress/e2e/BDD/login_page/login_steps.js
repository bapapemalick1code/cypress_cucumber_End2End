import { Given, When, Then, Before } from '@badeball/cypress-cucumber-preprocessor'

let data_test;

before(function(){
  //recuperer les données depuis le fixture file "login_page" 
  cy.fixture("loginpage").then((data) => {
    data_test = data   
  })
})

Given('I open the OrangeHRM login page', () => {
  cy.visit('https://opensource-demo.orangehrmlive.com/')
})

//Scenario: Successful login with valid credentials
When('I enter {string} and {string}', (username, password) => {
  cy.get(data_test.username_textbox).type(username)
  cy.get(data_test.password_textbox).type(password)
})

When('I click the login button', () => {
  cy.get(data_test.login_btn).click()
})

Then('I should see the dashboard page', () => {
  cy.url().should('include', '/dashboard')
  cy.get(data_test.dashbord_loc).should('be.visible').should('have.text','Dashboard')
})




//Scenario: login with invalid credentials
When('I enter invalid {string} and {string}', (username, password) => {
  cy.get(data_test.username_textbox).type(username)
  cy.get(data_test.password_textbox).type(password)
})

/*
When('I click the login button', () => {
  cy.get(data_test.login_btn).click()
})
*/

Then('I should see the message error', () => {
  cy.url().should('not.include', '/dashboard')
  cy.get(data_test.alert_login).should('be.visible')
  cy.get(data_test.alert_login_text).should('contain.text','Invalid credentials')
  //cy.get(data_test.dashbord_loc).should('be.visible').should('have.text','Dashboard')
})
