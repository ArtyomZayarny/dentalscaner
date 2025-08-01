import { test, expect } from '@playwright/test'

test.describe('Authentication', () => {
  test('should redirect to sign-in when not authenticated', async ({ page }) => {
    await page.goto('/')
    
    // Should redirect to sign-in
    await expect(page).toHaveURL(/sign-in/)
  })

  test('should show sign-in form', async ({ page }) => {
    await page.goto('/sign-in')
    
    await expect(page.getByText('Welcome to Dentalscaner')).toBeVisible()
    await expect(page.getByRole('button', { name: /sign in/i })).toBeVisible()
  })

  test('should have proper sign-in form structure', async ({ page }) => {
    await page.goto('/sign-in')
    
    // Check for form elements
    await expect(page.locator('form')).toBeVisible()
    await expect(page.getByRole('textbox')).toBeVisible()
  })
}) 