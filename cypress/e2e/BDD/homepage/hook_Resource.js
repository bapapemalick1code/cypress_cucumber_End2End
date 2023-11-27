before(function(){
    //recuperer la valeur du boutton depuis le fixture file "homepage" 
    cy.fixture("homepage").then((data) => {
       this.data = data   
    })
})


beforeEach(()=> {
    cy.visit('/');
    cy.viewport(1440, 900) //pour ajuster la taille de l'ecran depuis cypress
    //cy.get('.osano-cm-denyAll').click() // ignorer la politique de confidentialite
})