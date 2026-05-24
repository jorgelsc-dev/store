# Store WhatsApp (Vue + Vuetify)

Landing/catalogo centrado en WhatsApp:
- pedidos por chat
- botones de compra por producto
- compartido de ubicacion exacta con un clic
- filtros por categoria
- busqueda
- orden por precio
- despliegue listo para GitHub Pages

## Configuración

Puedes personalizar datos del negocio desde variables de entorno:

```bash
# .env
VITE_STORE_NAME="Don Jose's"
VITE_WHATSAPP_PHONE="5355512345"
VITE_STORE_LOCATION="La Habana, Cuba"
VITE_STORE_HOURS="Lun a Sáb · 9:00 a 19:00"
```

## Instalar

```bash
npm install
```

## Desarrollo

```bash
npm run dev
```

## Build

```bash
npm run build
```

## GitHub Pages

La app ya incluye:
- `public/CNAME` con `store.jorgelsc.dev`
- workflow en `.github/workflows/deploy.yml`
- build apto para publicar `dist` en GitHub Pages

Antes de activar el dominio en GitHub Pages, configura el registro DNS para `store.jorgelsc.dev` segun tu proveedor.

---

```bash
/usr/bin/chromium --remote-debugging-port=9222 --user-data-dir=/tmp/chromium-debug --no-first-run --no-default-browser-check http://localhost:4173
```
