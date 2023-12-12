
describe('upload-download file',()=>{

it('Upload File test', function(){
   cy.visit('https://trytestingthis.netlify.app')
   cy.get('#myfile').attachFile('logo-ofii.jpeg')
})

it('Download File test', function(){
    cy.downloadFile('https://upload.wikimedia.org/wikipedia/en/a/a9/Example.jpg','mydownloads','example.jpg')
 })

})