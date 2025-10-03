import { test, expect } from '@playwright/test'

test.describe('Authentication', () => {
  test('should redirect to login when not authenticated', async ({ page }) => {
    await page.goto('/')
    
    // Should redirect to login
    await expect(page).toHaveURL(/login/)
  })

  test('should show login form', async ({ page }) => {
    await page.goto('/login')
    
    await expect(page.getByText('Welcome to Dentalscaner')).toBeVisible()
    await expect(page.getByRole('button', { name: /sign in/i })).toBeVisible()
  })

  test('should have proper login form structure', async ({ page }) => {
    await page.goto('/login')
    
    // Check for form elements
    await expect(page.locator('form')).toBeVisible()
    await expect(page.getByRole('textbox')).toBeVisible()
  })
}) 