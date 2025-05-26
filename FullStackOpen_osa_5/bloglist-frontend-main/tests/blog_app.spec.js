import { test, expect } from '@playwright/test'

test.describe('Blog app', () => {
  test.beforeEach(async ({ page, request }) => {
    await request.post('http://localhost:3001/api/testing/reset')
    await request.post('http://localhost:3001/api/users', {
      data: {
        name: '111 222',
        username: '111',
        password: '111',
      },
    })

    await request.post('http://localhost:3001/api/users', {
      data: {
        name: '222 111',
        username: '222',
        password: '222',
      },
    })

    await page.goto('http://localhost:5173')
  })

  test('Login form is shown', async ({ page }) => {
    await expect(page.locator('input[name="Username"]')).toBeVisible()
    await expect(page.locator('input[name="Password"]')).toBeVisible()
    })


  test.describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
        await page.locator('input[name="Username"]').fill('111')
        await page.locator('input[name="Password"]').fill('111')
        await page.getByRole('button', { name: 'login' }).click()

        await expect(page.getByText('111 222 logged in')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
        page.once('dialog', async dialog => {
        expect(dialog.message()).toBe('Wrong credentials')
        await dialog.dismiss()
    })

    await page.locator('input[name="Username"]').fill('111')
    await page.locator('input[name="Password"]').fill('222')
    await page.getByRole('button', { name: 'login' }).click()
    })
  })

    test('a new blog can be created', async ({ page }) => {
        await page.locator('input[name="Username"]').fill('111')
        await page.locator('input[name="Password"]').fill('111')
        await page.getByRole('button', { name: 'login' }).click()
        await expect(page.getByText('111 222 logged in')).toBeVisible()
        await page.getByRole('button', { name: /create new blog/i }).click()
        await page.getByLabel('title:').fill('test1')
        await page.getByLabel('author:').fill('test2')
        await page.getByLabel('url:').fill('12.com')
        await page.getByRole('button', { name: /create/i }).click()

        await expect(page.getByText('test1 test2')).toBeVisible()
    })

    test('a blog can be liked', async ({ page }) => {
        await page.locator('input[name="Username"]').fill('111')
        await page.locator('input[name="Password"]').fill('111')
        await page.getByRole('button', { name: 'login' }).click()
        await expect(page.getByText('111 222 logged in')).toBeVisible()
        await page.getByRole('button', { name: /create new blog/i }).click()
        await page.getByLabel('title:').fill('test blog')
        await page.getByLabel('author:').fill('tester')
        await page.getByLabel('url:').fill('http://test.com')
        await page.getByRole('button', { name: /create/i }).click()
        const blogEntry = page.getByText('test blog tester')
        await expect(blogEntry).toBeVisible()
        await blogEntry.getByRole('button', { name: /view/i }).click()
        const likesLocator = page.locator('text=likes').filter({ hasText: '0' })
        await expect(likesLocator).toBeVisible()
        await page.getByRole('button', { name: /like/i }).click()
        const likesOneLocator = page.locator('text=likes').filter({ hasText: '1' })
        await expect(likesOneLocator).toBeVisible()
    })

    test('the user who added a blog can delete it', async ({ page }) => {

        await page.locator('input[name="Username"]').fill('111')
        await page.locator('input[name="Password"]').fill('111')
        await page.getByRole('button', { name: 'login' }).click()
        await expect(page.getByText('111 222 logged in')).toBeVisible()
        await page.getByRole('button', { name: /create new blog/i }).click()
        await page.getByLabel('title:').fill('delete test blog')
        await page.getByLabel('author:').fill('deleter')
        await page.getByLabel('url:').fill('http://delete.com')
        await page.getByRole('button', { name: /create/i }).click()
        const blogEntry = page.getByText('delete test blog deleter')
        await expect(blogEntry).toBeVisible()
        await blogEntry.getByRole('button', { name: /view/i }).click()
        page.once('dialog', async dialog => {
            expect(dialog.type()).toBe('confirm')
            await dialog.accept()
        })
        await page.getByRole('button', { name: /delete/i }).click()
        await expect(blogEntry).not.toBeVisible()
        })

        test.describe('Blog deletion visibility', () => {
  })

  test('only creator sees the remove button', async ({ page }) => {
    await page.locator('input[name="Username"]').fill('111')
    await page.locator('input[name="Password"]').fill('111')
    await page.getByRole('button', { name: 'login' }).click()
    await expect(page.getByText('111 222 logged in')).toBeVisible()
    await page.getByRole('button', { name: /create new blog/i }).click()
    await page.getByLabel('title:').fill('Unique Blog')
    await page.getByLabel('author:').fill('Author1')
    await page.getByLabel('url:').fill('http://unique.blog')
    await page.getByRole('button', { name: /create/i }).click()
    const blogEntry = page.getByText('Unique Blog Author1')
    await expect(blogEntry).toBeVisible()
    await blogEntry.getByRole('button', { name: /view/i }).click()
    await expect(page.getByRole('button', { name: /delete/i })).toBeVisible()
    await page.getByRole('button', { name: /logout/i }).click()
    await page.locator('input[name="Username"]').fill('222')
    await page.locator('input[name="Password"]').fill('222')
    await page.getByRole('button', { name: 'login' }).click()
    await expect(page.getByText('222 111 logged in')).toBeVisible()
    const blogEntryUser2 = page.getByText('Unique Blog Author1')
    await expect(blogEntryUser2).toBeVisible()
    await blogEntryUser2.getByRole('button', { name: /view/i }).click()
    await expect(page.getByRole('button', { name: /delete/i })).toHaveCount(0)
  })

    test('blogs are ordered by likes descending', async ({ page }) => {
        await page.locator('input[name="Username"]').fill('111')
        await page.locator('input[name="Password"]').fill('111')
        await page.getByRole('button', { name: 'login' }).click()
        await expect(page.getByText('111 222 logged in')).toBeVisible()
        const loggedUser = await page.evaluate(() => localStorage.getItem('loggedBlogUser'))
        const token = loggedUser ? JSON.parse(loggedUser).token : null
        const blogs = [
            { title: 'Blog 1', author: 'Author1', url: 'url1', likes: 2 },
            { title: 'Blog 2', author: 'Author2', url: 'url2', likes: 5 },
            { title: 'Blog 3', author: 'Author3', url: 'url3', likes: 3 },
        ]

        for (const blog of blogs) {
            await page.request.post('http://localhost:3001/api/blogs', {
            data: blog,
            headers: { Authorization: `Bearer ${token}` },
            })
        }
        await page.goto('http://localhost:5173')
        for (const blog of blogs) {
            await expect(page.getByText(`${blog.title} ${blog.author}`)).toBeVisible()
        }
        const blogElements = await page.locator('.blog').all()
        const likes = []
        for (const blogEl of blogElements) {
            const text = await blogEl.textContent()
            const match = text?.match(/likes (\d+)/)
            likes.push(match ? parseInt(match[1], 10) : 0)
        }
        for (let i = 0; i < likes.length - 1; i++) {
            expect(likes[i]).toBeGreaterThanOrEqual(likes[i + 1])
        }
        })
})
