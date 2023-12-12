import{LoginPage} from "./pages/login_page"

const loginPage = new LoginPage()

before(function(){
    //recuperer les données depuis le fixture file "login_page" 
    cy.fixture("login_page").as("test_data")
})

beforeEach(()=>{
    cy.visit('https://opensource-demo.orangehrmlive.com/')
})


describe('login test suite',()=>{
    
    it('login', function(){
        loginPage.enterUsername(this.test_data.login)
        loginPage.enterPassword(this.test_data.password)
        loginPage.clickLogin()
        loginPage.verifDashboard()
    })
    
    it('login with invalid credentials', function(){
        loginPage.enterUsername('Admin')
        loginPage.enterPassword('admin567')
        loginPage.clickLogin()
        loginPage.verifAlert()
        loginPage.verifErrorMsg()
    })
    
})
