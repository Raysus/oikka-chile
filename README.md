# OIKKA Chile — Landing

Landing moderno de **OIKKA Isshin Ryu Karate Chile**, hecho con React + TypeScript + Vite.

Sitio de referencia: [oikkaisshinryuchile.com](https://www.oikkaisshinryuchile.com/)

## Correr en local

```bash
npm install
npm run dev
```

Abre http://127.0.0.1:5173/

## Contenido editable

Textos, escuelas y etapas: `src/content.ts`

## Scripts

| Comando | Uso |
|---------|-----|
| `npm run dev` | Desarrollo |
| `npm run build` | Build producción |
| `npm run preview` | Preview del build |


## Analytics (ingresos y clase de prueba)

- Cada visita cuenta como **ingreso** (`pageViews`).
- Cada clic en «clase de prueba» (hero, header o contacto) suma `trialClassClicks`.
- En la consola del navegador: `window.__oikkaStats()`.
- Para Google Analytics 4, copia `.env.example` a `.env` y define `VITE_GA_MEASUREMENT_ID`.
