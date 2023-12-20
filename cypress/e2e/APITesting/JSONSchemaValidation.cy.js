//AJV (Another JSON Schema Validator) est une bibliothèque JavaScript largement utilisée pour valider la conformité des données JSON 
//avec un schéma JSON. Elle prend en charge la dernière spécification JSON Schema (actuellement JSON Schema Draft 2020-12) 
//et fournit un moyen robuste de définir et de valider la structure des données JSON.


// Install ajv library
// npm install ajv 

const Ajv = require('ajv') //importer la library
const my_ajv = new Ajv()   //créer une instance de AVJ


describe("Schema validation", ()=>{

    it("schema validation response", ()=>{
        cy.request({
            method: 'GET',
            url:'https://fakestoreapi.com/products'
        })
        .then ((response) =>{

            var schema = {  //récupérer le schema à travers la reponse du body via le site https://transform.tools/json-to-json-schema
                "$schema": "http://json-schema.org/draft-07/schema#",
                "title": "Generated schema for Root",
                "type": "array",
                "items": {
                  "type": "object",
                  "properties": {
                    "id": {
                      "type": "number"
                    },
                    "title": {
                      "type": "string"
                    },
                    "price": {
                      "type": "number"
                    },
                    "description": {
                      "type": "string"
                    },
                    "category": {
                      "type": "string"
                    },
                    "image": {
                      "type": "string"
                    },
                    "rating": {
                      "type": "object",
                      "properties": {
                        "rate": {
                          "type": "number"
                        },
                        "count": {
                          "type": "number"
                        }
                      },
                      "required": [
                        "rate",
                        "count"
                      ]
                    }
                  },
                  "required": [
                    "id",
                    "title",
                    "price",
                    "description",
                    "category",
                    "image",
                    "rating"
                  ]
                }
              } // Schema END
              ////// //////

              const validate = my_ajv.compile(schema) // le ajv.compile() retourne une methode 'validate'
              const isvalid = validate(response.body) // on passe le response.body à la méthode 'validate' et elle retourne true or false
              expect(isvalid).to.be.true //on vérifie si le schema correspond à notre response.body

        })
    })



})