# Codex Prompt — Correcciones Diseño Pdei+ v1 + Logo Final

**Fecha:** 2026-05-09
**Fuente:** Correo de Roberto Arreaga (rarreaga@ktfsoluciones.com) — RE: DERCAS - FEIS

---

## Contexto

El cliente revisó el diseño preliminar entregado y envió 24 correcciones específicas, más el paquete de marca final (logo, fonts, SVGs). Tu tarea es implementar **todas** las correcciones listadas abajo y reemplazar los assets de marca con los archivos finales de la carpeta `Línea Gráfica/`.

Los archivos fuente del mock que debes editar son:
- `Pdei+ Web Mock.html`
- `Pdei+ Componentes.html`

El Design System de referencia está en:
- `Pdei+ Design System.md`
- `CODEX.md`

---

## Assets de Marca Final

Los siguientes archivos ya están disponibles en `Línea Gráfica/` y deben usarse **en lugar de cualquier placeholder o logo anterior**:

### Fonts (cargar vía `@font-face` desde rutas relativas)
```
Línea Gráfica/FONTS/Neulis Sans Regular.ttf        → font-family: 'NeulisSans', weight: 400
Línea Gráfica/FONTS/Neulis Sans Bold.ttf            → font-family: 'NeulisSans', weight: 700
Línea Gráfica/FONTS/Neulis Sans Semi Bold Italic.ttf → font-family: 'NeulisSans', weight: 600, style: italic
Línea Gráfica/FONTS/Futura PT Medium.ttf            → font-family: 'FuturaPT', weight: 500
Línea Gráfica/FONTS/TT Norms Pro Trial Condensed Black Italic.ttf → font-family: 'TTNormsPro', weight: 900, style: italic
```

### Logos SVG (usar en sidebar, login, landing, header donde aplique)
```
Línea Gráfica/SVG/LOGO_PORTAFOLIO DE INVERSIONES HORIZONTAL.svg   → logo horizontal (sidebar, header)
Línea Gráfica/SVG/LOGO_PORTAFOLIO DE INVERSIONES VERTICAL.svg     → logo vertical (login, landing)
Línea Gráfica/SVG/ISOTIPO_PORTAFOLIO DE INVERSIONES.svg            → isotipo solo (favicon, versión compacta)
```

**Regla crítica del cliente:** El logo NO lleva fondo gris. Si actualmente hay un `background` o `background-color` aplicado al contenedor del logo, eliminarlo. El logo debe mostrarse sobre el fondo natural (navy en sidebar, blanco o transparente en otras zonas).

### PNGs de respaldo
```
Línea Gráfica/PNG/LOGO_PORTAFOLIO DE INVERSIONES 1.png         → versión default
Línea Gráfica/PNG/LOGO_PORTAFOLIO DE INVERSIONES 1 AZUL.png    → variante azul
Línea Gráfica/PNG/LOGO_PORTAFOLIO DE INVERSIONES 1 BLANCO.png  → sobre fondos oscuros
Línea Gráfica/PNG/LOGO_BLANCO - PORTAFOLIO DE INVERSIONES 3.png → blanco alternativo
```

---

## Correcciones — Implementar todas

### 1. Renombrar el portal: eliminar "FEIS" en toda la interfaz
- Buscar y reemplazar **toda** ocurrencia del texto "FEIS" visible en la UI por **"Pdei+"**.
- "FEIS" es un término técnico interno que el cliente final no debe ver.
- Esto incluye: títulos, subtítulos, breadcrumbs, textos de ayuda, footers, pantallas de login, pantallas de registro, y cualquier otro lugar donde aparezca.

### 2. Color navy dark eliminado de la paleta activa
- El color `--navy-dark: #1e1e45` **no forma parte del pantone del logo** aprobado.
- Eliminarlo de todos los usos en la UI. Sustituirlo por `--navy: #2B2B5E` donde se usaba como fondo oscuro principal.
- Si hay gradientes que usan `navy-dark`, reemplazar con `navy`.

### 3. Fonts: usar exclusivamente los de la Línea Gráfica
- Cargar los 5 fonts listados arriba vía `@font-face`.
- Asegurarse de que `--font-main` use `NeulisSans`, `--font-secondary` use `FuturaPT`, y `--font-brand` use `TTNormsPro`.
- Eliminar cualquier referencia a Google Fonts, CDN de fuentes externas, o fuentes genéricas que hayan estado actuando como placeholder.

### 4. Logo: reemplazar por SVG oficial, sin fondo gris
- En el sidebar: usar `LOGO_PORTAFOLIO DE INVERSIONES HORIZONTAL.svg`.
- En login y landing: usar `LOGO_PORTAFOLIO DE INVERSIONES VERTICAL.svg`.
- Eliminar cualquier `background`, `background-color: #ccc`, `background-color: gray` o similar del contenedor del logo.
- El fondo gris no existe en la identidad visual del cliente.

### 5. Botón de selección: borde menos grueso (si es posible)
- Reducir el `border-width` del botón de selección (radio button estilizado o checkbox primario) de su valor actual a `1.5px` o `1px`.
- Si el diseño actual usa `2px` o más, reducirlo. Si ya es `1px`, dejarlo.

### 6. KPIs con rendimiento negativo: definir tratamiento visual
- Actualmente los KPIs muestran rendimiento positivo con color aqua/verde sobre fondo navy.
- Para rendimiento negativo, **no usar rojo sobre fondo navy** (no combina bien).
- Usar en su lugar `#FFB347` (naranja) o `--warning: #F59E0B` para el valor negativo.
- Agregar un ícono de flecha hacia abajo (`↓`) junto al valor negativo para reforzar el sentido sin depender solo del color.
- Aplicar este tratamiento en: Dashboard KPIs, Movimientos KPIs, Detalle de Fondo.

### 7. Footer: actualizar textos
- Texto de la **columna izquierda** del footer → `Portafolio de Inversiones, S.A.`
- Texto de la **columna central** del footer → `Contratos de Fondos de Inversión Registrados en el Registro de Mercado de Valores y Mercancías`
- Mantener el resto del footer sin cambios (año, links si los hay).

### 8. Barra de navegación (sidebar): resaltar opción activa con fondo diferente
- Actualmente el ítem activo del sidebar puede solo cambiar de color de texto o usar un acento.
- Agregar un `background` visible al ítem activo, por ejemplo: `rgba(255,255,255,0.12)` o `rgba(0,205,229,0.15)` sobre el fondo navy.
- El contraste debe ser suficiente para distinguir claramente el ítem seleccionado del resto.

### 9. Pantalla de Login — Títulos de bienvenida
- El título principal al iniciar sesión debe decir exactamente: **`Ingresa a tu perfil`**
- El subtítulo debe decir exactamente: **`Acceso para clientes con expediente validado.`**
- Eliminar cualquier texto anterior en esas posiciones.

### 10. Login — Textos de identidad y descripción
- Reemplazar cualquier texto que diga "FEIS" por **`Portafolio de Inversiones, S.A.`**
- En la descripción del portal (el párrafo de bienvenida o tagline del login), asegurarse de incluir la frase: **`y/o administrar tus productos`**
- Ejemplo de texto resultante: *"Accede para gestionar tu portafolio y/o administrar tus productos."*

### 11. Registro — Título del flujo
- Cambiar el título del paso o encabezado que actualmente diga algo como "Crear cuenta" o "Registro" por: **`Solicitud de Creación de Perfil`**

### 12. Cuentas bancarias — Texto de habilitación
- Buscar el texto descriptivo en la sección de habilitación/vinculación de cuentas bancarias.
- Reemplazarlo por: **`Las cuentas registradas podrán utilizarse para pago de rendimientos o depósito de desinversiones al finalizar el período.`**

### 13. Cajas de información con solo números: alinear a la izquierda
- En tarjetas o campos que muestren **exclusivamente valores numéricos** (sin unidades ni símbolos de moneda), el texto debe alinearse a la **izquierda** (`text-align: left`).
- Esto aplica a: campos de referencia, contadores, IDs numéricos, cualquier caja donde el contenido sea un número puro.
- Nota: los montos financieros (con símbolo Q o $) conservan su alineación definida en el Design System (derecha en tablas, izquierda si son el mensaje principal del KPI).

### 14. Estados: estandarizar formato con círculo + fondo
- Todos los estados del sistema deben usar el mismo patrón visual: **círculo de color + fondo de color suave + texto**.
- El círculo (dot) debe tener `8-10px` de diámetro.
- El fondo del badge debe ser una versión de baja opacidad del color del estado.
- Aplicar a: estados de fondos, estados de cuentas, estados de solicitudes, estados de movimientos.
- Ejemplo de estructura HTML:
```html
<span class="status-badge status-active">
  <span class="status-dot"></span> Activo
</span>
```

### 15. Estado "en verificación" → renombrar a "en revisión"
- Buscar y reemplazar **toda** ocurrencia de `"en verificación"` (incluyendo variantes: "En verificación", "EN VERIFICACIÓN") por **`"en revisión"`** / `"En revisión"`.
- Aplicar en UI y en cualquier dato de muestra (mock data) que use ese estado.

### 16. Montos proyectados: siempre llevan asterisco y nota al pie
- Todo monto que sea una proyección o estimación debe tener un **asterisco `*`** junto al valor.
- Al pie de la sección (o al pie de la tarjeta donde aparezcan), agregar siempre esta nota:
  > *Los datos reflejados únicamente son una proyección, por lo que los cálculos reflejados no representan ningún compromiso para Portafolio de Inversiones, S.A.*
- La nota debe aparecer en texto pequeño (`font-size: 11-12px`, `color: --text-lt`).
- Aplicar en: Dashboard (rendimientos proyectados), Detalle de Fondo, cualquier vista que muestre proyecciones.

### 17. Nombres de productos — Usar nomenclatura oficial exacta
Reemplazar cualquier nombre de fondo de inversión en el mock data o en textos de UI por los nombres oficiales:

| Usar este nombre exacto |
|-------------------------|
| Pdei, Fondo Bursátil en Quetzales |
| Pdei, Fondo Bursátil en Dólares |
| Pdei, Fondo Líquido en Quetzales |
| Pdei, Fondo Valores del Estado en Quetzales |
| Fondo de Inversión del Migrante y de Inclusión Financiera en Quetzales |
| Fondo de Inversión del Migrante y de Inclusión Financiera en Dólares |

Actualizar todos los selects, listados, detalle de fondo, cards de portafolio, y cualquier otro lugar donde aparezcan nombres de productos.

### 18. Ícono de ayuda contextual en inputs
- Agregar un ícono de ayuda (ⓘ) al lado derecho del label o al extremo derecho del input en campos donde el usuario pueda necesitar orientación.
- Al hacer **hover** o **click** sobre el ícono, mostrar un tooltip con texto de ayuda.
- El tooltip debe ser pequeño, con fondo oscuro y texto blanco, posicionado sobre o bajo el ícono sin sobreponerse al input.
- Estructura sugerida:
```html
<div class="input-group">
  <label>Nombre del campo <span class="help-icon" title="Texto de ayuda aquí">ⓘ</span></label>
  <input type="text" />
</div>
```
- Aplicar al menos en: campos de monto (mínimos/máximos), campos de porcentaje de beneficiarios, campos de fecha de vencimiento, campos de referencia bancaria.

### 19. Perfil de cliente — Reordenar campos y separar dirección
- **Primera fila:** Fecha de Nacimiento | Estado Civil | Nacionalidad
- **Segunda fila:** Teléfono | Correo Electrónico
- Eliminar el texto o sección que diga **"y contacto"** (el contacto ya queda integrado en la segunda fila).
- La dirección debe estar **separada en campos individuales**:
  - Departamento / Estado
  - Municipio / Ciudad
  - Zona / Colonia
  - Dirección (calle, número, apto)
- No usar un solo campo de texto libre para toda la dirección.

### 20. Rango de ingresos — Separar en dos campos con selección de moneda
- Actualmente puede ser un campo de texto libre o un solo input.
- Reemplazar por **dos campos separados**: Rango Inicial y Rango Final.
- Cada campo debe tener un **selector de moneda** (Q / USD) al lado o como prefijo.
- Usar el patrón `input-prefix` ya definido en el Design System.
- Ejemplo de estructura:
```html
<div class="income-range">
  <div class="input-prefix-group">
    <select class="currency-select"><option>Q</option><option>USD</option></select>
    <input type="number" placeholder="Rango inicial" step="0.01" />
  </div>
  <span class="range-separator">—</span>
  <div class="input-prefix-group">
    <select class="currency-select"><option>Q</option><option>USD</option></select>
    <input type="number" placeholder="Rango final" step="0.01" />
  </div>
</div>
```

### 21. Cuentas bancarias — Número no enmascarado + checkbox estándar
- Cambiar la etiqueta `"número enmascarado"` por **`"Número de Cuenta"`**.
- El número de cuenta **no debe mostrarse con asteriscos** (`****1234`). Mostrar el número completo.
- Los checkboxes de la sección de cuentas bancarias deben usar el **mismo componente de checkbox** ya definido en `Pdei+ Componentes.html`. Reemplazar cualquier checkbox nativo o de otro estilo.

### 22. Creación de cuenta — Eliminar estado "en borrador"
- El estado `"en borrador"` no existe en el sistema real.
- Al crear una cuenta nueva, el estado inicial que debe mostrar el círculo de estado es: **`Por Confirmar`**
- Reemplazar cualquier texto, pill, badge o indicador que diga "en borrador" / "Borrador" / "Draft" por `"Por Confirmar"`.

### 23. Titulares, beneficiarios y otros firmantes — Separar campos de nombre
- Los campos de nombre completo deben separarse en campos **individuales**:
  1. Primer Nombre
  2. Segundo Nombre
  3. Otros Nombres
  4. Primer Apellido
  5. Segundo Apellido
  6. Apellido de Casada *(opcional, mostrar si aplica)*
- Aplicar en: formulario de Titular, formulario de Beneficiario, formulario de Otro Firmante.
- Los campos "Segundo Nombre", "Otros Nombres" y "Apellido de Casada" pueden ser opcionales (no required).

### 24. Beneficiarios — Mensaje de distribución siempre visible
- Actualmente el mensaje de "la distribución debe sumar 100%" puede aparecer solo cuando hay un error o cuando el usuario no ha completado la distribución.
- El mensaje debe estar **siempre visible** en la sección de beneficiarios, sin importar si la distribución está completa o no.
- Colocarlo debajo de la lista de beneficiarios, antes del botón de guardar distribución.
- Cuando la distribución esté completa (100%), el mensaje puede cambiar de color a `--success`, pero nunca ocultarse.

---

## Reglas generales para esta iteración

- No romper flujos existentes. Si un cambio de texto o layout puede afectar la lógica de navegación, conservar la lógica y solo cambiar la presentación.
- Todos los cambios de texto deben buscar y reemplazar en **todos** los archivos fuente relevantes, no solo en la pantalla más obvia.
- Los assets de marca (SVG, fonts) deben referenciarse con **rutas relativas** desde la raíz del proyecto.
- Si un font no carga correctamente en el browser, agregar el fallback apropiado definido en el Design System.
- El mock debe seguir funcionando como Single File (sin servidor). Los `@font-face` y los `<img src="...">` deben usar rutas relativas que funcionen al abrir el HTML desde el sistema de archivos.

---

## Resultado esperado

Al finalizar, los archivos `Pdei+ Web Mock.html` y `Pdei+ Componentes.html` deben:
1. No contener ninguna mención visible a "FEIS".
2. Mostrar el logo SVG oficial sin fondo gris.
3. Cargar los fonts de la Línea Gráfica.
4. Reflejar todos los cambios de texto, orden de campos, nombres de productos, estados y comportamientos descritos en los puntos 1–24.
5. Mantener todos los flujos del mock funcionales (navegación, estados, wizards).
