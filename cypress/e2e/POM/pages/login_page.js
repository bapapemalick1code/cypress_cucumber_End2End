export class LoginPage{
    username_textbox = ':nth-child(2) > .oxd-input-group > :nth-child(2) > .oxd-input'
    password_textbox = ':nth-child(3) > .oxd-input-group > :nth-child(2) > .oxd-input'
    login_btn = '.oxd-button'
    dashbord_loc = ':nth-child(8) > .oxd-main-menu-item'
    
    enterUsername(username){
        cy.get(this.username_textbox).type(username)
    }

    enterPassword(password){
        cy.get(this.password_textbox).type(password)
    }

    clickLogin(){
        cy.get(this.login_btn).click()
    }

    verifDashboard(){
        cy.get(this.dashbord_loc).should('be.visible').should('have.text','Dashboard')
    }

    verifAlert(){
        cy.on('window:alert', (text) => {
            // Assurez-vous que le texte de l'alerte correspond à ce que vous attendez
            expect(text).to.equal('Invalid credentials');
          });
    }

    verifErrorMsg(){
        cy.get('.oxd-alert-content > .oxd-text').should('be.visible').should('have.text','Invalid credentials')
    }

}