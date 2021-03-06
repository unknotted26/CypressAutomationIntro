describe("My First Test Suite", function() {
    // all test cases go in here
    it("My First Test Case", function() {
        cy.visit("https://rahulshettyacademy.com/seleniumPractise/#/");
        cy.get('.search-keyword').type('ca')
        cy.wait(2000)
        cy.get('.product').should('have.length', 5)
        cy.get('.product:visible').should('have.length', 4)

        // parent child chaining
        cy.get('.products').as('productLocator') // alias since variable can't be assigned cypress object
        cy.get('.products').find('.product').should('have.length', 4)

        // add the 3rd visible product to the cart
        cy.get(':nth-child(3) > .product-action > button').click()
        cy.get('@productLocator').find('.product').eq(2).contains('ADD TO CART').click()
            .then(function() {
            console.log("ADD TO CART has been pressed!")
        })

        // get all the products in the element with the class value "products"
        cy.get('.products')
            .find('.product')
            .each(($element, index, $list) =>
        {
            // for each product, find the product name. Click if product is Cashews
            const textVeg = $element.find('h4.product-name').text()
            if(textVeg.includes('Cashews') || textVeg.includes('Carrot')) {
                $element.find('button').click()
            }
        })

        cy.get('.brand').should("have.text", "GREENKART")

        cy.get('.brand').then(function(logoElement){
            cy.log(logoElement.text());
        })

    }) // My First Test Case


})
