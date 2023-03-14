import { test, expect } from '@playwright/test';

const S = {
  pageTitle: '[data-cy="title"]',
  todoInput: '[data-cy="todo-text"]',
  todoItem: '[data-cy="todo-item"]',
  checkboxItem: '[data-cy="checkbox"]',
  todoItemLabel: '[data-cy="label"]',
  editTodoText: '[data-cy="edit-text"]',
  addTodoBtn: '[data-cy="add-btn"]',
  editTodoBtn: '[data-cy="edit-btn"]',
  saveTodoBtn: '[data-cy="save-btn"]',
  deleteTodoBtn: '[data-cy="delete-btn"]',
};

test.describe('Todo', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/todo');
  });

  test('Verify page title', async ({ page }) => {
    await expect(page.locator(S.pageTitle)).toContainText('Todo list');
  });

  test('Add 4 todo items', async ({ page }) => {
    await page.locator(S.todoInput).fill('item 1');
    await page.locator(S.addTodoBtn).click();

    await page.locator(S.todoInput).fill('item 2');
    await page.locator(S.addTodoBtn).click();

    await page.locator(S.todoInput).fill('item 3');
    await page.locator(S.addTodoBtn).click();

    await page.locator(S.todoInput).fill('item 4');
    await page.locator(S.addTodoBtn).click();

    const todoItems = await page.locator(S.todoItem).count();

    await expect(todoItems).toBe(4);
  });

  test('Filter todo items', async ({ page }) => {
    await page.locator(S.todoInput).fill('item 1');
    await page.locator(S.addTodoBtn).click();

    await page.locator(S.todoInput).fill('item 2');
    await page.locator(S.addTodoBtn).click();

    await page.locator(S.todoInput).fill('item 3');
    await page.locator(S.addTodoBtn).click();

    const todoItems = await page.locator(S.todoItem).count();

    await expect(todoItems).toBe(3);

    const firstCheckboxItem = await page.locator(S.checkboxItem).nth(0);
    const secondCheckboxItem = await page.locator(S.checkboxItem).nth(1);
    const showActiveBtn = await page.locator("[data-cy='show-active-btn']");
    const showInActiveBtn = await page.locator("[data-cy='show-inactive-btn']");
    const showAllBtn = await page.locator("[data-cy='show-all-btn']");

    await firstCheckboxItem.click();
    await secondCheckboxItem.click();

    await showActiveBtn.click();

    const todoActiveItems = await page.locator(S.todoItem).count();

    await expect(todoActiveItems).toBe(1);

    await showInActiveBtn.click();

    const todoInActiveItems = await page.locator(S.todoItem).count();

    await expect(todoInActiveItems).toBe(2);

    await showAllBtn.click();

    const todoAllItems = await page.locator(S.todoItem).count();

    await expect(todoAllItems).toBe(3);
  });

  test('Edit todo item', async ({ page }) => {
    const newText = 'New Text';

    await page.locator(S.todoInput).fill('item 1');
    await page.locator(S.addTodoBtn).click();

    const firstTodoItem = await page.locator(S.todoItem).nth(0);
    await firstTodoItem.locator(S.editTodoBtn).click();

    await firstTodoItem.locator(S.editTodoText).fill(newText);
    await firstTodoItem.locator(S.saveTodoBtn).click();

    await expect(firstTodoItem).toContainText(newText);
  });

  test('Delete todo item', async ({ page }) => {
    await page.locator(S.todoInput).fill('item 1');
    await page.locator(S.addTodoBtn).click();

    await page.locator(S.todoInput).fill('item 2');
    await page.locator(S.addTodoBtn).click();

    await expect(await page.locator(S.todoItem).count()).toBe(2);

    const firstTodoItem = await page.locator(S.todoItem).nth(0);
    await firstTodoItem.locator(S.deleteTodoBtn).click();

    await expect(await page.locator(S.todoItem).count()).toBe(1);
  });
});
