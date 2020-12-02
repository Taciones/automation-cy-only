/// <reference types="Cypress" />
 
describe('My Second Test Suite', function() 
{
 
it('My FirstTest case',function() {
 
//Check boxes
cy.visit("https://rahulshettyacademy.com/AutomationPractice/")

cy.get('#checkBoxOption1').check().should('be.checked').and('have.value','option1')
cy.get('#checkBoxOption1').uncheck().should('not.be.checked')
cy.get('input[type="checkbox"]').check(['option2','option3'])
 

//window alert
cy.get('#alertbtn').click()
cy.get('[value="Confirm"]').click()
//Here you fire the alert, and pass 2 objects, the first is firing it and the second is the output
cy.on('window:alert', (String) => {
    //Mocha
    expect(String).to.equal("Hello , share this practice page and share your knowledge")
})
//Confirm Window
cy.on('window:confirm', (String) => {
    //Mocha
    expect(String).to.equal("Hello , Are you sure you want to confirm?")
})


//Static Dropdown
 
cy.get('select').select('option2').should('have.value','option2')
 
//Dynamic dropdowns
cy.get('#autocomplete').type('ind')
 
cy.get('.ui-menu-item div').each(($e1, index, $list) => {
 
    if($e1.text()==="India")
    {
        $e1.trigger('click')
    }
 
 
})
//autocomplete
cy.get('#autocomplete').should('have.value','India')
//visible invisible
cy.get('#displayed-text').should('be.visible')
cy.get('#hide-textbox').click()
cy.get('#displayed-text').should('not.be.visible')
cy.get('#show-textbox').click()
cy.get('#displayed-text').should('be.visible')
 
//radio buttons
 
cy.get('[value="radio2"]').check().should('be.checked')

//Handle child windows- tabs
cy.get('#opentab').invoke('removeAttr','target').click()
cy.url().should('contain', 'rahulshettyacademy.com')
cy.go('back')
 
 
 
 
 
 
}  )
 
 
 
}  )