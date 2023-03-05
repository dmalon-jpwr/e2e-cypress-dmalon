describe('TODO App', () => {
  const S = {
    title: '[data-cy="title"]',
    todoItem: '[data-cy="todo-item"]',
  };

  it('Go to welcome page', () => {
    cy.visit('/');
    cy.get(S.title).should('have.text', 'welcome!');

    cy.url().should('include', '/home');
  });

  it('Navigation', () => {
    cy.visit('/');

    cy.get(`[data-automationid="home-page"]`).should('have.text', 'Home').should('have.attr', 'href', '/home');
    cy.get(`[data-automationid="todo-page"]`).should('have.text', 'Todo list').should('have.attr', 'href', '/todo');
    cy.get(`[data-automationid="posts-page"]`).should('have.text', 'Posts').should('have.attr', 'href', '/posts');
    cy.get(`[data-automationid="gallery-page"]`).should('have.text', 'Gallery').should('have.attr', 'href', '/gallery');
    cy.get(`[data-automationid="about-page"]`).should('have.text', 'About').should('have.attr', 'href', '/about');
  });

  it('Todo items', () => {
    cy.visit('/todo');

    cy.get('[data-cy="todo-text"]').type('item 1');
    cy.get('[data-cy="add-btn"]').click();

    cy.get('[data-cy="todo-text"]').type('item 2');
    cy.get('[data-cy="add-btn"]').click();

    cy.get(S.todoItem).should('have.length', 2);
  });
});
