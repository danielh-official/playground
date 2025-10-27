import { test, expect } from '@playwright/test';

test('homepage has title', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/Widgets/);
});

test('homepage has main heading', async ({ page }) => {
  await page.goto('/');
  const mainHeading = page.getByRole('heading', { name: 'Widgets' });
  await expect(mainHeading).toBeVisible();
});

test('going to widget creation page', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('link', { name: 'Add Widget' }).click();
  await expect(page).toHaveURL('/widgets/create');
  const createHeading = page.getByRole('heading', { name: 'Create Widget' });
  await expect(createHeading).toBeVisible();
});

test('creating a widget', async ({ page }) => {
  await page.goto('/widgets/create');

  const nameInput = page.getByLabel('name');
  await nameInput.fill('Test Widget');
  await page.getByRole('button', { name: 'Create Widget' }).click();

  await expect(page).toHaveURL('/');
  const newWidget = page.getByText('Test Widget');
  await expect(newWidget).toBeVisible();
});

test('creating a widget -> name has required attribute', async ({ page }) => {
  await page.goto('/widgets/create');

  await page.waitForSelector('input[name="name"][required]');
});

test('showing a widget details', async ({ page }) => {
  await page.goto('/widgets/create');

  const nameInput = page.getByLabel('name');
  await nameInput.fill('Test Widget');
  await page.getByRole('button', { name: 'Create Widget' }).click();

  await expect(page).toHaveURL('/');
  const newWidget = page.getByText('Test Widget');
  await expect(newWidget).toBeVisible();

  await page.getByText('Test Widget').click();

  await expect(page).toHaveURL(/\/widgets\/\d+/);
  const widgetName = page.getByRole('heading', { name: 'Test Widget' });
  await expect(widgetName).toBeVisible();
});

test('archiving and unarchiving a widget', async ({ page }) => {
  await page.goto('/widgets/create');

  const nameInput = page.getByLabel('name');
  await nameInput.fill('Test Widget');
  await page.getByRole('button', { name: 'Create Widget' }).click();

  await expect(page).toHaveURL('/');
  const newWidget = page.getByText('Test Widget');
  await expect(newWidget).toBeVisible();

  await page.getByText('Test Widget').click();

  await expect(page).toHaveURL(/\/widgets\/\d+/);
  const widgetName = page.getByRole('heading', { name: 'Test Widget' });
  await expect(widgetName).toBeVisible();

  const pageId = page.url().split('/').pop() || '';

  const archiveButton = page.getByRole('button', { name: 'Archive Widget' });

  page.on('dialog', async (dialog) => await dialog.accept());

  await archiveButton.click();

  await page.goto('/widgets/archived');

  const archivedWidget = page.getByText('Test Widget');
  await expect(archivedWidget).toBeVisible();

  await page.goto(`/widgets/${pageId}`);

  const unarchiveButton = page.getByRole('button', {
    name: 'Unarchive Widget',
  });
  await expect(unarchiveButton).toBeVisible();

  await unarchiveButton.click();

  await expect(archiveButton).toBeVisible();
});

test('deleting a widget', async ({ page }) => {
  await page.goto('/widgets/create');

  const nameInput = page.getByLabel('name');
  await nameInput.fill('Test Widget');
  await page.getByRole('button', { name: 'Create Widget' }).click();

  await expect(page).toHaveURL('/');
  const newWidget = page.getByText('Test Widget');
  await expect(newWidget).toBeVisible();

  await page.getByText('Test Widget').click();

  await expect(page).toHaveURL(/\/widgets\/\d+/);
  const widgetName = page.getByRole('heading', { name: 'Test Widget' });
  await expect(widgetName).toBeVisible();

  const deleteButton = page.getByRole('button', { name: 'Delete Widget' });

  page.on('dialog', async (dialog) => await dialog.accept());

  await deleteButton.click();

  await expect(page).toHaveURL('/');
  await expect(page.getByText('Test Widget')).toHaveCount(0);
});

test('editing a widget', async ({ page }) => {
  await page.goto('/widgets/create');

  const nameInput = page.getByLabel('name');
  await nameInput.fill('Test Widget');
  await page.getByRole('button', { name: 'Create Widget' }).click();

  await expect(page).toHaveURL('/');
  const newWidget = page.getByText('Test Widget');
  await expect(newWidget).toBeVisible();

  await page.getByText('Test Widget').click();

  await expect(page).toHaveURL(/\/widgets\/\d+/);
  const widgetName = page.getByRole('heading', { name: 'Test Widget' });
  await expect(widgetName).toBeVisible();

  const editLink = page.getByRole('link', { name: 'Edit Widget' });
  await editLink.click();

  const nameEditInput = page.getByLabel('name');
  await nameEditInput.fill('Updated Widget Name');

  await page.getByRole('button', { name: 'Update Widget' }).click();

  await expect(page).toHaveURL(/\/widgets\/\d+/);
  const updatedWidgetName = page.getByRole('heading', {
    name: 'Updated Widget Name',
  });
  await expect(updatedWidgetName).toBeVisible();
});
