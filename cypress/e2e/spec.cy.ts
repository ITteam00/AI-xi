describe('My First Test', () => {
  it('Visits the initial project page', () => {
    cy.visit('/')
    cy.get('[data-cy="add-counter-btn"]').click();
    cy.get('[data-cy="decrease-shower"]').contains('number: 0');
    cy.get('[data-cy="increase-btn"]').click();
    cy.get('[data-cy="increase-btn"]').click();
    cy.get('.btn').contains('+').click();
    cy.get('[data-cy="decrease-shower"]').contains('number: 3');
    cy.get('[data-cy="decrease-btn"]').click();
    cy.get('.btn').contains('-').click();

    cy.get('[data-cy="decrease-shower"]').contains('number: 1');
  })
})
