# CODEX.md

## Propósito
Este documento es la base técnica para la futura implementación de `Pdei+`.

Consolida decisiones, contratos visuales, reglas funcionales y jerarquía de navegación a partir de estos archivos fuente:

- `/Users/javierbatres/Documents/Claude/Projects/FEIS/Pdei+ Componentes.html`
- `/Users/javierbatres/Documents/Claude/Projects/FEIS/Pdei+ Web Mock.html`

Este archivo no define un stack específico. Debe servir igual para una implementación en React, Vue, Angular, Flutter Web, Blazor o cualquier otra tecnología frontend.

## Cómo usar este documento
El equipo técnico debe usarlo como referencia para:

- estructurar arquitectura de frontend
- definir componentes reutilizables
- traducir el mock a vistas y flujos reales
- mantener consistencia visual y funcional
- separar correctamente pantallas principales de subflujos

Cuando exista duda entre diseño y comportamiento:

1. `Pdei+ Componentes.html` manda sobre el sistema visual y el lenguaje de componentes.
2. `Pdei+ Web Mock.html` manda sobre la composición de pantallas, estados y comportamiento esperado.

## Arquitectura

### Principios de implementación

- separar `tokens`, `componentes`, `pantallas`, `subflujos` y `estado de dominio`
- no mezclar reglas visuales con reglas de negocio
- modelar los flujos como máquinas de estados simples o wizards explícitos
- mantener navegación principal estable y subflujos contextuales
- evitar soluciones ad hoc por pantalla

### Capas recomendadas

- `Design Tokens`
  - colores
  - radios
  - sombras
  - espaciados
  - tipografía
- `UI Primitives`
  - button
  - input
  - select
  - pill
  - alert
  - icon button
  - card
- `Domain Components`
  - fund row
  - movement row
  - bank account card
  - beneficiary editor
  - signatory editor
  - step wizard
  - quick action card
- `Screens`
  - dashboard
  - portfolio
  - movements
  - profile
- `Subflows`
  - fund detail
  - new fund
  - new investment
  - redemption
  - confirm deposit
  - manage account
  - beneficiaries
  - signatories
  - new account

### TODO futuro: librería UI interna

Evaluar la creación de una mini librería interna `Pdei+ UI` para el equipo de desarrollo, inspirada en Tailwind pero acotada al sistema visual del proyecto.

Alcance sugerido:

- `pdei-tokens.css`: variables de color, tipografía, radios, sombras, spacing y tamaños base.
- `pdei-utilities.css`: utilidades limitadas para layout, espaciado, color, texto, grid/flex y estados.
- `pdei-components.css`: clases semánticas para botones, inputs, prefijos, tooltips, KPIs, badges, alerts, step bars, modales, tablas y navegación.
- `pdei-ui.js`: comportamientos reutilizables para tooltips, chips, toggles, modales, OTP, password toggle y estados activos.
- Usar `Pdei+ Componentes.html` como catálogo vivo que consuma la librería real, evitando estilos duplicados o inline cuando se pase a implementación.

Objetivo: permitir consistencia tipo Tailwind sin adoptar un framework utilitario completo ni perder los patrones propios de Pdei+.

### Estado recomendado

Separar al menos estas entidades:

- `SessionState`
- `UserProfile`
- `BankAccount`
- `InvestmentFund`
- `Movement`
- `Beneficiary`
- `Signatory`
- `AlertItem`

Estados operativos mínimos del mock:

- `active`
- `pending`
- `update`

## Información fuente

### Sistema visual
`/Users/javierbatres/Documents/Claude/Projects/FEIS/Pdei+ Componentes.html`

Debe definir:

- look and feel
- patrones de inputs
- botones
- cards
- pills
- iconografía
- espaciados

### Mock funcional
`/Users/javierbatres/Documents/Claude/Projects/FEIS/Pdei+ Web Mock.html`

Debe definir:

- composición de vistas
- estados
- navegación
- comportamiento esperado
- validaciones visibles
- relaciones entre subflujos

## Navegación

### Menú principal
Solo estas opciones deben existir en el sidebar:

- `Dashboard`
- `Mi Portafolio`
- `Movimientos`
- `Mi Perfil`

### Subflujos
No deben aparecer como opciones del sidebar. Deben abrirse desde acciones contextuales:

- `Detalle de Fondo`
- `Nuevo Fondo`
- `Nueva Inversión`
- `Confirmar Depósito`
- `Recompra`
- `Nueva Cuenta`
- `Gestionar Cuenta`
- `Titulares`
- `Beneficiarios`
- `Otros Firmantes`

### Reglas de navegación

- el `header` muestra el título de la vista actual
- los subflujos usan `Volver a ...` a la izquierda
- las acciones principales de un subflujo pueden vivir arriba a la derecha
- el sidebar siempre mantiene resaltado el flujo principal padre
- la navegación debe poder persistir al recargar

### Persistencia de vista
El mock ya usa una lógica tipo query param. La futura app debería soportar persistencia equivalente para:

- vista actual
- estado operativo
- fondo seleccionado
- cuenta seleccionada
- filtros relevantes

Ejemplo conceptual:

```txt
?view=portfolio&state=active&fund=fund-001
```

## Layout

### Shell autenticado

- sidebar fijo a la izquierda
- header fijo arriba
- main scrollable
- la sidebar ocupa toda la altura del viewport
- solo el contenido principal hace scroll

### Shell no autenticado

- login, 2FA, recuperación y registro no usan sidebar
- estas vistas deben ocupar alto completo

## Design Tokens

### Colores

- `--navy: #2B2B5E`
- `--navy-dark: #1e1e45`
- `--navy-mid: #35356e`
- `--aqua: #00CDE5`
- `--dark-aqua: #00798E`
- `--bg: #F4F6F9`
- `--bg-card: #FFFFFF`
- `--gray-lt: #EEF0F5`
- `--border: #DDE2EC`
- `--text: #1a1a2e`
- `--text-sec: #5a6478`
- `--text-lt: #8892A4`
- `--success: #22C55E`
- `--warning: #F59E0B`
- `--danger: #EF4444`
- `--info: #3B82F6`

### Radios

- `--radius-sm: 8px`
- `--radius-md: 12px`
- `--radius-lg: 16px`
- `--radius-btn: 14px`
- `--radius-pill: 20px`

### Sombra

- `--shadow-card: 0 2px 16px rgba(0,0,0,.07)`

## UI Contracts

### Tipografía

- sans legible y sobria
- jerarquía clara en títulos, KPIs y subtítulos
- labels pequeños y consistentes
- evitar estilos decorativos que compitan con el tono corporativo

### Botones

- `btn-primary`
  - CTA principal
  - color aqua
- `btn-outline`
  - secundaria neutra
- `btn-outline-aqua`
  - secundaria con énfasis
- `btn-danger`
  - acciones destructivas
- `icon-btn`
  - editar
  - navegación por chevron
  - menú contextual

Reglas:

- en cards y paneles, las acciones tienden a alinearse a la derecha
- en wizards, `Anterior` queda a la izquierda y `Continuar` a la derecha

### Inputs

Tipos base:

- `input`
- `select`
- `textarea`
- `input-prefix`

Reglas:

- montos capturados por usuario usan `input-prefix`
- teléfonos capturados por usuario usan `input-prefix`
- el prefijo nunca forma parte del valor validado
- campos monetarios deben usar:

```html
<input type="number" step="0.01">
```

### Password Inputs

- deben usar icono de ojo
- si el valor está oculto, mostrar `ojo`
- si el valor está visible, mostrar `ojo tachado`

### Cards

- son el patrón principal de agrupación
- deben ser consistentes en padding, radio y sombra
- usar `card-head` si existe título con acción contextual
- evitar layouts ambiguos si una card lo resuelve mejor

### Pills

Tipos base:

- `pill-success`
- `pill-warning`
- `pill-danger`
- `pill-info`
- `pill-neutral`

Reglas:

- ancho máximo según contenido
- no deben estirarse horizontalmente
- no deben crecer de alto por layout
- deben permanecer compactas

### Alertas

- usar alertas para bloqueos, pendientes y contexto operativo
- muchas necesidades de notificación ya quedan cubiertas por alertas dentro de la vista
- el header puede usar un panel de alertas agregado, no un módulo separado

### Avatares e icon badges

- siempre relación `1:1`
- nunca deformarse a óvalo
- usar tamaño fijo
- usar `flex: 0 0 auto`
- aplicar esto a:
  - avatar principal de usuario
  - avatares de titulares, beneficiarios y firmantes
  - iconos de fondos
  - badges numéricos de pasos

## Contratos de dinero

### Presentación

- símbolo y monto siempre en una sola línea
- reservar espacio para:
  - símbolo
  - espacio
  - 6 dígitos con separadores
  - 2 decimales
- usar números tabulares cuando sea posible

### Alineación

- en tablas: dinero a la derecha
- en filas y listados: dinero a la derecha
- en KPIs o cards con dato principal: dinero a la izquierda si el monto es el mensaje principal

### Inputs monetarios

- `type="number"`
- `step="0.01"`
- prefijo fuera del valor

## Contratos de composición por pantalla

### Dashboard

Debe incluir:

- saldo total
- KPIs secundarios
- acciones rápidas
- fondos destacados
- actividad reciente
- alertas operativas

Reglas:

- saldo total en una primera row
- KPIs secundarios en una segunda row
- acciones rápidas en grilla `2x2`
- fondos destacados con descripción línea por línea
- fondos destacados usan menú contextual, no múltiples botones visibles

### Mi Portafolio

Debe incluir:

- resumen por cuenta
- fondos por cuenta
- filtros
- acceso a detalle de fondo

Reglas:

- títulos internos no deben duplicar el título del header
- las filas deben tener columnas estables
- el acceso a detalle puede resolverse con chevron `>`
- el dinero siempre a la derecha en filas y tablas

### Detalle de Fondo

Debe funcionar como hub contextual del producto.

Debe incluir:

- resumen del fondo
- titulares relacionados
- beneficiarios
- otros firmantes
- últimos movimientos
- estado operativo

Reglas:

- `Volver al portafolio` a la izquierda
- `Nueva inversión` y `Solicitar recompra` arriba a la derecha
- `Confirmar depósito` solo cuando aplique
- beneficiarios, firmantes y movimientos viven en la columna principal
- edición contextual con icono de lápiz donde aplique

### Movimientos

Debe incluir:

- KPIs
- filtros
- tabla
- exportación simulada

Reglas:

- los KPIs deben multiplicarse por moneda, no usar un solo texto `multimoneda`
- si se usa `rango de fechas`, deben aparecer inputs `Desde` y `Hasta`
- exportar debe generar una salida contextual visible dentro del mock

### Mi Perfil

Debe incluir:

- datos personales
- datos de contacto
- perfil financiero
- cuentas bancarias

Reglas:

- no duplicar el título si ya está en el header
- `Editar datos` abre edición local
- `Solicitar ratificación` cambia el estado del expediente
- `Actualizar perfil financiero` permite editar y guardar

### Gestionar Cuenta

Debe incluir:

- información de la cuenta
- contexto operativo
- productos vinculados
- titulares
- beneficiarios
- otros firmantes

Reglas:

- `Editar cuenta` alineado a la derecha
- titulares, beneficiarios y firmantes deben mostrarse debajo de la información principal de la cuenta
- sus porcentajes o relaciones deben mostrar también el fondo cuando la relación pertenece a productos distintos

## Flujos implementados o esperados

### Acceso

- landing
- login
- 2FA
- recuperación
- contraseña vencida

Debe soportar:

- validación de campos
- correo recordado
- ver/ocultar contraseña
- credenciales inválidas
- acceso por estado

### Registro RF4

Wizard completo:

- T&C
- acceso
- instructivo
- datos personales
- bancos
- fondo inicial
- resultado

Reglas:

- navegación adelante y atrás
- validación por paso
- resumen previo de salida
- estados bloqueados visibles por reglas del negocio

### Nuevo Fondo RF9

Wizard con:

- cuenta y producto
- monto
- participantes
- resumen
- firma / salida

Validaciones visibles:

- cliente activo
- monto mínimo por producto
- límite visible del mock
- alias máximo
- beneficiarios en 100% al guardar distribución
- firmantes según reglas

### Confirmar Depósito RF13

- debe heredar contexto del fondo creado o inversión
- debe permitir adjuntar comprobante
- no debe confirmar sin archivo

### Nueva Inversión RF14-RF16

- nace desde detalle del fondo
- el producto llega preseleccionado
- el monto valida mínimo
- requiere medio o cuenta
- requiere fecha
- requiere comprobante
- requiere confirmación explícita

### Recompra RF17

- nace desde detalle del fondo
- valida saldo disponible
- permite parcial o total
- cuenta destino consistente con moneda

### Beneficiarios RF11

- agregar
- editar
- eliminar
- guardar distribución

Regla clave:

- `Guardar beneficiario` no obliga a 100%
- `Guardar distribución` sí exige exactamente `100%`

### Otros Firmantes RF12

- agregar
- editar
- eliminar
- revocar

Regla clave:

- si país de nacimiento y país de residencia son ambos distintos de Guatemala, no debe permitirse guardar

### Nueva Cuenta RF7

Wizard con:

- contexto
- cuenta
- cotitular
- resultado

Reglas:

- debe soportar cuenta principal
- debe soportar uso operativo
- debe bloquear duplicidad visible
- debe crear estado borrador dentro del mock

## Reglas de dominio

### Cuentas bancarias

- una sola cuenta puede ser principal
- una cuenta puede usarse para rendimientos y recompras
- `Agregar cuenta` es un subflujo, no una opción principal del menú

### Beneficiarios

- pertenecen al fondo, no a la cuenta global
- si en `Gestionar Cuenta` se agregan porcentajes de varios fondos, no deben leerse como un solo 100%

### Otros firmantes

- pertenecen al fondo, no a la cuenta global
- en vistas agregadas por cuenta debe mostrarse a qué fondo pertenece cada relación

### Fondos

- deben exponer estado operativo visible
- deben habilitar o bloquear acciones según su estado

## Alertas

La campana del header debe funcionar como panel agregado de alertas, no como módulo separado.

Debe mostrar al menos:

- cuenta pendiente de activación
- actualización requerida
- fondos pendientes de fondos
- fondos en verificación
- restricciones operativas relevantes

Cada alerta debe poder llevar a una vista relacionada.

## Accesibilidad

- la dirección del flujo debe reforzarse con acciones:
  - volver a la izquierda
  - continuar a la derecha
- los labels deben quedar alineados con sus campos
- inputs relacionados deben compartir baseline visual
- los iconos interactivos deben tener área clickeable suficiente
- no depender solo del color para comunicar estado

## Responsive

Aunque esta guía nace del mock web:

- el layout debe degradar correctamente en pantallas menores
- tablas complejas pueden pasar a cards apiladas
- las reglas visuales y de jerarquía deben mantenerse

## Alcance funcional actual del mock

- Acceso
- Registro RF4
- Dashboard RF5
- Mi Perfil
- Gestión de cuentas
- Mi Portafolio RF8
- Detalle de Fondo RF8
- Nuevo Fondo RF9
- Nueva Cuenta RF7
- Titulares RF10
- Beneficiarios RF11
- Otros Firmantes RF12
- Confirmar Depósito RF13
- Nueva Inversión RF14-RF16
- Recompra RF17
- Movimientos RF18
- Panel de alertas

## Referencias

- `/Users/javierbatres/Documents/Claude/Projects/FEIS/Pdei+ Componentes.html`
- `/Users/javierbatres/Documents/Claude/Projects/FEIS/Pdei+ Web Mock.html`
- `/Users/javierbatres/Documents/Claude/Projects/FEIS/Pdei+ Design System.md`
- DERCAS PDF del proyecto FEIS

## Preguntas abiertas para la futura implementación

- definir stack frontend
- definir estrategia de routing real
- definir estrategia de estado global
- definir contrato real con backend y validaciones server-side
- definir librería oficial de iconos
- definir si habrá sistema de diseño consumible o solo tokens + componentes internos
