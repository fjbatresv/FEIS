# Developer Handoff — Pdei+ Web Portal
**Portal Portafolio de Inversiones Plus (FEIS)**
Versión 1.1 · Junio 2026

---

## 1. Resumen del proyecto

Pdei+ es el portal web de gestión de inversiones FEIS para Guatemala. Permite a clientes consultar saldos y rendimientos, realizar inversiones y recompras, y administrar su expediente digital. El portal implementa los requisitos RF1–RF18 del documento DERCAS.

**Referencia de diseño:** `Pdei+ Web Mock.html` (prototipo interactivo con 20 vistas y datos estáticos)
**Librería de componentes:** `Pdei+ Componentes.html`
**Design System:** `Pdei+ Design System.md`

---

## 1.1 Estado de alineación visual — 1 de junio de 2026

La revisión actual deja sincronizados los puntos de diseño que habían quedado divergentes entre el mock y el UI kit:

| Área | Estado | Decisión documentada |
|------|--------|----------------------|
| Sidebar del UI kit | Alineado | Mantener logo compacto de 132px en `Pdei+ Componentes.html` |
| Sidebar del mock | Variante vigente | El mock conserva logo grande de 188px como decisión de composición de pantalla |
| Fondos destacados | Alineado | Estado operativo único en columna derecha mediante `status-badge` |
| Botón de detalle de fondo | Alineado | Columna fija de 44px para evitar solapamiento con estados largos |
| KPI de retiro mensual | Alineado | Usar “Desinversión neta del periodo”, monto negro y helper informativo |
| Textos flotantes de estado | Resuelto | No usar estados sueltos a la derecha; usar pills/badges del sistema |

Pendiente antes de implementación productiva: decidir si el sidebar del mock debe volver al tamaño compacto del UI kit o si se formaliza una variante de producto con logo grande.

---

## 2. Design Tokens

### 2.1 Variables CSS — registrar en `:root`

```css
:root {
  /* Marca */
  --navy:       #2B2B5E;
  --aqua:       #00CDE5;
  --dark-aqua:  #00798E;

  /* Neutrales */
  --bg:         #FFFFFF;
  --bg-card:    #FFFFFF;
  --border:     #DDE2EC;
  --text:       #000000;
  --text-sec:   #5a6478;
  --text-lt:    #8892A4;
  --white:      #FFFFFF;

  /* Semánticos */
  --success:    #22C55E;
  --warning:    #F59E0B;
  --danger:     #EF4444;
  --info:       #3B82F6;

  /* Tipografía */
  --font-main:      'NeulisSans', 'Segoe UI', system-ui, sans-serif;
  --font-secondary: 'FuturaPT', 'Segoe UI', system-ui, sans-serif;
  --font-brand:     'TTNorms Pro Condensed Black Italic', Impact, sans-serif;

  /* Radios */
  --radius-sm:   8px;
  --radius-md:   12px;
  --radius-lg:   16px;
  --radius-btn:  14px;
  --radius-pill: 20px;

  /* Sombras */
  --shadow-card: 0 2px 16px rgba(0,0,0,.07);
  --shadow-sm:   0 1px 4px rgba(0,0,0,.08);

  /* Layout */
  --sidebar-w:  210px;
  --header-h:   64px;
}
```

### 2.2 Uso de colores — guía rápida

| Token | Usos principales |
|-------|-----------------|
| `--navy` | Sidebar bg, botón primario sobre fondos claros, encabezado de tabla, step activo |
| `--aqua` | CTA principal, acento interactivo, ícono activo en sidebar, step completado |
| `--dark-aqua` | Hover de aqua, texto aqua sobre fondos claros |
| `--bg` | Fondo de pantallas autenticadas, hover de fila de tabla |
| `--bg-card` | Fondo de cards, modales, inputs |
| `--text` | Cuerpo y títulos principales |
| `--text-sec` | Labels de inputs, subtítulos |
| `--text-lt` | Placeholders, hints, texto terciario (mín. 13px) |
| `--border` | Bordes de inputs, cards, separadores |
| `--success` | Montos crédito, estados positivos |
| `--danger` | Montos débito, errores de validación |

---

## 3. Layout Shell — Pantallas autenticadas

### 3.1 Estructura

```
┌──────────────────────────────────────────────────────────────┐
│  SIDEBAR 210px (fixed)  │  HEADER 64px (fixed, top: 0)      │
│  background: --navy     │  background: rgba(255,255,255,.94) │
│                         │  backdrop-filter: blur(10px)       │
│  [logo]                 │  border-bottom: 1px solid --border │
│  [nav items]            ├────────────────────────────────────┤
│                         │  MAIN CONTENT                      │
│                         │  margin-left: 210px                │
│                         │  margin-top: 64px                  │
│                         │  padding: 32px 36px 48px           │
│                         │  overflow-y: auto                  │
│  [bottom nav]           │  height: calc(100vh - 64px)        │
└──────────────────────────────────────────────────────────────┘
```

### 3.2 CSS del shell

```css
#sidebar {
  position: fixed; top: 0; left: 0; bottom: 0;
  width: var(--sidebar-w);                          /* 210px */
  background: var(--navy);
  display: flex; flex-direction: column;
  overflow-y: auto; z-index: 20;
}

#header {
  position: fixed; top: 0;
  left: var(--sidebar-w); right: 0;
  height: var(--header-h);                          /* 64px */
  background: rgba(255,255,255,.94);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid var(--border);
  display: flex; align-items: center;
  justify-content: space-between;
  padding: 0 28px; z-index: 15;
}

#main {
  margin-left: var(--sidebar-w);
  margin-top: var(--header-h);
  height: calc(100vh - var(--header-h));
  overflow-y: auto;
  padding: 32px 36px 48px;
}
```

### 3.3 Sidebar — ítems de navegación

**Marca del sidebar en UI kit:**
```css
.sb-logo {
  padding: 20px 20px 16px;
  border-bottom: 1px solid rgba(255,255,255,.08);
  display: flex; align-items: center; gap: 6px;
}

.sb-logo img {
  width: 132px;
  height: auto;
  object-fit: contain;
}
```
Usar `Logos/Pdei+ Azul.png` sobre `--navy`. Esta es la referencia del componente visual. El mock de producto puede mantener una variante de marca más grande por composición de pantalla, pero debe documentarse como variante del mock y no como base del sistema.

**Ítem inactivo:**
```css
color: rgba(255,255,255,.68);
font-size: 13.5px; font-weight: 500;
padding: 10px 12px; margin: 2px 8px;
border-radius: 10px;
transition: background .15s, color .15s;
```

**Ítem hover:** `background: rgba(255,255,255,.08); color: #fff`

**Ítem activo:**
```css
background: rgba(255,255,255,.12);
color: #fff;
/* Ícono activo: */ color: var(--aqua);
```

**Section label (separador de grupo):**
```css
font-size: 10px; font-weight: 700; letter-spacing: 1.4px;
text-transform: uppercase;
color: rgba(255,255,255,.35);
padding: 8px 16px 4px; margin-top: 8px;
```

### 3.4 Header — zona derecha

Contiene (de derecha a izquierda): avatar del usuario, chip de nombre, campana de notificaciones.

**Chip de usuario:**
```css
display: inline-flex; align-items: center; gap: 7px;
padding: 7px 12px; border-radius: 999px;
border: 1px solid var(--border);
background: #fff; font-size: 12px; color: var(--text-sec);
```

**Campana de notificaciones:**
```css
width: 40px; height: 40px; border-radius: 10px;
border: 1.5px solid var(--border);
background: #fff; color: var(--text-sec);
```
Con alertas pendientes: `::after` dot de 8px en `--danger` en posición `top: 7px; right: 7px`.

**Panel de alertas** (dropdown desde campana):
```css
position: absolute; top: calc(100% + 10px); right: 0;
width: 360px; max-height: 480px; overflow: auto;
padding: 14px; border: 1px solid var(--border);
border-radius: 18px; background: #fff;
box-shadow: var(--shadow-card); z-index: 25;
```

---

## 4. Layout Shell — Pantallas de acceso

Las vistas de acceso (landing, login, 2FA, recuperación, registro) ocultan el sidebar y el header (`display: none`) y usan un shell propio de pantalla completa.

### 4.1 Split panel

```css
.auth-shell {
  min-height: 100vh;
  display: grid;
  grid-template-columns: minmax(320px, 1.1fr) minmax(420px, .9fr);
  background:
    radial-gradient(circle at top left, rgba(0,205,229,.12), transparent 28%),
    linear-gradient(135deg, #20265a 0%, #161d44 52%, #102e3d 100%);
}
```

- **Panel izquierdo** (`.auth-brand`): contenido de marca, padding `56px 56px 48px`, color `#fff`
- **Panel derecho** (`.auth-panel`): `background: rgba(255,255,255,.97)`, centrado con flex

### 4.2 Card de formulario

```css
.auth-card {
  width: 100%; max-width: 460px;
  background: #fff;
  border: 1px solid var(--border);
  border-radius: 24px;
  box-shadow: 0 28px 80px rgba(15,23,42,.16);
  padding: 32px;
}
```

**Jerarquía interna:**
- `.auth-kicker`: 11px, uppercase, letter-spacing 1.2px, `--text-lt` — subfamilia contextual
- `.auth-title`: 30px, font-weight 800, line-height 1.08 — título de pantalla
- `.auth-copy`: 14px, `--text-sec` — descripción de la acción
- `.auth-actions`: flex, gap 10px, justify-content flex-end, margin-top 22px

---

## 5. Componentes

### 5.1 Botones

**Clase base `.btn`:**
```css
display: inline-flex; align-items: center; justify-content: center; gap: 8px;
padding: 11px 20px; border-radius: var(--radius-btn); /* 14px */
font-size: 14px; font-weight: 600;
border: 2px solid transparent;
cursor: pointer; transition: background .15s, color .15s;
```

| Variante | Fondo | Texto | Borde | Hover |
|----------|-------|-------|-------|-------|
| `.btn-primary` | `--aqua` | `--navy` | — | bg `--dark-aqua`, texto `#fff` |
| `.btn-navy` | `--navy` | `#fff` | — | bg `--navy` |
| `.btn-outline` | `#fff` | `--text` | `#c5ccda` | bg `--navy`, texto `#fff` |
| `.btn-outline-aqua` | `#fff` | `--dark-aqua` | `--aqua` | — |
| `.btn-danger` | `--danger` | `#fff` | — | bg `#dc2626` |

**Tamaños:**
- `.btn-sm`: `padding: 8px 14px`, `font-size: 12px`, `border-radius: 10px`
- Default: `padding: 11px 20px`, `font-size: 14px`, `border-radius: 14px`

**Estado disabled:** `opacity: .48; cursor: not-allowed; pointer-events: none`

**Estado loading:** texto transparente + spinner `::after` centrado (16px, border `3px solid rgba(…,.3)`, top-border coloreado, `animation: spin .7s linear infinite`)

---

### 5.2 Inputs y formularios

**Estructura base:**
```html
<div class="field">
  <label class="label">Etiqueta</label>
  <input class="input" placeholder="…">
  <span class="hint">Texto de ayuda</span>
</div>
```

**Estilos del `.input`:**
```css
width: 100%; padding: 13px 15px;
border-radius: var(--radius-md);     /* 12px */
border: 1.5px solid var(--border);
background: #fff; color: var(--text); outline: none;
```

| Estado | Borde | Sombra |
|--------|-------|--------|
| Default | `--border` | — |
| Focus | `--aqua` | `0 0 0 3px rgba(0,205,229,.12)` |
| Error | `--danger` | `0 0 0 3px rgba(239,68,68,.12)` |
| Disabled | `--border` | fondo `--gray-lt` |

**`.label`:** `font-size: 13px; font-weight: 500; color: var(--text-sec)`
**`.hint`:** `font-size: 12px; color: var(--text-lt)` — mínimo 12px, nunca menos

**Campo con ícono derecho (ej. contraseña):**
```css
.input-wrap { position: relative; display: flex; align-items: stretch; }
.input-wrap .input { padding-right: 44px; flex: 1; min-width: 0; }
.input-icon-right {
  position: absolute; right: 0; top: 0; bottom: 0; width: 44px;
  display: flex; align-items: center; justify-content: center;
  border-radius: 0 var(--radius-md) var(--radius-md) 0;
  border: none; background: transparent;
  color: var(--text-lt); cursor: pointer;
}
.input-icon-right:hover { color: var(--navy); }
```
⚠️ **Importante:** usar siempre `right:0; top:0; bottom:0` — nunca `transform: translateY(-50%)` que desborda el borde del input.

**Campo con prefijo (ej. moneda):**
```css
.input-prefix {
  display: flex; align-items: center;
  border: 1.5px solid var(--border); border-radius: var(--radius-md);
  overflow: hidden; background: #fff;
}
.input-prefix:focus-within { border-color: var(--aqua); box-shadow: 0 0 0 3px rgba(0,205,229,.12); }
.input-prefix-label {
  padding: 13px 14px; background: var(--gray-lt);
  border-right: 1.5px solid var(--border);
  font-size: 14px; color: var(--text-sec); white-space: nowrap;
}
```

**Select:** mismo estilo que `.input` + `background-image` con chevron SVG en `--text-lt`.

**Textarea:** mismo estilo que `.input` + `min-height: 96px; resize: vertical`.

---

### 5.3 OTP / 2FA — Digit Boxes

```css
.otp-slot {
  width: 100%; padding: 14px 0;
  border-radius: 16px; border: 1.5px solid var(--border);
  background: #fff; text-align: center;
  font-size: 24px; font-weight: 800; color: var(--navy);
  outline: none;
}
.otp-slot:focus { border-color: var(--aqua); box-shadow: 0 0 0 3px rgba(0,205,229,.12); }
```

Disposición: `display: grid; grid-template-columns: repeat(6, minmax(0,1fr)); gap: 8px`

**Atributos requeridos en cada `<input>`:**
```html
<input class="otp-slot" type="text" inputmode="numeric"
       pattern="[0-9]*" maxlength="1"
       autocomplete="one-time-code" aria-label="Dígito N de 6">
```

---

### 5.4 Cards

**Card base `.card`:**
```css
background: var(--bg-card);
border: 1px solid var(--border);
border-radius: var(--radius-lg);   /* 16px */
box-shadow: var(--shadow-card);
padding: 24px;
```

**Card KPI hero (`.metric-hero`):**
```css
background: var(--navy);
color: #fff;
min-height: 184px;
display: flex; flex-direction: column; justify-content: space-between;
overflow: hidden;
```
- `.metric-label`: `font-size: 11px; letter-spacing: 1.2px; text-transform: uppercase; color: rgba(255,255,255,.58)`
- `.metric-value`: `font-size: clamp(32px, 2.7vw, 42px); font-weight: 800` — el símbolo de moneda en `span` va en `--aqua`
- `.metric-sub`: `font-size: 13px; color: rgba(255,255,255,.56)`

**Card métrica pequeña (`.metric-card`):**
```css
display: flex; flex-direction: column; justify-content: center;
gap: 8px; min-height: 108px; padding-top: 18px; padding-bottom: 18px;
```
- `.metric-small-label`: `12px; color: var(--text-lt)`
- `.metric-small-value`: `26px; font-weight: 700; line-height: 1.15` — usar `white-space: nowrap`
- `.metric-small-change`: `12px; font-weight: 600` — `.up` en `--success`; usar color estándar cuando el indicador sea informativo y no variación positiva/negativa.
- Desinversión mensual: etiqueta `Desinversión neta del periodo`, valor en `--text`/negro y helper `Total retirado este mes`. No usar “pérdida”, flecha ni monto negativo para este KPI.

**Card fondo — `.fund-row`:**
```css
display: grid;
grid-template-columns: 42px minmax(240px,1fr) 132px 212px;
align-items: center; column-gap: 14px;
padding: 16px 0; border-bottom: 1px solid var(--border);
```
Columnas: [ícono 42px] [nombre+descripción] [monto+%] [acciones]

Estado muted (fondo pendiente/bloqueado): `opacity: .68`

**Fondos destacados — variante compacta de dashboard:**
```css
.featured-funds .fund-row {
  grid-template-columns: 42px minmax(0,1fr) 168px 44px;
}
.featured-funds .fund-right {
  display: grid; justify-items: end; gap: 6px;
}
.featured-funds .fund-actions {
  width: 44px;
}
```
En esta variante debe existir un solo estado operativo por fila, ubicado en la columna derecha debajo del monto mediante `status-badge`. No duplicar el estado en la columna de texto principal ni usar textos flotantes como “Pendiente activación” o “Bloqueado temporalmente”. El botón de detalle siempre ocupa su columna fija de 44px.

**Person card (`.person`):**
```css
display: flex; align-items: center; gap: 14px;
padding: 16px; border: 1px solid var(--border);
border-radius: var(--radius-md); background: #fff;
```
Avatar: 42px circular, `background: var(--navy); color: #fff`, initials font-weight 800

---

### 5.5 Pills / Badges

**Clase base `.pill`:**
```css
display: inline-flex; align-items: center; justify-content: center; gap: 6px;
padding: 4px 10px; border-radius: 999px;
font-size: 12px; font-weight: 600; line-height: 1; white-space: nowrap;
```

| Variante | Fondo | Texto |
|----------|-------|-------|
| `.pill-success` | `rgba(34,197,94,.14)` | `#166534` |
| `.pill-warning` | `rgba(245,158,11,.14)` | `#92400e` |
| `.pill-danger` | `rgba(239,68,68,.14)` | `#991b1b` |
| `.pill-info` | `rgba(59,130,246,.12)` | `#1d4ed8` |
| `.pill-neutral` | `--gray-lt` | `--text-sec` |

**Estados operativos (`.status-badge`):**
Usar `status-badge` con `status-dot` para estados de fondos, movimientos, expediente y acciones pendientes. Reservar `.pill` para indicadores no operativos o chips de apoyo.

---

### 5.6 Alertas

```css
.alert {
  display: flex; align-items: flex-start; gap: 12px;
  padding: 14px 16px; border-radius: var(--radius-md);
  font-size: 14px;
}
```

| Variante | Fondo | Borde | Texto |
|----------|-------|-------|-------|
| `.alert-success` | `rgba(34,197,94,.1)` | `rgba(34,197,94,.22)` | `#166534` |
| `.alert-warning` | `rgba(245,158,11,.1)` | `rgba(245,158,11,.28)` | `#92400e` |
| `.alert-danger` | `rgba(239,68,68,.1)` | `rgba(239,68,68,.22)` | `#991b1b` |
| `.alert-info` | `rgba(59,130,246,.09)` | `rgba(59,130,246,.22)` | `#1e40af` |

Agregar `role="alert"` para que lectores de pantalla anuncien alertas dinámicas.

---

### 5.7 Step Bar — flujo multi-paso

```css
.step-bar { display: flex; align-items: flex-start; }
.step-item { flex: 1; text-align: center; position: relative; }

/* Línea conectora */
.step-item:not(:last-child)::after {
  content: ""; position: absolute;
  top: 14px; left: calc(50% + 14px); right: calc(-50% + 14px);
  height: 2px; background: var(--border);
}
.step-item.done:not(:last-child)::after { background: var(--aqua); }

/* Dot */
.step-dot {
  width: 28px; height: 28px; border-radius: 50%;
  border: 2px solid var(--border); background: #fff; color: var(--text-lt);
  margin: 0 auto 6px; display: flex; align-items: center; justify-content: center;
  font-size: 12px; font-weight: 700; position: relative; z-index: 1;
}
.step-item.done .step-dot  { background: var(--aqua); border-color: var(--aqua); color: var(--navy); }
.step-item.active .step-dot{ background: var(--navy); border-color: var(--navy); color: #fff; }
```

**Labels:** `font-size: 11px`
- Pendiente: `--text-lt`
- Activo: `--navy`, `font-weight: 600`
- Completado: `--dark-aqua`

**Registro FEIS — 6 pasos:** T&C → Acceso → Instructivo → Datos → Bancos → Fondo

---

### 5.8 Tabla de movimientos

```css
.table { width: 100%; border-collapse: collapse; font-size: 13.5px; }

.table th {
  background: var(--navy); color: #fff;
  text-align: left; padding: 11px 14px;
  font-size: 12px; font-weight: 600;
}
.table th:first-child { border-radius: 10px 0 0 0; }
.table th:last-child  { border-radius: 0 10px 0 0; }

.table td { padding: 12px 14px; border-bottom: 1px solid var(--border); vertical-align: middle; }
.table tbody tr:hover td { background: #fafcff; }
```

Columnas estándar: Fecha · Descripción · Fondo · Estado · Monto
- Monto crédito: `--success; font-weight: 600`
- Monto débito: `--danger; font-weight: 600`
- Montos: `font-variant-numeric: tabular-nums; font-feature-settings: "tnum" 1`

---

### 5.9 Quick Actions grid

```css
.qa-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0,1fr));
  grid-auto-rows: 150px;
  gap: 12px;
}
.qa-btn {
  width: 100%; height: 100%;
  background: #f5f7fb; border: 1px solid #d7deec;
  border-radius: 14px; padding: 20px 16px;
  text-align: center; cursor: pointer;
  transition: all .18s ease;
  display: flex; flex-direction: column;
  align-items: center; justify-content: center; gap: 14px;
}
.qa-btn:hover { background: #eef2f8; border-color: #cfd8e8; transform: translateY(-1px); }
```

- Ícono: 32×32px
- Label: `font-size: 17px; font-weight: 800; color: #31356c; line-height: 1.15; text-wrap: balance`
- Disabled: `opacity: .48; cursor: not-allowed` — sin `transform` en hover

---

### 5.10 Chips de filtro

```css
.chip {
  padding: 7px 14px; border-radius: 999px;
  border: 1.5px solid var(--border);
  background: #fff; color: var(--text-sec); font-size: 13px;
}
.chip.active { background: var(--navy); border-color: var(--navy); color: #fff; }
```

---

### 5.11 More menu (dropdown contextual)

```css
.more-menu { position: relative; }
.more-menu-panel {
  position: absolute; top: calc(100% + 8px); right: 0;
  min-width: 148px; padding: 8px;
  border-radius: 14px; border: 1px solid var(--border);
  background: #fff; box-shadow: var(--shadow-card); z-index: 12;
  display: none;                      /* visible cuando .more-menu.open */
}
.more-menu.open .more-menu-panel { display: grid; gap: 6px; }
.more-menu-item {
  width: 100%; padding: 10px 12px; border: none;
  border-radius: 10px; background: #fff; color: var(--text);
  font-size: 13px; font-weight: 600; text-align: left; cursor: pointer;
}
.more-menu-item:hover { background: #f4f7fb; }
```

**ARIA requerido:**
```html
<button class="more-menu-toggle"
        aria-haspopup="true"
        aria-expanded="false"
        aria-label="Más acciones">
```
JS debe actualizar `aria-expanded` a `"true"` al abrir, `"false"` al cerrar.

---

### 5.12 Progress bar

```css
.progress { display: flex; align-items: center; gap: 10px; padding: 12px 16px; background: var(--gray-lt); border-radius: 10px; }
.progress-bar { flex: 1; height: 8px; background: #dbe2ed; border-radius: 999px; overflow: hidden; }
.progress-fill { height: 100%; background: var(--aqua); }
```

---

## 6. Grillas y espaciado

```css
.grid-2 { grid-template-columns: repeat(2, minmax(0,1fr)); }
.grid-3 { grid-template-columns: repeat(3, minmax(0,1fr)); }
.grid-4 { grid-template-columns: repeat(4, minmax(0,1fr)); }
.dual   { grid-template-columns: 2fr 1fr; }    /* contenido principal + sidebar */
```
Gap estándar entre cards: `20px`
Gap entre campos de formulario: `16px`

---

## 7. Animaciones y transiciones

| Elemento | Trigger | Propiedad | Duración | Easing |
|----------|---------|-----------|----------|--------|
| Sidebar item | hover | background, color | `150ms` | ease |
| Botones (todos) | hover | background, color | `150ms` | ease |
| Quick action btn | hover | background, border, transform | `180ms` | ease |
| Product option card | hover | border, transform | `180ms` | ease |
| Btn loading spinner | — | rotation | `700ms` | linear, infinite |
| More menu panel | open/close | display → grid / none | — | (sin transición en el mock) |
| Input focus ring | focus | border-color, box-shadow | `150ms` (recomendado) | ease |

**Transformaciones hover:**
- `.qa-btn:hover`: `transform: translateY(-1px)` — micro-elevación
- `.product-option:hover`: `transform: translateY(-1px)` — misma convención

---

## 8. Comportamiento responsive

Un único breakpoint en `max-width: 1180px`:

| Elemento | Desktop | ≤ 1180px |
|----------|---------|----------|
| `.grid-2`, `.grid-3`, `.grid-4` | multi-columna | `1fr` (apilado) |
| `.dual` | `2fr 1fr` | `1fr` |
| `.field-grid`, `.field-grid-3` | multi-columna | `1fr` |
| `.fund-row` | grid 4 columnas | flex wrap |
| `.featured-funds .fund-row` | grid compacto 42px / 1fr / 168px / 44px | conserva grid compacto para proteger la columna del botón |
| `.portfolio-filters`, `.movements-filters` | 3 columnas | `1fr` |
| `.auth-shell` | split panel | panel único (marca oculta) |
| `.auth-brand` | visible, 56px padding | padding reducido a 36px 28px |
| `.page-head` | flex row | flex column |
| `.more-menu-panel` | `right: 0` | `left: 0` (ancho 100%) |
| `.quick-grid`, `.auth-mini-grid` | 2 columnas | `1fr` |

---

## 9. Inventario de pantallas

| Vista | ID | Flujo | Notas |
|-------|----|-------|-------|
| Landing | `view-landing` | Acceso | Split panel; dos CTAs: Ingresar / Solicitar acceso |
| Login | `view-login` | Acceso | Usuario + contraseña + checkbox "Recordarme" |
| 2FA | `view-twofa` | Acceso | 6 OTP slots; puede ser código SMS o TOTP |
| Recuperación | `view-recovery` | Acceso | Solo email; envía token de restablecimiento |
| Cambio de contraseña | `view-password-update` | Acceso | Nueva + confirmación; también sirve para contraseña vencida |
| Registro | `view-register` | Registro | 6 pasos: T&C → Acceso → Instructivo → Datos → Bancos → Fondo |
| Dashboard | `view-dashboard` | App | KPI hero + 3 métricas + fondos destacados + quick actions |
| Mi Portafolio | `view-portfolio` | App | Filtros + resumen + lista completa de fondos por cuenta |
| Detalle de Fondo | `view-fund-detail` | App | Métricas del fondo + historial + beneficiarios + firmantes |
| Nueva Inversión | `view-new-investment` | Operaciones | Selección de producto → monto → beneficiarios → confirmación |
| Confirmar Depósito | `view-confirm-deposit` | Operaciones | Instrucciones bancarias + upload de comprobante |
| Recompras | `view-redemption` | Operaciones | Tipo (parcial/total) → monto → confirmación |
| Movimientos | `view-movements` | App | Filtros + chips de período + rango de fechas + tabla + export |
| Beneficiarios | `view-beneficiaries` | Gestión | Lista de personas + % distribución + barra de progreso |
| Otros Firmantes | `view-signatories` | Gestión | Lista de signatarios con tipo y estado |
| Titulares | `view-holders` | Gestión | Titulares de la cuenta |
| Nuevo Fondo | `view-new-fund` | Gestión | Wizard de selección de producto |
| Nueva Cuenta | `view-new-account` | Gestión | Formulario de creación en borrador |
| Gestionar Cuenta | `view-account-detail` | Gestión | Datos de cuenta + fondos + cuentas bancarias vinculadas |
| Mi Perfil | `view-profile` | Gestión | Datos personales editables + cambio de contraseña |

---

## 10. Estados de pantalla

Cada vista que cargue datos asíncronos debe implementar:

| Estado | Tratamiento |
|--------|-------------|
| **Cargando** | Skeleton loader (rectángulos en `--gray-lt` con shimmer) o spinner centrado en `--aqua` |
| **Vacío** | Ilustración + texto explicativo (14px, `--text-sec`) + CTA para iniciar la acción |
| **Error de red** | `.alert.alert-danger` dismissible en la parte superior, con botón "Reintentar" |
| **Éxito de acción crítica** | Pantalla dedicada (no solo toast) con ícono de confirmación, resumen de la operación y CTA de regreso |
| **Restricción legal (PEP/CPE)** | Bloque bloqueante: `background: #FFF0F0; border: 1px solid #E53935; border-radius: 10px` — siempre incluir botón de salida |

---

## 11. Accesibilidad — checklist de implementación

### Contraste WCAG AA
| Combinación | Ratio | Estado |
|-------------|-------|--------|
| Texto `#fff` sobre `--navy` | ~10.5:1 | ✅ |
| Texto `--text` (#1a1a2e) sobre blanco | ~17:1 | ✅ |
| Texto `--text-sec` (#5a6478) sobre blanco | ~5.5:1 | ✅ |
| Texto `--text-lt` (#8892A4) sobre blanco | ~3.8:1 | ⚠️ Solo ≥ 14px |
| `.pill-success` texto `#166534` sobre `rgba(34,197,94,.14)` | ~4.5:1 | ✅ |

### ARIA requerido

```html
<!-- Navegación principal -->
<nav role="navigation" aria-label="Menú principal del portal">

<!-- Step bar -->
<div role="progressbar" aria-valuenow="2" aria-valuemin="1" aria-valuemax="6" aria-label="Paso 2 de 6: Credenciales de acceso">

<!-- Modales / diálogos -->
<div role="dialog" aria-modal="true" aria-labelledby="modal-title-id">

<!-- Inputs con error -->
<input aria-invalid="true" aria-describedby="error-msg-id">
<span id="error-msg-id" role="alert">Mensaje de error</span>

<!-- Alertas dinámicas -->
<div class="alert alert-warning" role="alert">

<!-- More menu -->
<button aria-haspopup="true" aria-expanded="false" aria-label="Más acciones">

<!-- Imágenes decorativas / logos -->
<img src="…" alt="Pdei+ logotipo">
```

### Teclado
- Tab order debe seguir el flujo visual de arriba a abajo, izquierda a derecha
- Modales deben atrapar el foco (`focus trap`) — Escape los cierra
- OTP: al completar un dígito, el foco avanza automáticamente al siguiente slot
- Regla de focus visible:

```css
:focus-visible {
  outline: 2px solid var(--aqua);
  outline-offset: 2px;
}
:focus:not(:focus-visible) { outline: none; }
```

### Tamaños táctiles mínimos
- Todos los botones interactivos: mínimo **40×40px**
- `.icon-btn`, `.more-menu-toggle`: 40×40px
- OTP slots: 40px mínimo de ancho

---

## 12. Tipografía — notas de implementación

Las fuentes de marca deben cargarse vía `@font-face` o CDN antes de usar los tokens:

```css
@font-face {
  font-family: 'NeulisSans';
  src: url('/fonts/NeulisSans-Regular.woff2') format('woff2');
  font-weight: 400; font-display: swap;
}
@font-face {
  font-family: 'NeulisSans';
  src: url('/fonts/NeulisSans-Medium.woff2') format('woff2');
  font-weight: 500; font-display: swap;
}
@font-face {
  font-family: 'NeulisSans';
  src: url('/fonts/NeulisSans-Bold.woff2') format('woff2');
  font-weight: 700 800; font-display: swap;
}
```

Mientras no estén disponibles, el mock usa `'Segoe UI', system-ui` como proxy visual — la métrica es similar pero el kerning diferirá en producción.

---

*Handoff generado desde `Pdei+ Web Mock.html` + `Pdei+ Design System.md` v1.1. Última actualización: Mayo 2026.*
