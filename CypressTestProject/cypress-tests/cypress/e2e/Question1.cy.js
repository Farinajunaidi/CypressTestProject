describe('App Center Home Page', () => {
    beforeEach(() => {
        cy.visit('https://qainterview.cloud.joget.com/jw/web/userview/appcenter/v/_/home');
    });

    it('should load the home page successfully', () => {
        cy.url().should('include', '/appcenter/v/_/home'); // Verify URL contains the expected path

        cy.get('a.menu-link.default span').should('have.text', 'App Center');

        cy.get('nav').should('be.visible'); // Verify navigation bar is present

        cy.get('footer').should('be.visible'); // Verify footer is present
    });
});
