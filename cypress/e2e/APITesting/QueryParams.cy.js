
describe("API Testing",()=>{

    const queryParam = {page:2}
    it("Passing Query parameters",()=>{
        cy.request({
            method: 'GET',
            url:'https://reqres.in/api/users',  //https://regres.in/api/users?page=2  le "page=2" est un Query parameter
            qs: {  page: 2 } //on peut spécifier les Query parameters dans le 'qs'
            //on peut utiliser la constante "queryParam" qu'on a créé en haut à la place de { page: 2 }
    })
    .then((response) =>{
        expect(response.status).equal(200)
        expect(response.body.page).to.eq(2)
        expect(response.body.data).has.length(6)
        expect(response.body.data[0]).has.property('first_name','Michael')
    })

})

})