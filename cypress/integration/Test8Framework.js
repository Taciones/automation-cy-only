/// <reference types="Cypress" />
import HomePage from '../support/pageObjects/HomePage'
import ProductPage from '../support/pageObjects/ProductPage'
describe('My Second Test Suite', function() 
{

    before(function() {
        // runs once before all tests in the block
        cy.fixture('example').then(function(data)
        {
          //below we are writing a global variable.
this.data=data
        })
      })



it('My FirstTest case',function() {
 
const homePage=new HomePage()
const productPage=new ProductPage()
    cy.visit(Cypress.env('url')+"/angularpractice/")

homePage.getEditBox().type(this.data.name)
homePage.getGender().select(this.data.gender)
homePage.getTwoWayDataBinding().should('have.value',this.data.name)
//Below is a function that can pause the test and will wait for user to resume it.
cy.pause()
//Below is how we validate the attributes inside the elements. Or also we can remove the atributes as well.
homePage.getEditBox().should('have.attr','minlength','2')
homePage.getEntrepreneaur().should('be.disabled')

//below will overwrite the default wait time from this point on.
Cypress.config('defaultCommandTimeout', 8000)
homePage.getShopTab().click()



this.data.productName.forEach(function(element) {
 
    cy.selectProduct(element)
  });
  productPage.checkOutButton().click()
  var sum=0

  cy.get('tr td:nth-child(4) strong').each(($el, index, $list) => {

//here we will split and remove special characteres from the product prices. so then we can sum
//after slipiting into an array on 2 indexes, we get only the second index.
 const amount=$el.text()
 var res= amount.split(" ")
res= res[1].trim()
sum= Number(sum)+Number(res)

}).then(function()
{
    cy.log(sum)
})
cy.get('h3 strong').then(function(element)
{
    const amount=element.text()
    var res= amount.split(" ")
   var total= res[1].trim()
   expect(Number(total)).to.equal(sum)

})
  cy.contains('Checkout').click()
  cy.get('#country').type('India')
  cy.get('.suggestions > ul > li > a').click()
  cy.get('#checkbox2').click({force: true})
  cy.get('input[type="submit"]').click()
  //cy.get('.alert').should('have.text','Success! Thank you! Your order will be delivered in next few weeks :-).')
  cy.get('.alert').then(function(element)
  {
     const actualText=element.text()
    expect(actualText.includes("Success")).to.be.true
  })


  






    









})
})































