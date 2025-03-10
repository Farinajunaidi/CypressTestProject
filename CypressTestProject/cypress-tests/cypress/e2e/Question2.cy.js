/* Steps for Cypress Test Cases 
 1. Visit the Joget website
2. Ensure the navigation menu exists and is visible
3.To try the dropdown menu, click on the "About" dropdown menu
4.Once click About, click the "Contact Us" and page will redirect to the Contact Us page
5.Return to home page
7.Next click search icon on the navbar
8.Type "Explore"
9.Click on search icon
10.Wait for 2 seconds
11.Return to home page
12.Click on footer to see the footer
*/

describe('Navigation Menu Test', () => {
    beforeEach(() => {
        // Visit the Joget website
        cy.visit('https://joget.com/');
    });

    it('should open the dropdown menu, navigate to Contact Us, and return to Home', () => {
        // Handle uncaught exceptions to prevent test failure
        Cypress.on('uncaught:exception', (err, runnable) => {
            console.error('Uncaught exception:', err.message);
            return false; // Prevent Cypress from failing the test
        });

        // Ensure the navigation menu exists and is visible
        cy.get('#navbarNavDropdown', { timeout: 5000 }).should('exist').and('be.visible');

        // Click on the "About" dropdown menu (force if needed)
        cy.get('#menu-item-dropdown-417').should('exist').click({ force: true });

        // Ensure the dropdown menu is now visible
        cy.get('.dropdown-menu', { timeout: 5000 }).should('exist').and('be.visible');

        // Verify that the "Contact Us" link exists and has the correct href
        cy.get('.dropdown-menu')
            .contains('a', 'Contact Us') // Find the <a> tag with text "Contact Us"
            .should('have.attr', 'href', 'https://joget.com/contact-us/') 
            .click(); // Click the link

        // Verify that the "Contact Us" page has loaded
        cy.url().should('eq', 'https://joget.com/contact-us/'); 
        cy.contains('h1', 'Contact Us').should('be.visible'); 

        cy.wait(2500);

        // Return to the Home page
        cy.get('a[href="https://joget.com/"]').first().click(); 

        // Verify that the Home page has loaded
        cy.url().should('eq', 'https://joget.com/'); 

        cy.get('.d-none > [href="#"]').click(); 
        cy.get('.inputs--text-searchs').type('Explore');
        cy.wait(1000);
        cy.get('#searchformbtn > img').click();

        cy.wait(2000);

        // Return to the Home page
        cy.get('a[href="https://joget.com/"]').first().click(); 

        // Verify that the Home page has loaded
        cy.url().should('eq', 'https://joget.com/'); 
        cy.wait(1000);
        cy.get('.cky-notice-btn-wrapper > .cky-btn-accept').click();

        cy.get('.footer-blocks--block--last').scrollIntoView();
    });
});


