import { test, expect } from '@playwright/test'

test.describe('Navigation', () => {
  test('should have proper page structure', async ({ page }) => {
    await page.goto('/sign-in')
    
    // Check if the page loads without errors
    await expect(page).toHaveTitle(/Dentalscaner/)
  })

  test('should have responsive design', async ({ page }) => {
    await page.goto('/sign-in')
    
    // Test mobile viewport
    await page.setViewportSize({ width: 375, height: 667 })
    await expect(page.locator('body')).toBeVisible()
    
    // Test desktop viewport
    await page.setViewportSize({ width: 1920, height: 1080 })
    await expect(page.locator('body')).toBeVisible()
  })
}) 