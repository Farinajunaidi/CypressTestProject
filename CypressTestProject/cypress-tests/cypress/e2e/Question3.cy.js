/*
1. Visit page https://qainterview.on.joget.cloud/jw/web/userview/isr/isr/_/home#menu
2.Click on sidebar-trigger
3.Make sidebar visible 
4.In container - MCSV_1_Container click Login_Link (a href https://qainterview.on.joget.cloud/jw/web/login)
5.Enter Username: cat and Password: password
6.Click on submit button (class type : submit).
7.Click on sidebar again to see all the menus
8.Click on Request (a href https://qainterview.on.joget.cloud/jw/web/userview/isr/isr/_/request)
9.Click on Create New Request (a href https://qainterview.on.joget.cloud/jw/web/userview/isr/isr/_/request/new)
10. Click on Submit to show that the form cannot be empty before submission
11. Scroll up to ensure the Subject column is visible
12. Insert the field Subject, Describe Issues, and in Due Date click the textbox and in calendar click the date 13/03/2025
13.Click the Attachment button and upload a file (Question7.txt)
14. Verify the uploaded file and ensure it matches the desired output
15. Submit the form
*/

describe('Login Test', () => {
    it('should log in successfully, create a new request, be able to select due date a week from today, validate empty form submission, upload attachment, and submit form successfully', () => {

        // Step 1: Visit the page
        cy.visit('https://qainterview.on.joget.cloud/jw/web/userview/isr/isr/_/home#menu');

        // Step 2: Click on the sidebar-trigger in the navbar
        cy.get('.navbar .hi-trigger.ma-trigger#sidebar-trigger').click();

        // Step 3: Ensure the sidebar is visible
        cy.get('#sidebar').should('be.visible');

        // Step 4: Click on the Login Link inside the sidebar
        cy.get('#mCSB_1_container #navigation .login_link').click();

        // Step 5: Enter Username and Password in the login form
        cy.get('main #loginForm #j_username').type('cat');
        cy.get('main #loginForm #j_password').type('password');

        // Step 6: Click on the submit button
        cy.get('main #loginForm input[type="submit"]').click();

        // Step 7: Click Sidebar again to see all the menus
        cy.get('.navbar .hi-trigger.ma-trigger#sidebar-trigger').click();
        cy.get('#sidebar').should('be.visible');

        // Step 8: Click Requester dropdown and select "Create A New Request"
        cy.get('#navigation .category a.dropdown').contains('Requester').click();
        cy.get('#navigation .category .menu-container').should('be.visible');
        cy.get('#navigation .category .menu-container a.menu-link.default')
            .contains('Create A New Request')
            .click();

        // Step 9: Verify navigation to the new request page
        cy.url().should('eq', 'https://qainterview.on.joget.cloud/jw/web/userview/isr/isr/_/new_request');

        // Step 10: Click Submit to validate that form cannot be empty
        cy.get('#assignmentComplete').click();

        // Step 11: Scroll to ensure the Subject field is visible
        cy.get('main #section1 .form-column .form-cell #subject').scrollIntoView();

        // Step 12: Insert Subject, Describe Issues, and select Due Date
        const dateToday = new Date();
        dateToday.setDate(dateToday.getDate() + 7); // One week from today

        // Format date for calendar selection
        const formattedDate = dateToday.getDate().toString().padStart(2, '0');

        cy.get('main #section1 .form-column .form-cell #subject').should('be.visible').type('Test Subject', { force: true });

        cy.get('main #section1 .form-column .form-cell #description').should('be.visible').type('This is a test description for the issue.');

        // Click Due Date field and ensure calendar is visible
        cy.get('main #section1 .form-column .form-cell #duedate_2010254777947936748112002017186').should('be.visible').click();

        cy.get('.ui-datepicker-calendar').should('be.visible').contains(formattedDate).click();

        // Step 13: Upload an attachment (Question7.txt)
        cy.get('#form-fileupload_attachment1_201025477794793674811_738997394 > .dz-message')
            .scrollIntoView()
            .should('be.visible');

        cy.get('input[type="file"]')
            .attachFile('Question7.txt', { subjectType: 'drag-n-drop' });

        // Step 14: Submit the form
        cy.get('#assignmentComplete').click();
    });
});
