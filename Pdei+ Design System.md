# Pdei+ Design System
**Portal Portafolio de Inversiones Plus**
Versión 1.1 — Mayo 2026

---

## 1. Fundamentos de Marca

### Propósito
Pdei+ es el portal digital de gestión de inversiones (FEIS) de Guatemala. El sistema de diseño refleja confianza institucional, claridad financiera y accesibilidad para el usuario no experto en inversiones. Cada decisión visual refuerza seguridad y profesionalismo.

### Principios
**Claridad sobre ornamentación.** En contextos financieros, la información debe ser la protagonista. Los elementos visuales existen para organizar datos, no para decorar.

**Consistencia genera confianza.** Los mismos patrones de interacción en cada flujo reducen la carga cognitiva del usuario y transmiten solidez institucional.

**Progresividad.** Los flujos multi-paso (registro, nueva inversión, edición de perfil) guían al usuario con retroalimentación constante sobre su avance.

---

## 2. Tokens de Diseño

### 2.1 Colores

#### Paleta principal

| Token CSS | Hex | Uso |
|-----------|-----|-----|
| `--navy` | `#2B2B5E` | Sidebar, botón primario sobre fondos claros, encabezados de tabla, paso activo |
| `--navy-dark` | `#1e1e45` | Hover de navy, fondo de gradiente oscuro en KPI card |
| `--navy-mid` | `#35356e` | Variante intermedia para fondos de sección navy |
| `--aqua` | `#00CDE5` | CTA principal (web), acento interactivo, progreso completado, montos positivos |
| `--dark-aqua` | `#00798E` | Hover de aqua, texto aqua sobre fondos claros (mayor contraste) |

#### Paleta neutral

| Token CSS | Hex | Uso |
|-----------|-----|-----|
| `--bg` | `#F4F6F9` | Fondo de pantallas autenticadas, hover de filas de tabla |
| `--bg-card` | `#FFFFFF` | Fondo de cards, modales, inputs |
| `--gray-lt` | `#EEF0F5` | Fondos alternos, inputs disabled |
| `--border` | `#DDE2EC` | Bordes de inputs, cards, separadores, step pendiente |
| `--text` | `#1a1a2e` | Texto principal (cuerpo, títulos) |
| `--text-sec` | `#5a6478` | Texto secundario medio (subtítulos, labels) |
| `--text-lt` | `#8892A4` | Texto terciario (placeholders, etiquetas inactivas, step labels) |
| `--white` | `#FFFFFF` | Texto sobre navy, iconos en sidebar |

#### Paleta semántica

| Token CSS | Hex | Uso |
|-----------|-----|-----|
| `--success` | `#22C55E` | Montos crédito, estado exitoso, alert-success |
| `--warning` | `#F59E0B` | Advertencias no críticas, alert-warning |
| `--danger` | `#EF4444` | Montos débito, errores de validación, alert-danger, btn-danger |
| `--info` | `#3B82F6` | Mensajes informativos, alert-info |

#### Colores de error PEP/CPE (sin token CSS, valores directos)

| Rol | Valor |
|-----|-------|
| Fondo | `#FFF0F0` |
| Borde | `#E53935` |
| Título | `#C62828` |
| Cuerpo | `#B71C1C` |

#### Uso contextual
Las pantallas de **acceso** (landing, login, 2FA, recuperar contraseña) usan `--navy` como fondo con texto blanco. Las pantallas **autenticadas** usan `--bg` con cards `--bg-card` blancas. Esta distinción actúa como indicador visual inmediato del estado de sesión.

---

### 2.2 Tipografía

#### Familias

| Token CSS | Familia | Fallback | Rol |
|-----------|---------|----------|-----|
| `--font-main` | NeulisSans Regular/Medium | Segoe UI, sans-serif | Cuerpo, etiquetas, UI general |
| `--font-secondary` | FuturaPT | Segoe UI, sans-serif | Subtítulos, texto de soporte |
| `--font-brand` | TTNorms Pro Condensed Black Italic | Impact, sans-serif | Logotipo, cifras financieras destacadas |

#### Escala

| Elemento | Tamaño | Peso | Notas |
|----------|--------|------|-------|
| Título de pantalla (hero) | 36–44px | Bold | Solo landing y acceso |
| Título de sección | 22–28px | Bold | Encabezado de cada pantalla autenticada |
| Encabezado de card | 17–18px | 600 | |
| KPI principal | 40px | 800 | `.kpi-amount` |
| KPI pequeño | 26px | 700 | `.kpi-small-value` |
| Etiqueta de input | 13px | 500 | Color `--text-sec`, siempre encima del campo |
| Cuerpo / párrafo | 14–15px | Regular | Máx. 65 caracteres por línea |
| Texto secundario | 12–13px | Regular | Color `--text-lt` |
| Encabezado de tabla | 12px | 600 | Uppercase, background `--navy` |
| Caption / pie | 10–11px | Regular | Notas, restricciones legales |
| Sidebar nav | 13.5px | 500 | Color `rgba(255,255,255,.65)` inactivo |
| Sidebar section label | 10px | 700 | Uppercase, letter-spacing 1.4px |

---

### 2.3 Espaciado

Sistema basado en múltiplos de 4px.

| Nivel | Valor | Uso típico |
|-------|-------|-----------|
| xs | 4px | Gap entre ícono y etiqueta |
| sm | 8px | Gap entre chips/OTP boxes, padding horizontal de badges |
| md | 12–16px | Padding interno de inputs, gap entre elementos de form |
| lg | 20–24px | Padding de cards, margen entre secciones |
| xl | 28–32px | Padding de `.comp-card`, padding de pantallas |
| 2xl | 40–48px | Padding de pantallas en web |

Margen mínimo del borde de pantalla: **16px mobile, 24px+ web**.

---

### 2.4 Bordes y radios

| Token CSS | Valor | Uso |
|-----------|-------|-----|
| `--radius-sm` | `8px` | Checkbox, radio, botones pequeños, select |
| `--radius-md` | `12px` | Inputs, cards compactas, person-card, modal |
| `--radius-lg` | `16px` | Cards principales, `.comp-card`, KPI card, modal-box |
| `--radius-btn` | `14px` | Botones estándar |
| `--radius-pill` | `20px` | Chips, badges, status pills |

Grosor de borde estándar: `1px solid var(--border)`. Borde activo/focus: `2px solid var(--aqua)`.

---

### 2.5 Sombras y elevación

| Token CSS | Valor | Uso |
|-----------|-------|-----|
| `--shadow-card` | `0 2px 16px rgba(0,0,0,.07)` | Todas las cards autenticadas |
| `--shadow-sm` | `0 1px 4px rgba(0,0,0,.08)` | Elementos de menor elevación (botones flotantes, tooltips) |
| Sin sombra | — | Pantallas de acceso (navy absorbe el contraste) |

---

### 2.6 Variables de layout

| Token CSS | Valor | Uso |
|-----------|-------|-----|
| `--sidebar-w` | `210px` | Ancho del sidebar fijo |
| `--header-h` | `64px` | Alto del header fijo |

El `#main` tiene `margin-left: var(--sidebar-w)` y `margin-top: var(--header-h)` para no quedar debajo del shell fijo.

---

## 3. Identidad — Logos

### Opción A — Isotipo + símbolo plus

Combina el **isotipo "ip"** (marca gráfica de Portafolio de Inversiones, PNG blanco) con el símbolo **"+"** en `--aqua` tipografiado a continuación. Se usa en el sidebar y en contextos sobre fondos oscuros navy.

```
[ip]  Pdei+
 ↑ isotipo PNG blanco   ↑ "+" en aqua
```

- Isotipo: `LOGO_PORTAFOLIO DE INVERSIONES 1 BLANCO.png` (fondo transparente, mark puro sin texto)
- Símbolo "+": `font-size: 22px`, `font-weight: 800`, `color: var(--aqua)`
- Gap: `6px` entre isotipo y símbolo
- Usar sobre fondos `--navy` únicamente

### Opción B — Wordmark "Pdei+"

El nombre completo **Pdei+** como wordmark tipográfico, donde el "+" puede ir en `--aqua` para mantener el acento de marca.

- Fuente: `var(--font-main)`, `font-weight: 800`
- "Pdei": `color: var(--navy)` (sobre fondos claros) o `#fff` (sobre navy)
- "+": `color: var(--aqua)`
- Usar preferentemente sobre fondos blancos o claros

---

## 4. Componentes

### 4.1 Botones

Clase base `.btn` compartida por todas las variantes:

```css
.btn {
  padding: 11px 20px;
  border-radius: var(--radius-btn); /* 14px */
  font-size: 14px;
  font-weight: 600;
  border: 2px solid transparent;
  cursor: pointer;
  transition: background .18s, color .18s;
}
```

#### Variantes

| Clase | Fondo | Texto | Borde | Hover |
|-------|-------|-------|-------|-------|
| `.btn-primary` | `--aqua` | `--navy` | — | `--dark-aqua` bg, texto blanco |
| `.btn-navy` | `--navy` | `#fff` | — | `--navy-dark` bg |
| `.btn-outline` | transparente | `--navy` | `2px solid --navy` | `--navy` bg, texto blanco |
| `.btn-outline-aqua` | transparente | `--dark-aqua` | `2px solid --aqua` | `--aqua` bg, texto `--navy` |
| `.btn-ghost` | transparente | `--dark-aqua` | ninguno | `rgba(0,205,229,.1)` bg |
| `.btn-danger` | `--danger` | `#fff` | — | `#dc2626` bg |

#### Tamaños

| Clase | Padding | Font-size | Border-radius |
|-------|---------|-----------|---------------|
| `.btn-sm` | `7px 14px` | `12px` | `10px` |
| (default) | `11px 20px` | `14px` | `14px` |
| `.btn-lg` | `15px 28px` | `16px` | `16px` |
| `.btn-icon-only` | `10px` | — | `10px`, 38×38px cuadrado |

#### Variante de card action

`.btn-action-card` — botón para acciones secundarias dentro de cards (editar, añadir):
- Fondo: `rgba(0,205,229,.1)`, borde `1px solid rgba(0,205,229,.3)`, texto `--dark-aqua`
- Hover: fondo `rgba(0,205,229,.15)`, borde `--aqua`

#### Estados transversales

| Estado | Tratamiento |
|--------|------------|
| Disabled | `.btn:disabled` — `opacity: .45`, `cursor: not-allowed`, `pointer-events: none` |
| Loading | `.btn-loading` — texto transparente, spinner `::after` centrado en `--aqua` o blanco |

---

### 4.2 Inputs y formularios

Estructura base:

```html
<div class="input-group">
  <label class="input-label">Etiqueta</label>
  <input class="input-field" placeholder="…">
  <span class="input-hint">Texto de ayuda</span>
</div>
```

#### Propiedades del `.input-field`

- Fondo: `#fff`
- Borde: `1.5px solid var(--border)`, `border-radius: var(--radius-md)`
- Padding: `13px 16px`
- Font: 14px, color `--text`
- Placeholder: `--text-lt`

#### Estados

| Clase / estado | Borde | Sombra focus |
|----------------|-------|--------------|
| Default | `--border` | — |
| Focus | `--aqua` | `0 0 0 3px rgba(0,205,229,.12)` |
| `.error` | `--danger` | `0 0 0 3px rgba(239,68,68,.12)` |
| `.success` | `--success` | — |
| Disabled | `--border` | — (fondo `--gray-lt`, opacity) |

Mensaje de error: `.input-error-msg` — `12px`, color `--danger`, con ícono prefijo.
Mensaje de éxito: `.input-success-msg` — `12px`, color `--success`.

#### Campo con ícono derecho (contraseña)

```css
.input-wrap { position: relative; display: flex; align-items: stretch; }
.input-wrap .input-field { padding-right: 44px; flex: 1; min-width: 0; }
.input-icon-right {
  position: absolute; right: 0; top: 0; bottom: 0; width: 44px;
  display: flex; align-items: center; justify-content: center;
  border-radius: 0 var(--radius-md) var(--radius-md) 0;
}
```

El ícono está contenido dentro del input — no desborda el borde. Usar `position:absolute` + `right:0; top:0; bottom:0` (nunca `transform:translateY`).

#### Campo con prefijo

`.input-prefix` — wrapper que combina una etiqueta fija (ej. "Q") con el input:
- El wrapper tiene el estilo de borde/fondo del input
- La etiqueta prefijo (`.input-prefix-label`) tiene fondo `--gray-lt`, separador derecho
- El input interno no tiene borde propio; el focus se aplica al wrapper vía `:focus-within`

#### Select / Dropdown

Mismas propiedades que `.input-field` + `background-image` con un chevron SVG en `--text-lt`.

#### Checkbox y Radio

- Accent color: `var(--aqua)`
- Etiqueta a la derecha, 14px, alineada al baseline

#### Toggle / Switch

- Pista: `--border` inactivo / `--navy` activo, 44×24px, `border-radius: 12px`
- Thumb: blanco, 18×18px, circular, transición 0.2s

#### Campo de archivo (upload)

- Borde `2px dashed var(--border)`, `border-radius: var(--radius-md)`
- Ícono de subida + texto centrado
- Al seleccionar: muestra nombre de archivo con ícono de documento

---

### 4.3 OTP / 2FA (Digit Boxes)

```html
<div class="otp-group">
  <input class="otp-box" maxlength="1">
  <!-- × 6 -->
</div>
```

**Propiedades del `.otp-box`:**
- Tamaño: `48px` ancho × `58px` alto
- Borde reposo: `2px solid var(--border)`, `border-radius: 10px`
- Texto: `24px`, bold, `--navy`, centrado
- `.filled` — borde `--aqua`, fondo `rgba(0,205,229,.05)`
- `.active` — borde `--aqua`, `box-shadow: 0 0 0 3px rgba(0,205,229,.15)`

En **pantalla oscura (navy bg):**
- Borde: `2px solid rgba(255,255,255,.3)`
- Fondo: `rgba(255,255,255,.1)`
- Texto: blanco

---

### 4.4 Cards

#### Card base — `.comp-card`

Contenedor general para secciones de componentes y contenido autenticado.

```css
.comp-card {
  background: var(--bg-card);
  border-radius: var(--radius-lg);   /* 16px */
  border: 1px solid var(--border);
  padding: 28px;
  box-shadow: var(--shadow-card);
}
```

#### KPI card oscura — `.kpi-card-dark`

Card de portada para el saldo principal del portafolio.

```css
.kpi-card-dark {
  background: linear-gradient(135deg, var(--navy) 0%, #1a1a45 100%);
  border-radius: var(--radius-lg);
  padding: 28px 28px 24px;
  color: #fff;
}
```

Estructura interna:
- `.kpi-label` — 11px, 700, uppercase, letter-spacing 1.2px, `rgba(255,255,255,.55)`
- `.kpi-amount` — 40px, 800, blanco; el símbolo de moneda en `.kpi-amount span` va en `--aqua`
- `.kpi-sub` — 13px, `rgba(255,255,255,.5)`
- `.kpi-badge` — badge de estado sobre fondo oscuro (pill blanca semi-transparente)

#### KPI pequeño — `.kpi-small`

Card métrica compacta para indicadores secundarios (rendimiento, plazo, etc.).

- `.kpi-small-label` — 12px, `--text-lt`
- `.kpi-small-value` — 26px, 700, `--text`
- `.kpi-small-change` — 12px, 600; `.up` en `--success`, `.down` en `--danger`

#### Fund row — `.fund-row`

Fila de lista de fondos dentro de un `.fund-list`. No es una card propia.

- Flex row con gap 14px, padding 14px vertical, borde inferior `--border`
- Ícono de fondo (40×40, border-radius 10px) + nombre/tipo + monto/rendimiento + botón acción

#### Person Card — `.person-card`

Card para beneficiarios o signatarios.

```css
.person-card {
  background: #fff;
  border: 1px solid var(--border);
  border-radius: var(--radius-md);  /* 12px */
  padding: 16px;
  display: flex;
  align-items: center;
  gap: 14px;
}
```

- Avatar circular 40×40px
- Nombre: 15px, SemiBold, `--navy`
- Meta (DPI, parentesco): 12px, `--text-lt`
- Porcentaje: 20px, bold, `--aqua`, alineado derecha

#### Barra de distribución porcentual

- Contenedor: fondo `--bg`, `border-radius: 8px`, padding 12–16px
- Track: `--border`, height 8px, `border-radius: 4px`
- Fill: `--aqua`, border-radius 4px
- Porcentaje: texto bold `--navy` alineado a la derecha

---

### 4.5 Step Bar (progreso multi-paso)

#### Web (con etiquetas)

```
●━━━━●━━━━○━━━━○
T&C  Creds Docs  Pers
```

Clase contenedora: `.step-bar` (flex, `align-items: flex-start`).

Cada paso `.step-item`:
- `::after` pseudo-element como línea conectora horizontal (height 2px)
- `.step-dot` — 28px circular, `border: 2px solid`, número o check-icon centrado

| Estado | Dot | Línea | Label |
|--------|-----|-------|-------|
| `.done` | Fondo `--aqua`, borde `--aqua`, ícono check, texto `--navy` | `--aqua` | `--dark-aqua` |
| `.active` | Fondo `--navy`, borde `--navy`, número blanco | `--border` | `--navy` bold |
| Pendiente | Fondo `#fff`, borde `--border`, número `--text-lt` | `--border` | `--text-lt` |

Labels `.step-lbl`: 11px, color según estado.

#### Mobile (barra simple)

Segmentos de height 4px, border-radius 2px, sin etiquetas.
Completado: `--aqua` · Activo: `--navy` · Pendiente: `--border`.

---

### 4.6 Chips de filtro

```html
<div class="chips-row">
  <button class="chip">1M</button>
  <button class="chip active">3M</button>
</div>
```

- Padding: `6px 14px`, border-radius: `var(--radius-pill)` (20px), font-size: 12px
- Inactivo: fondo `#fff`, borde `--border`, texto `--text-lt`
- Hover: borde `--navy`, texto `--navy`
- `.active`: fondo `--navy`, borde `--navy`, texto `#fff`

---

### 4.7 Tabla de movimientos — `.mov-table`

```
| Fecha | Descripción | Fondo | Estado | Monto |
```

```css
.mov-table th {
  background: var(--navy);
  color: #fff;
  font-size: 12px;
  font-weight: 600;
  padding: 11px 14px;
}
.mov-table th:first-child { border-radius: 10px 0 0 0; }
.mov-table th:last-child  { border-radius: 0 10px 0 0; }

.mov-table td {
  padding: 12px 14px;
  border-bottom: 1px solid var(--border);
  font-size: 13.5px;
}
.mov-table tbody tr:hover td { background: var(--bg); }
```

- Monto crédito: `.mov-credit` — `--success`, bold
- Monto débito: `.mov-debit` — `--danger`, bold
- Estado: `.status-pill` — pill redondeada con color semántico según valor

---

### 4.8 Alertas y mensajes

Estructura base:

```html
<div class="alert alert-success">
  <svg class="alert-icon">…</svg>
  <div>
    <div class="alert-title">Título</div>
    <div class="alert-body">Descripción del mensaje.</div>
  </div>
</div>
```

| Variante | Fondo | Borde | Texto |
|----------|-------|-------|-------|
| `.alert-success` | `rgba(34,197,94,.1)` | `rgba(34,197,94,.3)` | `#166534` |
| `.alert-warning` | `rgba(245,158,11,.1)` | `rgba(245,158,11,.3)` | `#92400e` |
| `.alert-danger` | `rgba(239,68,68,.1)` | `rgba(239,68,68,.3)` | `#991b1b` |
| `.alert-info` | `rgba(59,130,246,.1)` | `rgba(59,130,246,.3)` | `#1e40af` |

Propiedades comunes: `border-radius: var(--radius-md)`, padding 14px 16px, display flex, gap 10px.
`.alert-title`: 14px, font-weight 600. `.alert-body`: 13px, opacity .85.

#### Error Block PEP/CPE

Bloque bloqueante para restricciones legales. Se diferencia de las alertas estándar por su severidad y por incluir siempre un botón de salida del flujo.

- Fondo `#FFF0F0`, borde `1px solid #E53935`, border-radius 10px, padding 20px
- Título: 15px, `#C62828` · Cuerpo: 13px, `#B71C1C`, line-height 1.5

---

### 4.9 Badges y etiquetas

```html
<span class="badge badge-success">Activo</span>
```

Clase base `.badge`: `padding: 4px 10px`, `border-radius: var(--radius-pill)`, `font-size: 11px`, `font-weight: 600`, `letter-spacing: .3px`.

| Variante | Fondo | Texto |
|----------|-------|-------|
| `.badge-navy` | `--navy` | `#fff` |
| `.badge-aqua` | `--aqua` | `--navy` |
| `.badge-success` | `rgba(34,197,94,.15)` | `#166534` |
| `.badge-warning` | `rgba(245,158,11,.15)` | `#92400e` |
| `.badge-danger` | `rgba(239,68,68,.15)` | `#991b1b` |
| `.badge-neutral` | `--gray-lt` | `--text-sec` |

---

### 4.10 Modales

```html
<div class="modal-overlay show">
  <div class="modal-box">
    <h3 class="modal-title">Título</h3>
    <p class="modal-body">Descripción…</p>
    <div class="modal-actions">
      <button class="btn btn-outline">Cancelar</button>
      <button class="btn btn-primary">Confirmar</button>
    </div>
  </div>
</div>
```

```css
.modal-overlay {
  position: fixed; inset: 0;
  background: rgba(0,0,0,.45);
  display: none;          /* show: display:flex */
  align-items: center;
  justify-content: center;
  z-index: 200;
}
.modal-box {
  background: #fff;
  border-radius: var(--radius-lg);
  padding: 32px;
  max-width: 420px;
  width: 90%;
  box-shadow: 0 8px 40px rgba(0,0,0,.15);
}
```

- `.modal-title`: 18px, bold, `--text`
- `.modal-body`: 14px, `--text-sec`, line-height 1.6
- `.modal-actions`: flex, gap 10px, justify-content flex-end

**Regla:** los modales de acciones críticas (confirmar inversión, eliminar) no se cierran al hacer click en el overlay. Siempre incluir botón de cancelación explícito.

---

### 4.11 QR Placeholder (2FA)

- Tamaño: 160×160px
- Borde: `2px dashed var(--border)`, border-radius 12px
- Fondo: patrón cuadriculado en grises (simula el patrón QR)
- Centrado horizontalmente

---

### 4.12 Navegación — Sidebar web

```
┌─ Sidebar 210px (--navy) ──────┐
│  [ip logo] Pdei+              │  ← .sb-logo
│                               │
│  FUNDAMENTOS                  │  ← .sb-section
│    ○ Colores                  │  ← .sb-item
│    ● Tipografía  ← activo     │  ← .sb-item.active
│  COMPONENTES                  │
│    ○ Botones                  │
└───────────────────────────────┘
```

```css
.sb-section {
  font-size: 10px; font-weight: 700; letter-spacing: 1.4px;
  color: rgba(255,255,255,.35); text-transform: uppercase;
}
.sb-item {
  display: flex; align-items: center; gap: 10px;
  padding: 9px 12px; margin: 1px 8px;
  border-radius: 10px;
  color: rgba(255,255,255,.65);
  font-size: 13.5px; font-weight: 500;
}
.sb-item:hover { background: rgba(255,255,255,.06); color: #fff; }
.sb-item.active {
  background: rgba(255,255,255,.1);
  color: #fff;
}
.sb-item.active .sb-icon { color: var(--aqua); opacity: 1; }
```

Header fijo:
```css
#header {
  position: fixed; top: 0; left: var(--sidebar-w); right: 0;
  height: var(--header-h);   /* 64px */
  background: #fff;
  border-bottom: 1px solid var(--border);
  padding: 0 28px;
}
```

### 4.13 Navegación — Mobile (barra inferior)

Barra fija en la parte inferior, fondo blanco con sombra superior.

```css
.mob-nav-item { flex: 1; display: flex; flex-direction: column; align-items: center; gap: 3px; }
.mob-nav-item { color: var(--text-lt); font-size: 11px; }
.mob-nav-item.active { color: var(--navy); }
```

Ítems sugeridos: Inicio, Portafolio, Invertir, Cuenta, Perfil.

---

## 5. Patrones

### 5.1 Formularios multi-paso

- Mostrar siempre el **step bar** al inicio de la pantalla
- Un grupo de campos relacionados por paso (no formularios kilométricos)
- Validación **inline on blur**, no solo al enviar
- Botón "Continuar" deshabilitado hasta que los campos requeridos sean válidos
- Enlace "Atrás" o "Cancelar" siempre visible

**Orden del flujo de registro (RF4):**
1. Términos y Condiciones → aceptación explícita
2. Credenciales (usuario, contraseña, confirmación)
3. Instrucciones FEIS (pantalla informativa)
4. Documento de identificación (DPI / Pasaporte + foto)
5. Verificación PEP/CPE → bloqueo si aplica
6. Datos personales (nombre, fecha de nacimiento, domicilio, ocupación, etc.)
7. Cuentas bancarias
8. Cotitulares (opcional)
9. Pantalla de éxito / confirmación

### 5.2 Flujo de inversión (RF9/RF13)

1. Selección de tipo de fondo
2. Monto + alias + visualización de rendimiento esperado
3. Beneficiarios (resumen + confirmación)
4. Signatarios
5. Confirmar depósito (instrucciones bancarias)
6. Pantalla de éxito

### 5.3 Flujo de autenticación

**Primera vez:** Login → Cambio de contraseña temporal → Configuración 2FA (QR) → Dashboard

**Flujo normal:** Login → 2FA código → Dashboard

**Recuperación:** Login → "Olvidé mi contraseña" → Verificación email → Nueva contraseña

### 5.4 Estados de pantalla

| Estado | Tratamiento |
|--------|------------|
| Cargando | Skeleton loader o spinner centrado con `--aqua` |
| Vacío | Ilustración + texto explicativo + CTA para iniciar acción |
| Error de red | `.alert-danger` dismissible con opción de reintentar |
| Éxito | Pantalla de confirmación dedicada para acciones críticas |
| Restricción legal | Error block PEP/CPE con bloqueo total y opción de salir |

### 5.5 Feedback de acciones críticas

Para acciones irreversibles o de alto impacto (confirmar inversión, desinvertir, eliminar beneficiario):
- Modal de confirmación con resumen de la acción
- Botón primario de confirmación (destructivo: `.btn-danger`; positivo: `.btn-primary`)
- Botón secundario `.btn-outline` de cancelación
- No cerrable haciendo click fuera del modal

---

## 6. Accesibilidad

### Contraste mínimo WCAG AA

| Combinación | Ratio | Estado |
|-------------|-------|--------|
| Texto blanco sobre `--navy` (#2B2B5E) | ~10.5:1 | ✅ |
| Texto `--navy` sobre `--aqua` (#00CDE5) | ~4.8:1 | ✅ (≥18px bold) |
| Texto `--text` (#1a1a2e) sobre blanco | ~17:1 | ✅ |
| Texto `--text-sec` (#5a6478) sobre blanco | ~5.5:1 | ✅ |
| Texto `--text-lt` (#8892A4) sobre blanco | ~3.8:1 | ⚠️ Solo texto secundario ≥14px |

### Teclado

- Todos los inputs y botones accesibles por Tab
- Focus visible: `outline: 2px solid var(--aqua)` con offset 2px
- Modales: foco atrapado dentro mientras están abiertos; Escape los cierra

### ARIA

- Campos con error: `aria-invalid="true"` + `aria-describedby` apuntando al mensaje
- Step bar: `role="progressbar"`, `aria-valuenow`, `aria-valuemax`
- Modales: `role="dialog"`, `aria-modal="true"`, `aria-labelledby`
- Navegación principal: `role="navigation"`, `aria-label` descriptivo
- Alertas dinámicas: `role="alert"` para que los lectores de pantalla las anuncien

---

## 7. Guía de implementación

### Variables CSS a registrar

```css
:root {
  /* Brand */
  --navy:      #2B2B5E;
  --navy-dark: #1e1e45;
  --navy-mid:  #35356e;
  --aqua:      #00CDE5;
  --dark-aqua: #00798E;

  /* Neutrales */
  --bg:        #F4F6F9;
  --bg-card:   #FFFFFF;
  --gray-lt:   #EEF0F5;
  --text:      #1a1a2e;
  --text-sec:  #5a6478;
  --text-lt:   #8892A4;
  --border:    #DDE2EC;
  --white:     #FFFFFF;

  /* Semánticos */
  --success: #22C55E;
  --warning: #F59E0B;
  --danger:  #EF4444;
  --info:    #3B82F6;

  /* Tipografía */
  --font-main:      'NeulisSans', 'Segoe UI', sans-serif;
  --font-secondary: 'FuturaPT', 'Segoe UI', sans-serif;
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
  --sidebar-w: 210px;
  --header-h:  64px;
}
```

### Pantallas cubiertas

El prototipo HTML (`Pdei+ Pantallas.html`) cubre 30+ pantallas en los siguientes flujos:

| Flujo | Pantallas |
|-------|-----------|
| Acceso | Landing, Login, Contraseña vencida, Recuperar contraseña |
| 2FA | QR de configuración, Ingreso de código |
| Registro | T&C, Credenciales, Instrucciones, Documento, PEP/CPE, Datos personales, Cuentas, Cotitulares, Éxito |
| App autenticada | Dashboard, Portafolio, Detalle fondo, Nueva inversión |
| Operaciones | Movimientos, Desinversión, Confirmar depósito |
| Gestión de cuenta | Perfil, Beneficiarios, Signatarios, Nuevo fondo, Nueva cuenta |

### Componentes documentados en `Pdei+ Componentes.html`

| Sección | Contenido |
|---------|-----------|
| Logos e isotipo | Opción A (isotipo + "+") y Opción B (wordmark "Pdei+") |
| Colores | Swatches de todos los tokens de la paleta |
| Tipografía | Escala completa con familias y pesos |
| Espaciado y radios | Escala de spacing y radio tokens |
| Botones | Todas las variantes, tamaños y estados |
| Inputs y formularios | Todos los tipos de campo y estados de validación |
| OTP / 2FA | Digit boxes en reposo, activo y sobre fondo navy |
| Cards | Base card, KPI dark, KPI small, fund row, person card |
| KPIs y métricas | Tarjetas de indicadores financieros |
| Alertas y mensajes | Success, warning, danger, info + error PEP/CPE |
| Badges y etiquetas | 6 variantes semánticas |
| Modales | Modal de confirmación con acciones |
| Tabla de movimientos | Tabla con header navy, estados y montos |
| Step bar | Progreso web (con etiquetas) y mobile (barra simple) |
| Chips de filtro | Selector de período activo/inactivo |
| Navegación | Sidebar web + header + barra mobile |

---

*Documento sincronizado con `Pdei+ Componentes.html` v1.1. Para consultas sobre la línea gráfica, referirse a los archivos de marca en `Línea Gráfica/PNG/`.*
