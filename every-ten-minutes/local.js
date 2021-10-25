// @ts-check
const { shops } = require('./shops')

const { chromium } = require('playwright-chromium')

;(async () => {
  const browser = await chromium.launch({ headless: false })
  const available = []

  for (const shop of shops) {
    const { checkStock, vendor, url } = shop

    let page

    try {
      page = await browser.newPage()
      await page.goto(url)
      await page.screenshot({ path: `screenshots/${vendor}.png` })

      const hasStock = await checkStock({ page })
      if (hasStock) available.push(vendor)

      const log = `${vendor}: ${hasStock ? 'HAS STOCK!!!! 🤩' : 'Out of Stock 🥲'}`

      console.log(log)
    } catch (error) {
      console.log(`${vendor}: Error. Comprueba la screenshot: screenshots/${vendor}.png`)
    } finally {
      await page.close()
    }
  }

  const availableOn = available.length > 0
    ? `Disponible en: ${available.join(', ')}`
    : 'No hay stock 😢'

  console.log(availableOn)

  await browser.close()
})()
