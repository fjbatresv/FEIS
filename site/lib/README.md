# Pdei+ UI Library

Importa los archivos en tu plantilla HTML, PHP o Livewire:

```html
<link rel="stylesheet" href="lib/pdei.min.css">
<link rel="stylesheet" href="lib/icons/pdei-icons.min.css">
<script src="lib/pdei.min.js" defer></script>
```

Node/npm solo se usa para construir este directorio. El runtime final es CSS, JS, fuentes, logos e iconos locales.

## Logos

Usa clases de logo para evitar depender de nombres con espacios:

```html
<span class="pdei-logo logo-white logo-lg" role="img" aria-label="Pdei+"></span>
<span class="pdei-logo logo-navy logo-lg" role="img" aria-label="Pdei+"></span>
<span class="pdei-logo isotype-white logo-sm" role="img" aria-label="Pdei+"></span>
<span class="pdei-logo isotype-navy logo-lg" role="img" aria-label="Pdei+"></span>
```

Tamanos disponibles: `logo-sm`, `logo-md`, `logo-lg`, `logo-xl`.

## Toasts

```html
<script>
  Pdei.showToast("Guardado.", { position: "top-right" });
</script>
```

Posiciones: `top-right`, `top-left`, `top-center`, `bottom-right`, `bottom-left`, `bottom-center`.

## Iconos

Los iconos vienen de Lucide en formato icon font local:

```html
<i class="pdei-icon pdei-icon-wallet"></i>
<i class="pdei-icon pdei-icon-alert-triangle"></i>
```

Convencion: `pdei-icon pdei-icon-{nombre-lucide-en-kebab-case}`.
El listado completo queda en `lib/icons/codepoints.json`.
