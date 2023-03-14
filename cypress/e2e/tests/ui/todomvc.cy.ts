import { faker } from '@faker-js/faker';

describe('TODOMVC App', () => {
  const S = {
    todoInput: '[data-reactid=".0.0.1"]',
    todoItems: '[data-reactid=".0.1.2"] > li',
    todoItemsDeleteButton: '.destroy',
    todoItemsCheckButton: '.toggle',
    allButton: '[data-reactid=".0.2.1.0.0"]',
    activeButton: '[data-reactid=".0.2.1.2.0"]',
    completeButton: '[data-reactid=".0.2.1.4.0"]',
    clearCompletedButton: '[data-reactid=".0.2.2"]',
    toggleAll: '[data-reactid=".0.1.1"]'
  };

  beforeEach(() => {
    cy.visit('https://todomvc.com/examples/react/#/');
  })

  it('Todo Input is empty', () => {
    cy.get(S.todoInput).should('have.text', '');
  });

  it('Todo items adding', () => {
    cy.get(S.todoInput)
      .type(faker.lorem.sentence(5))
      .type('{enter}');

    cy.get(S.todoInput)
      .type(faker.lorem.sentence(5))
      .type('{enter}');

    cy.get(S.todoItems).should('have.length', 2);
  });

  it("Todo items deleting", () => {
    cy.get(S.todoInput)
      .type(faker.lorem.sentence(5))
      .type('{enter}');

    cy.get(S.todoInput)
      .type(faker.lorem.sentence(5))
      .type('{enter}');

    cy.get(S.todoItems).should('have.length', 2);

    // cy.get(S.todoItems).last().trigger('mouseover');
    cy.get(S.todoItemsDeleteButton).last().click({force: true});
    cy.get(S.todoItems).should('have.length', 1);
  });


  it("Todo items status check", () => {
    cy.get(S.todoInput)
      .type(faker.lorem.sentence(5))
      .type('{enter}');

    cy.get(S.todoInput)
      .type(faker.lorem.sentence(5))
      .type('{enter}');

    cy.get(S.todoInput)
      .type(faker.lorem.sentence(5))
      .type('{enter}');

    cy.get(S.todoItems).should('have.length', 3);

    cy.get(S.todoItemsCheckButton).eq(0).click();
    cy.get(S.todoItemsCheckButton).eq(1).click();

    cy.get(S.activeButton).click();
    cy.get(S.todoItems).should('have.length', 1);

    cy.get(S.completeButton).click();
    cy.get(S.todoItems).should('have.length', 2);

    cy.get(S.allButton).click();
    cy.get(S.todoItems).should('have.length', 3);

    cy.get(S.clearCompletedButton).click();
    cy.get(S.todoItems).should('have.length', 1);

    cy.get(S.toggleAll).click();

    cy.get(S.clearCompletedButton).click();
    cy.get(S.todoItems).should('have.length', 0);

  });
});
