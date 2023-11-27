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
    // Vérifier si le bouton est visible
    cy.get('.osano-cm-denyAll').should('be.visible').then((button) => {
        // Le bouton est visible, vous pouvez le cliquer
        button.click();
        
        // Ajouter vos actions supplémentaires ici si nécessaire après avoir cliqué sur le bouton
    }).catch(() => {
        // Le bouton n'est pas visible, passer à l'étape suivante
        cy.log('Le bouton n\'est pas visible, passer à l\'étape suivante');
        // Ajouter vos actions pour l'étape suivante ici
    });
})