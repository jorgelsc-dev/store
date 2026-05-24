import { chromium } from 'playwright'

const url = 'http://127.0.0.1:4174/'

function assert(condition, message) {
  if (!condition) {
    throw new Error(message)
  }
}

async function runDesktop(browser) {
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })
  await page.goto(url, { waitUntil: 'networkidle' })

  const h1 = await page.textContent('h1')
  assert(h1 && h1.includes('Pide rapido'), 'H1 principal no coincide')

  const quickBtn = page.locator('.hero-panel .v-btn:has-text("Enviar pedido")')
  const quickClassBefore = (await quickBtn.getAttribute('class')) || ''
  assert(quickClassBefore.includes('v-btn--disabled'), 'Botón de cotización debe iniciar deshabilitado')

  await page.getByLabel('Tu nombre').fill('Juan')
  await page.getByLabel('Producto o pedido').fill('Audifonos')

  const quickClassAfter = (await quickBtn.getAttribute('class')) || ''
  assert(!quickClassAfter.includes('v-btn--disabled'), 'Botón de cotización debe habilitarse con campos completos')

  const quickHref = await quickBtn.getAttribute('href')
  assert(quickHref?.includes('https://wa.me/'), 'Link cotización sin wa.me')
  assert(quickHref?.includes('text='), 'Link cotización sin texto codificado')

  const locationBtn = page.locator('.hero-panel .v-btn:has-text("Compartir mi ubicacion")')
  assert((await locationBtn.count()) === 1, 'Boton de ubicacion no encontrado')

  let cards = await page.locator('.product-card').count()
  assert(cards === 9, `Se esperaban 9 cards iniciales, hay ${cards}`)

  const searchInput = page.getByRole('textbox', { name: 'Buscar producto' })
  await searchInput.fill('serum')
  cards = await page.locator('.product-card').count()
  assert(cards === 1, `Búsqueda "serum" debía dar 1, dio ${cards}`)

  await searchInput.fill('')
  await page.locator('.category-chip', { hasText: 'Tech' }).click()
  cards = await page.locator('.product-card').count()
  assert(cards === 2, `Filtro Tech debía dar 2, dio ${cards}`)

  await page.locator('.category-chip', { hasText: 'Todo' }).click()

  await page.locator('.catalog-input .v-field').first().click({ force: true })
  await page.getByRole('option', { name: 'Precio: menor a mayor' }).click()
  const firstPrice = (await page.locator('.product-price').first().textContent()) || ''
  assert(firstPrice.includes('28'), `Orden ascendente incorrecto, primer precio: ${firstPrice}`)

  await page.locator('.ghost-link', { hasText: 'Ver' }).first().click({ force: true })
  await page.waitForSelector('.dialog-card', { state: 'visible', timeout: 5000 })
  const detailsVisible = await page.locator('.dialog-card .details-cta').isVisible()
  assert(detailsVisible, 'Modal de detalle no abrió correctamente')
  await page.keyboard.press('Escape')

  const orderLinks = await page.locator('.catalog-btn').evaluateAll((nodes) =>
    nodes.map((n) => n.getAttribute('href') || '')
  )
  assert(orderLinks.length === 9, `Se esperaban 9 links de pedido, hay ${orderLinks.length}`)
  assert(orderLinks.every((href) => href.includes('https://wa.me/') && href.includes('text=')), 'Hay links de pedido inválidos')

  await page.screenshot({ path: '/tmp/store-qa-desktop.png', fullPage: true })
  await page.close()

  return {
    quickHref,
    firstPrice,
    cards: orderLinks.length,
  }
}

async function runMobile(browser) {
  const context = await browser.newContext({ viewport: { width: 390, height: 844 } })
  const page = await context.newPage()
  await page.goto(url, { waitUntil: 'networkidle' })

  const dims = await page.evaluate(() => ({
    innerWidth: window.innerWidth,
    scrollWidth: document.documentElement.scrollWidth,
    bodyScrollWidth: document.body.scrollWidth,
  }))

  assert(dims.scrollWidth <= dims.innerWidth + 1, `Overflow horizontal html: ${dims.scrollWidth} > ${dims.innerWidth}`)
  assert(dims.bodyScrollWidth <= dims.innerWidth + 1, `Overflow horizontal body: ${dims.bodyScrollWidth} > ${dims.innerWidth}`)

  await page.screenshot({ path: '/tmp/store-qa-mobile.png', fullPage: true })
  await context.close()

  return dims
}

const browser = await chromium.launch({ headless: true, executablePath: '/usr/bin/chromium' })

try {
  const desktop = await runDesktop(browser)
  const mobile = await runMobile(browser)
  console.log(JSON.stringify({ ok: true, desktop, mobile }, null, 2))
} catch (err) {
  console.error(JSON.stringify({ ok: false, error: err.message }, null, 2))
  process.exitCode = 1
} finally {
  await browser.close()
}
