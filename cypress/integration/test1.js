/// <reference types="Cypress" />


describe("My first test suite", function() {
    it("my first test scenario", function() {
        cy.visit("https://rahulshettyacademy.com/seleniumPractise/#/")
        //cy.visit("https://www.amazon.com")
        //cy.get('#searchDropdownBox').select("Baby",{force: true})
        
        cy.get('.search-keyword').type("ca")
        cy.wait(2000)
        cy.get(".product").should("have.length", 5)
        cy.get(".product:visible").should("have.length", 4)
        //Below is to hold our elements into variables. call the alias function
        cy.get(".products").as('productslocator')
        cy.get("@productslocator").find(".product").should("have.length", 4)
        //Finding elements with indexes, sometimes it's not good because elements might change the indes later
        cy.get("@productslocator").find(".product").eq(2).contains("ADD TO CART").click().then(function() {
            //This is to print in the console of the browser. We use the Then function becuse Cypress is asynchronous
            console.log('console print')
        })
        //Let's find dynamically find the elements we want, Index is the number of iterations
        cy.get("@productslocator").find(".product").each(($el, index, $list) => {

            const textVeg = $el.find("h4.product-name").text()
            if(textVeg.includes("Cashews")) {
                $el.find('button').trigger("click")
            }

        })
        //Assert the logo is correctly
        cy.get('.brand').should('have.text', 'GREENKART')

        //this is to print into Cypress logs
        cy.get('.brand').then(function(logoelement) {
            cy.log(logoelement.text())
        })



    })



})