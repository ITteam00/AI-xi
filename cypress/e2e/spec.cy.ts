describe('Chat Box E2E Test', () => {
  beforeEach(() => {
    cy.visit('/'); // 访问你的应用程序
  });

  it('should display initial messages and allow user to send a new message', () => {

    cy.get('.messages .user, .messages .assistant').should('have.length', 0);

    cy.get('textarea[placeholder="Type a message..."]').type('Hello, this is a test message!{enter}');

    cy.get('button').contains('Send').click();

    cy.get('.messages .user').should('have.length', 1);
    cy.get('.messages .user').last().contains('Hello, this is a test message!');

    cy.intercept('POST', '/api/generateContent', {
      body: 'This is a response from the AI.'
    }).as('generateContent');

  });
});
