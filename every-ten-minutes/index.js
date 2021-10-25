// @ts-check
const { shops } = require('./shops')
const { chromium } = require('playwright-chromium')

module.exports = async function (context, myTimer) {
  const browser = await chromium.launch({ headless: true })
  const available = []

  for (const shop of shops) {
    const { checkStock, vendor, url } = shop

    const page = await browser.newPage()
    await page.goto(url)

    const hasStock = await checkStock({ page })
    if (hasStock) available.push(vendor)

    const log = `${vendor}: ${hasStock ? 'HAS STOCK!!!! 🤩' : 'Out of Stock 🥲'}`

    context.log(log)

    // await page.screenshot({ path: `screenshots/${vendor}.png` })
    await page.close()
  }

  const availableOn = available.length > 0
    ? `Disponible en: ${available.join(', ')}`
    : 'No hay stock 😢'

  context.res = {
    body: {
      availableOn
    },
    headers: {
      'Content-Type': 'application/json'
    }
  }

  await browser.close()
}
