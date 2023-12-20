
describe("Parsing JSON Response", ()=>{


    it("Parsing simple JSON Response", ()=>{
        cy.request({
            method: 'GET',
            url:'https://fakestoreapi.com/products'
        })
        .then ((response)=>{
            expect(response.status).to.eq(200)
            expect(response.body[0].id).to.eq(1)
            expect(response.body[0].title).to.eq("Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops")
            expect(response.body[0].price).to.eq(109.95)

            expect(response.body[19].id).to.eq(20)
            expect(response.body[19].title).to.eq("DANVOUY Womens T Shirt Casual Cotton Short")
            expect(response.body[19].price).to.eq(12.99)
        })
    })


    it("Parsing complexe JSON Response", ()=>{
        
        let totalPrice = 0
        cy.request({
            method: 'GET',
            url:'https://fakestoreapi.com/products',
            qs: { limit:5 } //spécifier la limite par un query params
        })
        .then ((response)=>{
            expect(response.status).to.eq(200)
            //On va vérifier le total des prices de chaque élément
            response.body.forEach(element => {
                totalPrice = totalPrice + element.price 
            });
            expect(totalPrice).to.eq(899.23) //on a mis en haut la limite des éléments à retourner à 5
            //expect(totalPrice).to.eq(188.24) //limit = 3
        })
    })

    
})