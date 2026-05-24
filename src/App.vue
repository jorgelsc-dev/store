<script setup>
import { computed, ref } from 'vue'

const business = {
  name: import.meta.env.VITE_STORE_NAME || 'Tu negocio',
  phone: import.meta.env.VITE_WHATSAPP_PHONE || '5355512345',
  location: import.meta.env.VITE_STORE_LOCATION || 'Atencion local y delivery',
  hours: import.meta.env.VITE_STORE_HOURS || 'Lun a Sab · 9:00 a 19:00',
}

const stats = [
  { label: 'Pedidos por WhatsApp', value: '100%' },
  { label: 'Respuesta promedio', value: '< 5 min' },
  { label: 'Ubicacion exacta', value: '1 clic' },
]

const steps = [
  {
    icon: 'mdi-message-text-outline',
    title: 'Escribe tu pedido',
    text: 'Elige un producto o cuentanos lo que necesitas en el formulario rapido.',
  },
  {
    icon: 'mdi-map-marker-radius-outline',
    title: 'Comparte tu ubicacion',
    text: 'Abre WhatsApp con tu mapa exacto para que la entrega llegue sin perder tiempo.',
  },
  {
    icon: 'mdi-whatsapp',
    title: 'Confirma por chat',
    text: 'Te respondemos por WhatsApp con disponibilidad, precio y siguiente paso.',
  },
]

const trustMarks = [
  'Pide sin llamadas',
  'Ubicacion por WhatsApp',
  'Catalogo claro y rapido',
  'Ideal para pedidos y delivery',
]

const categories = [
  { id: 'all', label: 'Todo', icon: 'mdi-view-grid-outline' },
  { id: 'decor', label: 'Decoracion', icon: 'mdi-sofa-outline' },
  { id: 'fashion', label: 'Moda', icon: 'mdi-tshirt-crew-outline' },
  { id: 'care', label: 'Cuidado', icon: 'mdi-sparkles' },
  { id: 'tech', label: 'Tech', icon: 'mdi-headphones' },
]

const sortOptions = [
  { title: 'Destacados', value: 'featured' },
  { title: 'Precio: menor a mayor', value: 'price-asc' },
  { title: 'Precio: mayor a menor', value: 'price-desc' },
]

const products = [
  {
    id: 1,
    name: 'Set de velas ambar',
    category: 'decor',
    categoryLabel: 'Decoracion',
    price: 32,
    rating: 4.8,
    tag: 'Top venta',
    description: 'Aromas calidos para sala o habitacion. Incluye 3 tamaños.',
    image:
      'https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 2,
    name: 'Cartera canvas mini',
    category: 'fashion',
    categoryLabel: 'Moda',
    price: 45,
    rating: 4.7,
    tag: 'Nueva',
    description: 'Diseno ligero con cierre metalico y bolsillo interno.',
    image:
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 3,
    name: 'Serum glow 30ml',
    category: 'care',
    categoryLabel: 'Cuidado',
    price: 28,
    rating: 4.9,
    tag: 'Recomendado',
    description: 'Textura ligera con vitamina C para rutina de mañana.',
    image:
      'https://images.unsplash.com/photo-1556228578-8c89e6adf883?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 4,
    name: 'Audifonos Pulse Air',
    category: 'tech',
    categoryLabel: 'Tech',
    price: 69,
    rating: 4.6,
    tag: 'Oferta',
    description: 'Bluetooth 5.3, sonido limpio y hasta 24h con estuche.',
    image:
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 5,
    name: 'Jarron terra organico',
    category: 'decor',
    categoryLabel: 'Decoracion',
    price: 39,
    rating: 4.8,
    tag: 'Edicion limitada',
    description: 'Acabado mate artesanal para mesas o repisas.',
    image:
      'https://images.unsplash.com/photo-1578500494198-246f612d3b3d?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 6,
    name: 'Camisa linen soft',
    category: 'fashion',
    categoryLabel: 'Moda',
    price: 52,
    rating: 4.7,
    tag: 'Best seller',
    description: 'Corte unisex relajado y tejido transpirable.',
    image:
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 7,
    name: 'Kit facial calm skin',
    category: 'care',
    categoryLabel: 'Cuidado',
    price: 34,
    rating: 4.9,
    tag: 'Top rutina',
    description: 'Limpiador + tónico + crema hidratante para piel sensible.',
    image:
      'https://images.unsplash.com/photo-1629198688000-71f23e745b6e?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 8,
    name: 'Lampara halo desk',
    category: 'decor',
    categoryLabel: 'Decoracion',
    price: 58,
    rating: 4.7,
    tag: 'Glow pick',
    description: 'Luz calida regulable con base antideslizante.',
    image:
      'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 9,
    name: 'Smart bottle track',
    category: 'tech',
    categoryLabel: 'Tech',
    price: 41,
    rating: 4.5,
    tag: 'Novedad',
    description: 'Control de hidratacion con recordatorios y app movil.',
    image:
      'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=1200&q=80',
  },
]

const quickName = ref('')
const quickNeed = ref('')
const quickReference = ref('')
const searchQuery = ref('')
const selectedCategory = ref('all')
const sortBy = ref('featured')
const activeProduct = ref(null)
const detailsOpen = ref(false)
const brokenImageIds = ref(new Set())
const locationBusy = ref(false)
const locationStatus = ref('')
const locationError = ref('')

const phoneDigits = business.phone.replace(/\D/g, '')
const whatsappBaseLink = `https://wa.me/${phoneDigits}`

const currencyFormatter = new Intl.NumberFormat('es-ES', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
})

const filteredProducts = computed(() => {
  let output = [...products]

  if (selectedCategory.value !== 'all') {
    output = output.filter((product) => product.category === selectedCategory.value)
  }

  const query = searchQuery.value.trim().toLowerCase()
  if (query) {
    output = output.filter((product) => {
      return (
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.categoryLabel.toLowerCase().includes(query)
      )
    })
  }

  if (sortBy.value === 'price-asc') {
    output.sort((a, b) => a.price - b.price)
  } else if (sortBy.value === 'price-desc') {
    output.sort((a, b) => b.price - a.price)
  }

  return output
})

const canQuickQuote = computed(() => {
  return Boolean(quickName.value.trim() && quickNeed.value.trim())
})

const quickQuoteLink = computed(() => {
  const name = quickName.value.trim()
  const need = quickNeed.value.trim()
  const reference = quickReference.value.trim()

  if (!name || !need) {
    return whatsappBaseLink
  }

  const text = [
    `Hola ${business.name}.`,
    `Soy ${name}.`,
    `Busco: ${need}.`,
    reference ? `Referencia o direccion: ${reference}.` : null,
    'Quiero que me confirmen disponibilidad y precio.',
  ]
    .filter(Boolean)
    .join('\n')

  return `${whatsappBaseLink}?text=${encodeURIComponent(text)}`
})

function formatPrice(price) {
  return currencyFormatter.format(price)
}

function buildWhatsAppLink(message) {
  return `${whatsappBaseLink}?text=${encodeURIComponent(message)}`
}

function buildOrderMessage(product) {
  const text = [
    `Hola ${business.name}.`,
    `Me interesa este producto: *${product.name}*.`,
    `Precio visto: ${formatPrice(product.price)}.`,
    'Quiero confirmar disponibilidad y entrega.',
  ].join('\n')

  return buildWhatsAppLink(text)
}

function buildFallbackImage(product) {
  const title = escapeSvgText(product.name)
  const category = escapeSvgText(product.categoryLabel)
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="1200" height="900" viewBox="0 0 1200 900">
      <defs>
        <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#d4f3e4" />
          <stop offset="100%" stop-color="#9fd7bd" />
        </linearGradient>
      </defs>
      <rect width="1200" height="900" fill="url(#bg)" />
      <circle cx="980" cy="180" r="210" fill="rgba(255,255,255,0.24)" />
      <circle cx="210" cy="720" r="270" fill="rgba(255,255,255,0.2)" />
      <text x="100" y="690" fill="#1f7a53" font-family="Plus Jakarta Sans, Arial, sans-serif" font-size="42" font-weight="700">${category}</text>
      <text x="100" y="760" fill="#173a2d" font-family="Syne, Plus Jakarta Sans, Arial, sans-serif" font-size="68" font-weight="800">${title}</text>
    </svg>
  `
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`
}

function escapeSvgText(value) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

function handleImageError(productId) {
  if (brokenImageIds.value.has(productId)) {
    return
  }

  const next = new Set(brokenImageIds.value)
  next.add(productId)
  brokenImageIds.value = next
}

function resolveImage(product) {
  return brokenImageIds.value.has(product.id) ? buildFallbackImage(product) : product.image
}

function openDetails(product) {
  activeProduct.value = product
  detailsOpen.value = true
}

function scrollToCatalog() {
  const section = document.getElementById('catalogo')
  if (section) {
    section.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

function openWhatsApp(url) {
  window.open(url, '_blank', 'noopener,noreferrer')
}

function buildLocationMessage(position) {
  const { latitude, longitude, accuracy } = position.coords
  const mapsLink = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`

  return [
    `Hola ${business.name}, esta es mi ubicacion exacta para coordinar el pedido.`,
    `Mapa: ${mapsLink}`,
    `Coordenadas: ${latitude.toFixed(6)}, ${longitude.toFixed(6)}`,
    accuracy ? `Precisión aproximada: ${Math.round(accuracy)} m` : null,
  ]
    .filter(Boolean)
    .join('\n')
}

async function shareMyLocation() {
  locationError.value = ''
  locationStatus.value = ''

  const popup = window.open('about:blank', '_blank')

  if (!('geolocation' in navigator)) {
    const fallbackMessage = [
      `Hola ${business.name}, quiero compartir mi ubicacion para coordinar el pedido.`,
      'Mi navegador no permite la ubicacion automatica, pero puedo enviar mi punto manualmente.',
    ].join('\n')
    locationError.value = 'Tu navegador no permite compartir ubicacion automatica.'

    if (popup) {
      popup.location.href = buildWhatsAppLink(fallbackMessage)
    } else {
      openWhatsApp(buildWhatsAppLink(fallbackMessage))
    }

    return
  }

  locationBusy.value = true

  try {
    const position = await new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject, {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000,
      })
    })

    const link = buildWhatsAppLink(buildLocationMessage(position))

    if (popup) {
      popup.location.href = link
    } else {
      openWhatsApp(link)
    }

    locationStatus.value = 'Se abrio WhatsApp con tu ubicacion exacta.'
  } catch (error) {
    if (popup) {
      popup.close()
    }

    const fallbackMessage = [
      `Hola ${business.name}, quiero compartir mi ubicacion para coordinar el pedido.`,
      'No pude obtener la ubicacion exacta desde el navegador.',
      'Por favor enviame tu ubicacion actual por WhatsApp.',
    ].join('\n')

    locationError.value = 'No se pudo obtener tu ubicacion automatica. Puedes enviarla manualmente.'
    openWhatsApp(buildWhatsAppLink(fallbackMessage))
    locationStatus.value = error?.message ? 'Revisa permisos de ubicacion en el navegador.' : locationStatus.value
  } finally {
    locationBusy.value = false
  }
}
</script>

<template>
  <v-app>
    <div class="aurora-bg" aria-hidden="true" />

    <v-main class="store-main">
      <v-container class="main-wrap py-0">
        <header class="top-nav mt-4 mt-md-6 mb-6 mb-md-10">
          <div class="brand-block">
            <span class="brand-dot" aria-hidden="true" />
            <div>
              <p class="brand-kicker">Pedidos por WhatsApp</p>
              <h2 class="brand-name">{{ business.name }}</h2>
            </div>
          </div>

          <div class="top-nav-meta">
            <span>{{ business.location }}</span>
            <span>{{ business.hours }}</span>
          </div>
        </header>

        <section class="hero-section pt-5 pt-md-8 pb-8">
          <v-row align="center" class="hero-row">
            <v-col cols="12" md="7">
              <v-chip class="hero-chip mb-4" color="primary" variant="tonal" label>
                WhatsApp primero
              </v-chip>

              <h1 class="hero-title">
                Pide rapido, comparte tu ubicacion exacta y cierra por chat sin perder tiempo
              </h1>

              <p class="hero-copy">
                Todo el proceso vive en WhatsApp: revisas productos, envias tu pedido y compartes
                tu ubicacion real con un clic para coordinar entrega o recogida.
              </p>

              <div class="d-flex flex-wrap ga-3 mb-6">
                <v-btn
                  color="accent"
                  size="x-large"
                  rounded="xl"
                  prepend-icon="mdi-view-grid-outline"
                  class="hero-btn hero-btn-primary"
                  @click="scrollToCatalog"
                >
                  Ver catalogo
                </v-btn>

                <v-btn
                  :href="whatsappBaseLink"
                  target="_blank"
                  rel="noreferrer"
                  variant="outlined"
                  color="primary"
                  size="x-large"
                  rounded="xl"
                  prepend-icon="mdi-whatsapp"
                  class="hero-btn hero-btn-secondary"
                >
                  Hablar ahora
                </v-btn>
              </div>

              <div class="stats-grid">
                <v-sheet
                  v-for="stat in stats"
                  :key="stat.label"
                  class="stat-card"
                  rounded="lg"
                  elevation="0"
                >
                  <strong>{{ stat.value }}</strong>
                  <span>{{ stat.label }}</span>
                </v-sheet>
              </div>

              <div class="trust-row mt-5">
                <v-chip
                  v-for="mark in trustMarks"
                  :key="mark"
                  class="trust-chip"
                  variant="tonal"
                  color="primary"
                  label
                >
                  {{ mark }}
                </v-chip>
              </div>
            </v-col>

            <v-col cols="12" md="5">
              <v-card class="hero-panel" rounded="xl" elevation="0">
                <p class="panel-eyebrow">Pedido rapido</p>
                <h3 class="panel-title">Escribe lo que quieres y comparte tu ubicacion desde aqui</h3>

                <v-text-field
                  v-model="quickName"
                  label="Tu nombre"
                  variant="outlined"
                  rounded="xl"
                  density="comfortable"
                  bg-color="#ffffff"
                  prepend-inner-icon="mdi-account-outline"
                  hide-details
                  class="hero-input mb-3"
                />

                <v-text-field
                  v-model="quickNeed"
                  label="Producto o pedido"
                  variant="outlined"
                  rounded="xl"
                  density="comfortable"
                  bg-color="#ffffff"
                  prepend-inner-icon="mdi-bag-checked"
                  hide-details
                  class="hero-input mb-3"
                />

                <v-text-field
                  v-model="quickReference"
                  label="Referencia o direccion"
                  variant="outlined"
                  rounded="xl"
                  density="comfortable"
                  bg-color="#ffffff"
                  prepend-inner-icon="mdi-map-marker-outline"
                  hide-details
                  class="hero-input mb-4"
                />

                <div class="hero-actions d-grid ga-3">
                  <v-btn
                    :href="canQuickQuote ? quickQuoteLink : undefined"
                    :disabled="!canQuickQuote"
                    target="_blank"
                    rel="noreferrer"
                    color="accent"
                    size="large"
                    rounded="xl"
                    block
                    prepend-icon="mdi-whatsapp"
                  >
                    Enviar pedido
                  </v-btn>

                  <v-btn
                    :loading="locationBusy"
                    :disabled="locationBusy"
                    color="primary"
                    variant="tonal"
                    size="large"
                    rounded="xl"
                    block
                    prepend-icon="mdi-map-marker-radius-outline"
                    @click="shareMyLocation"
                  >
                    Compartir mi ubicacion
                  </v-btn>
                </div>

                <v-alert
                  v-if="locationError"
                  type="warning"
                  variant="tonal"
                  density="compact"
                  class="hero-alert mt-4"
                >
                  {{ locationError }}
                </v-alert>

                <v-alert
                  v-else-if="locationStatus"
                  type="success"
                  variant="tonal"
                  density="compact"
                  class="hero-alert mt-4"
                >
                  {{ locationStatus }}
                </v-alert>

                <p class="panel-hint mt-4">
                  <strong>Tip:</strong> en WhatsApp se abre un mensaje con tu mapa exacto para que
                  puedas compartir tu posicion real en segundos.
                </p>
              </v-card>
            </v-col>
          </v-row>
        </section>

        <section class="steps-section mb-8 mb-md-10">
          <v-row>
            <v-col cols="12" md="4" v-for="step in steps" :key="step.title">
              <v-card class="step-card" rounded="xl" elevation="0">
                <v-icon size="30" color="primary" class="mb-4">{{ step.icon }}</v-icon>
                <h3 class="step-title">{{ step.title }}</h3>
                <p class="step-text">{{ step.text }}</p>
              </v-card>
            </v-col>
          </v-row>
        </section>

        <section id="catalogo" class="catalog-section pb-14">
          <v-row class="mb-4 align-end">
            <v-col cols="12" md="7">
              <h2 class="section-title">Catalogo listo para WhatsApp</h2>
              <p class="section-subtitle">
                Filtra, compara y envia tu pedido al chat con el producto seleccionado.
              </p>
            </v-col>

            <v-col cols="12" md="5">
              <v-select
                v-model="sortBy"
                :items="sortOptions"
                label="Ordenar"
                variant="outlined"
                density="comfortable"
                hide-details
                rounded="xl"
                bg-color="#ffffff"
                prepend-inner-icon="mdi-tune-variant"
                class="catalog-input"
              />
            </v-col>
          </v-row>

          <v-row class="mb-4">
            <v-col cols="12" md="8">
              <v-text-field
                v-model="searchQuery"
                variant="outlined"
                density="comfortable"
                rounded="xl"
                bg-color="#ffffff"
                prepend-inner-icon="mdi-magnify"
                label="Buscar producto"
                clearable
                hide-details
                class="catalog-input"
              />
            </v-col>

            <v-col cols="12" md="4" class="d-flex justify-md-end align-center">
              <span class="result-counter">{{ filteredProducts.length }} resultados</span>
            </v-col>
          </v-row>

          <v-chip-group
            v-model="selectedCategory"
            mandatory
            selected-class="chip-active"
            show-arrows="desktop"
            class="mb-6 category-group"
          >
            <v-chip
              v-for="category in categories"
              :key="category.id"
              :value="category.id"
              class="category-chip"
              filter
              label
              variant="flat"
            >
              <v-icon start size="18">{{ category.icon }}</v-icon>
              {{ category.label }}
            </v-chip>
          </v-chip-group>

          <v-row>
            <v-col
              v-for="(product, index) in filteredProducts"
              :key="product.id"
              cols="12"
              sm="6"
              lg="4"
            >
              <v-card
                class="product-card"
                rounded="xl"
                elevation="0"
                :style="{ animationDelay: `${index * 80}ms` }"
              >
                <v-img
                  :src="resolveImage(product)"
                  :lazy-src="buildFallbackImage(product)"
                  height="220"
                  cover
                  class="product-image"
                  @error="handleImageError(product.id)"
                >
                  <div class="image-overlay pa-3 d-flex justify-space-between align-start">
                    <v-chip size="small" class="tag-chip" color="black" label>
                      {{ product.tag }}
                    </v-chip>
                    <v-avatar size="34" class="chip-avatar">
                      <v-icon color="white">mdi-star-four-points</v-icon>
                    </v-avatar>
                  </div>
                </v-img>

                <v-card-text class="pa-5">
                  <div class="d-flex align-center justify-space-between mb-2">
                    <span class="mini-pill">{{ product.categoryLabel }}</span>
                    <v-rating
                      :model-value="product.rating"
                      color="secondary"
                      half-increments
                      readonly
                      density="compact"
                      size="16"
                      length="5"
                    />
                  </div>

                  <h3 class="product-title mb-2">{{ product.name }}</h3>
                  <p class="product-description mb-4">{{ product.description }}</p>

                  <div class="d-flex align-center justify-space-between">
                    <strong class="product-price">{{ formatPrice(product.price) }}</strong>
                    <v-btn
                      variant="text"
                      color="primary"
                      append-icon="mdi-arrow-right"
                      class="ghost-link"
                      @click="openDetails(product)"
                    >
                      Ver
                    </v-btn>
                  </div>
                </v-card-text>

                <v-divider />

                <v-card-actions class="pa-4">
                  <v-btn
                    :href="buildOrderMessage(product)"
                    target="_blank"
                    rel="noreferrer"
                    block
                    color="accent"
                    rounded="xl"
                    prepend-icon="mdi-whatsapp"
                    class="catalog-btn"
                  >
                    Pedir por WhatsApp
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
        </section>
      </v-container>
    </v-main>

    <v-dialog v-model="detailsOpen" max-width="560">
      <v-card v-if="activeProduct" rounded="xl" class="dialog-card">
        <v-img
          :src="resolveImage(activeProduct)"
          :lazy-src="buildFallbackImage(activeProduct)"
          cover
          height="240"
          @error="handleImageError(activeProduct.id)"
        />
        <v-card-text class="pa-6">
          <div class="d-flex justify-space-between align-center mb-2">
            <span class="mini-pill">{{ activeProduct.categoryLabel }}</span>
            <strong class="product-price">{{ formatPrice(activeProduct.price) }}</strong>
          </div>
          <h3 class="product-title mb-2">{{ activeProduct.name }}</h3>
          <p class="product-description mb-4">{{ activeProduct.description }}</p>
        </v-card-text>
        <v-card-actions class="px-6 pb-6 pt-0">
          <v-btn
            :href="buildOrderMessage(activeProduct)"
            color="accent"
            rounded="xl"
            block
            target="_blank"
            rel="noreferrer"
            prepend-icon="mdi-whatsapp"
            class="details-cta"
          >
            Consultar en WhatsApp
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <a
      class="floating-wa"
      :href="whatsappBaseLink"
      target="_blank"
      rel="noreferrer"
      aria-label="Abrir WhatsApp"
    >
      <v-icon size="28">mdi-whatsapp</v-icon>
    </a>
  </v-app>
</template>
