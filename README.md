1. Download & install node.js
2. Download & install vscode
3. Create a new folder for project & open in vscode
4. Open cmd/terminal thenn execute below command:
   npm -i init   ===> create package.json file 
5. To install Cypress
   npm install cypress --save -dev    ==> tu auras le dossier node_modules
6.Start cypress
   npx cypress open   (or)  node_modules/.bin/cypress open 
(or) definir directement dans le fichier package.json 
"scripts": {
    "cy:open": "cypress open" 
  }
Puis utiliser cette commande pour lancer cypress => npm run cy:open

Run cypress with CLI (ligne de commande) => npx cypress run --spec chemin/vers/le/fichier.spec.js

All options => npx cypress run --help

7.a.Execution test en mode headless => npx cypress run 
7.b.Execution test en mode visuel => npx cypress run --headed


########## 
Cypress utilise javascript et typeScript comme langage mais pas selenium
c'est openSource

Lien important cypress: https://learn.cypress.io/testing-your-first-application/how-to-test-multiple-pages

##### XPATH
Pour utiliser les xpath avec cypress: 
 - npm install -D cypress-xpath
 - Ajouter dans le fichier support/commands.js => /// <reference types='cypress-xpath' />
 - Ajouter dans le fichier support/e2e.js  =>  require ('cypress-xpath')
 - Utilisation: cy.xpath(value_xpath)

##########################################################       ####################################################################
##### ASSERTION #####   Voir la documentation: https://docs.cypress.io/guides/references/assertions

 Implicit assertions => proviens directment de cypress
	- should
	    *Ex: cy.url().should('include','limsmetik')  ----- cy.url().should('eq','www.limsmetik.com') ----- cy.url().should('con  tain','lims') 
	    *Ex: cy.url().should('include','limsmetik').should('eq','www.limsmetik.com').should('conotain','lims')     => multiple assertions
	- and
	    *Ex: cy.title().should('include','limsmetik').and('not.contain','atos')
	    *Ex: cy.get("#last-name").should('be.visible').and('exist')

 Explicit assertions => les assertions qu'on ecrit explicitement
	- expect
	- assert
		*Ex: cy.get("#last-name").then( (x) => {
		
				let actuelName = x.text()
				//BDD style
				expect(actuelName).to.equal('Milk')
			        expect(actuelName).to.not.equal('Malick')
				
				//TDD style
				assert.equal(actuelName,'Milk')
				assert.notEqual(actuelName,'Malick')
			})
	

##### Implicit Assertions ##############################
Should-Contain	====> .should('contain','Button')
Should-Have	====> .should('have.class','query-btn')
			       have.text
			       have.html
Shuold-be	====> .should('be.visible')
			       be.selected
			       be.disabled
			       be.focused = have.focus
Should-equal	====> .invoke('attr','id').should('equal','query-btn')
And	====> Chained assertion
########################################################################

###### Explicit Assertions ##############################
expect	====>   let name = 'cypress';
		expect(name).to.be.equal('cypress')	
			     to.not.equal()	
			     to.be.a.('string')	
			     to.be.true	
			     to.be.false	
			     to.be.null
			     to.exist		

assert  ====>   assert.equal(5, '5')	assert.equal(5, 5)	assert.strictEqual(5, '5')
		assert.notEqual			.true
		assert.strictEqual		.false
		assert.isAbove			.isString
		assert.isBelow			.isNotString
		assert.exists			.isNumber
		assert.notExists		.isNotNumber

########################################################################



Contenu fichier cypress.config.json

const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
  "video": false, //désactive l'enregistrement vidéo des tests
  "defaultCommandTimeout": 5000,
  "pageLoadTimeout": 10000,
  "ignoreTestFiles": ["*.js","*.md"]
});



###### Imortant Notes  ###############
On peut mettre un BeforeEach() dans le fichier "Support/e2e.js" pour qu'il puisse s'exécuter automatiquement avant le lancement de tous les tests dans n'importe quel spec file
"selectorshub" extention chrome pour construire ses propres Xpath
##############################################


##########################################################       ####################################################################

##### CYPRESS CUCUMBER ################    Lien important pour le cucumber => https://filiphric.com/cucumber-in-cypress-a-step-by-step-guide

Le lien du plugin cucumber: https://github.com/badeball/cypress-cucumber-preprocessor
Dependance à installer Apres avoir renseigner les differents conf dans le fichier "cypress.config.json":
   ##Les 2 processor ##
npm install @badeball/cypress-cucumber-preprocessor --save -dev
npm install @cypress/browserify-preprocessor --save -dev

NB: le nom du dossier et contenant nos stepDef doit avoir le mm nom que les feature file ==> pour pouvoir communiquer

npm cache clear --force // pour supprimer les caches et redemarrer le server


Pour créer une commannde spéciale depuis le fichier "commands.js" dans le dossier "support":
//créer une commande spéciale qui sera réutilisable pour checker le path
Cypress.Commands.add('redirection', (sectionName) => {
    cy.location().should((my_location) => {
        expect(my_location.hash).to.eq(sectionName)   
    })

})	

#################################################################           ############################################################################

######  Upload/Download FILE   ####################################################################

### File upload in cypress
SETUP
	Step 1 : Install plugin cypress-file-upload
	npm install --save-dev cypress-file-upload

Step 2 : If you are using TypeScript, ensure your tsconfig.json contains
	"compilerOptions": {
  	"types": ["cypress", "cypress-file-upload"]  
	}

Step 3 : Add to cypress/support/commands.js
	import 'cypress-file-upload';

Step 4 :  Check this commands.js is imported in cypress/support/index.js 
	(it might be commented)
	// Import commands.js using ES2015 syntax:
	import './commands';

        //Si vous utilisez une version plus récente, vous devez avoir le import './commands' dans le fichier cypress/support/e2e.js

TEST
Step 1 : Create a new test
Step 2 : Add command to visit the web page
cy.visit(' ... ')
Step 3 : Add command to upload file
cy.get('[name="myfile"]').attachFile(' filePath ');

===> Important Lien : https://www.npmjs.com/package/cypress-file-upload 

###########################     ####################################

### File download in cypress
SETUP
	Step 1 : Install plugin cypress-downloadfile
	npm install cypress-downloadfile

Step 2 : Add to cypress/support/commands.js
	require('cypress-downloadfile/lib/downloadFileCommand')

Step 3 : Add to cypress/cypress.config.json
	const {downloadFile} = require('cypress-downloadfile/lib/addPlugin')
 e2e: {
 	setupNodeEvents(on, config) {
        on('task', {downloadFile}) //Config pour le download file
         }
      }

TEST
Step 1 : Create a new test

Step 2 : If autocomplete does not work add at the top
/// ＜reference types="cypress-downloadfile"/＞

Step 3 : Add command to download file
cy.downloadFile('https://filepath/demo.txt,  'mydownloads' ,'demo.txt')

===> Important Lien : https://www.npmjs.com/package/cypress-downloadfile


##########################################################       ####################################################################

####   HTML REPORT    ####################################################################

1. How to install mochawesome reporter
2. How to configure the reporter
3. How to merge multiple JSON report files
4. How to generate a single HTML report
5. Troubleshooting issues like
Unexpected token   in JSON at position 0
Unexpected end of JSON input
6. Run reports command automatically using
    pretest and posttest scripts in package.json


Step 1 - Install mochawesome library

npm install mochawesome --save-dev

Step 2 - Install mochawesome-merge library

npm install mochawesome-merge --save-dev

Step 3 - Add reports configuration in cypress.json

{
 "reporter": "mochawesome",
 "reporterOptions": {
   "charts": true,
   "overwrite": false,
   "html": false,
   "json": true,
   "reportDir": "cypress/report/mochawesome-report"
  }
 }

Step 4 - Run command to execute tests

	npx cypress run --reporter mochawesome

Step 5 - Run command to merge multiple json reports into one

	npx mochawesome-merge cypress/report/mochawesome-report/*.json | out-file -encoding ascii cypress/report/all_test.json

Step 6 - Run command to generate html report

	npx marge cypress/report/all_test.json --reportDir ./ --inline

Add report generation commands
in package.json scripts
pretest
test
posttest

*Dans le "pretest" on met un script pour supprimer tous les fichiers report déjà générés dans le dossier report
	=> "pretest": "rm -r ./cypress/reports/*.json"   => au lieu d'utiliser "rm -r" vu que c'est windows, on install "npm install rimraf" puis on utilise "rimraf" à la place de "rm -r"

*Dans le "posttest" on met les scripts pour générer les reports
	=> 
"scripts": {
    "pretest": "rimraf ./cypress/report",
    "test": "npm run cypress run || npm run posttest",
    "posttest": "npm run merge-reports && npm run generate-htmlreport",
    "merge-reports":"mochawesome-merge cypress/report/mochawesome-report/*.json > all_test.json",         NB: => on utilise '>' au lieu de '|' sur Windows
    "generate-htmlreport":"marge all_test.json --reportDir cypress/report"
  }
*Après on lance la commande "npm run test"  => le "pretest" va s'executer puis le "test" et afin le "posttest" pour générer les reports


Je dois voir maintenant comment ca peut marcher avec le cumcumber ????????????







##########################################################       ####################################################################

##### Github Action  ####################################################################

### Github Action ###

*Créer un dossier ".github"
*puis un sous dossier "workflows"
*On crée un fichier "main.yml"
*puis mettre cette configuration dans le fichier 
	name: Chrome headed
on: push
jobs:
  cypress-run:
    runs-on: ubuntu-22.04
    steps:
      - uses: actions/checkout@v4
      - uses: cypress-io/github-action@v6
        with:
          browser: chrome
          headed: true

*On met le projet sur notre git
*après avoir faire un push, on part sur "Actions" puis on vérifie le run de notre job

##########################################################       ####################################################################

#### Cypress Cloud  ####################################################################


###### Pour utiliser cypress cloud (pour un meilleur reporting)  ########
 Créer une organisation depuis le cloud de cypress => https://cloud.cypress.io/organizations
 Créer un projet
-Pour lancer direct ton projet en local 
     => npx cypress run --record --key 04b58147-474f-4068-a2e6-e1be2555ceba
-Pour lancer depuis github actions 
     => Ajouter le secret Key depuis github
           => Settings - Secrets and Variables - Actions - New Repository secret => Mettre le key "CYPRESS_RECORD_KEY_PMBA" et la valeur " "
 	   => (on peut recupérer la valeur depuis le cypress cloud dans ton projet => "Project settings" - Record Key)
           => Autoriser l'acces cypress à ton git => "Project settings" - Git Hub Integration - cliquer sur "Enable git hub"
           => config de ton .yml
                 name: Chrome headed
		  on: push
		   jobs:
  			cypress-run:
    			runs-on: ubuntu-22.04
    			steps:
      				- uses: actions/checkout@v4
      				- uses: cypress-io/github-action@v6
        		with:
          		start: npx cypress run --record --key ${{ secrets.CYPRESS_RECORD_KEY_PMBA }}
          		browser: chrome
	    => déclencher le job en faisant un push => et on aura le run depuis github Action ET depuis cypress cloud





















