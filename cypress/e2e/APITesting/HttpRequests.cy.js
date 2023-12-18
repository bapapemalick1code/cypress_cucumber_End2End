  
  describe("HTTP Requests", ()=>{

    it("GET Call", ()=>{
        cy.request('GET','https://jsonplaceholder.typicode.com/posts/1')
        .its('status').should('equal',200)
    })


    it("POST Call", ()=>{
        cy.request({
            method: 'POST',
            url:'https://jsonplaceholder.typicode.com/posts/',
            body:{
                title:"my test post",
                body:"this is a post test",
                userId:1
            }
        })
        .its('status').should('equal',201)
    })


    it("PUT Call",()=>{
        cy.request({
            method: 'PUT',
            url:'https://jsonplaceholder.typicode.com/posts/1',
            body:{
                title:"my test put",
                body:"this is a put test",
                userId:1,
                id:1
            }
        })
        .its('status').should('equal',200)
    })

    it("DELETE Call", ()=>{
        cy.request('DELETE','https://jsonplaceholder.typicode.com/posts/1')
        .its('status').should('equal',200)
    })


  })