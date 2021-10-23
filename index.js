// @ts-check

const { chromium } = require('playwright')

const shops = [
  {
    vendor: 'Microsoft',
    url: 'https://www.xbox.com/es-es/configure/8WJ714N3RBTL',
    checkStock: async ({ page }) => {
      const content = await page.textContent('[aria-label="Finalizar la compra del pack"]')
      return content.includes('Sin existencias') === false
    }
  },
  {
    vendor: 'Game',
    url: 'https://www.game.es/OFERTAS/PACK/PACKS/XBOX-SERIES-X-CONTROLLER-XBOX/P03362',
    checkStock: async ({ page }) => {
      const content = await page.textContent('.product-quick-actions')
      return content.includes('Producto no disponible') === false
    }
  },
  {
    vendor: 'MediaMarkt',
    url: 'https://www.game.es/OFERTAS/PACK/PACKS/XBOX-SERIES-X-CONTROLLER-XBOX/P03362',
    checkStock: async ({ page }) => {
      const content = await page.textContent('.product-quick-actions')
      return content.includes('Producto no disponible') === false
    }
  }
]

;(async () => {
  const browser = await chromium.launch({ headless: false })

  for (const shop of shops) {
    const { checkStock, vendor, url } = shop

    const page = await browser.newPage()
    await page.goto(url)

    const hasStock = await checkStock({ page })
    console.log(`${vendor}: ${hasStock ? 'HAS STOCK!!!! 🤩' : 'Out of Stock 🥲'}`)
    await page.screenshot({ path: `screenshots/${vendor}.png` })
    await page.close()
  }

  await browser.close()
})()
