describe("Api Testing", () =>{


    it("Approch_1 - Hard coded json object", ()=> {
        //En code dur
        const requestBody = {
            tourist_name: "Malick",
            tourist_email: "malick10@gmail.com",
            tourist_location: "Senegal"
        }

        cy.request({
            method: 'POST',
            url:'https://jsonplaceholder.typicode.com/posts/',
            body:requestBody
        })
        .then((response)=>{
            expect(response.status).to.eq(201)
            expect(response.body.tourist_name).to.eq("Malick")
            expect(response.body.tourist_email).to.eq("malick1@gmail.com")
            expect(response.body.tourist_location).to.eq("Senegal")
        })
    })



    it("Approach_2 - Dynamically generating json object", ()=> {
        //Générer des données avec la fonction random
        const requestBody = {
            tourist_name: Math.random().toString(5).substring(2),
            tourist_email: Math.random().toString(5).substring(2)+"@gmail.com",
            tourist_location: "Senegal"
        }
//A revoir comment générer une chaine de caractère en créant une fonction dans le commande.js
        cy.request({
            method: 'POST',
            url:'https://jsonplaceholder.typicode.com/posts/',
            body:requestBody
        })
        .then((response)=>{
            expect(response.status).to.eq(201)
            expect(response.body.tourist_name).to.eq(requestBody.tourist_name)
            expect(response.body.tourist_email).to.eq(requestBody.tourist_email)
            expect(response.body.tourist_location).to.eq(requestBody.tourist_location)
        })
        
    })



    it.only("Approch_3 - Using fixture", ()=> {
        //Utiliser les fixture file
        cy.fixture('data_api').then((my_fixture)=>{
            const requestBody = my_fixture

            cy.request({
                method: 'POST',
                url:'https://jsonplaceholder.typicode.com/posts/',
                body:requestBody
            })
            .then((response)=>{
                expect(response.status).to.eq(201)
                expect(response.body.tourist_name).to.eq(requestBody.tourist_name)
                expect(response.body.tourist_email).to.eq(requestBody.tourist_email)
                expect(response.body.tourist_location).to.eq(requestBody.tourist_location)
                //d'autres assertions supp
                expect(response.body).has.property('tourist_name',requestBody.tourist_name)
                expect(response.body).has.property('tourist_email',requestBody.tourist_email)
            })

        })
        
    })



})