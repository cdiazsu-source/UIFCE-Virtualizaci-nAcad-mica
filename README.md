# Área de Virtualización · UIFCE

Página web de empalme del **Área de Virtualización** de la Unidad de Informática de la Facultad de Ciencias Económicas (UIFCE) — Universidad Nacional de Colombia.

Reúne en un solo lugar lo que se ha trabajado y se trabaja en el área, para que cada nuevo equipo de monitores pueda empalmar rápido: proyectos con acceso directo a sus recursos, empalme de Genially, herramientas e IA recomendadas, kit de marca (logos y Uifcito) y guías.

## 🚀 Cómo verla

Abre `index.html` en cualquier navegador (doble clic). No requiere servidor ni instalación: es HTML, CSS y JavaScript puro.

## ✏️ Cómo actualizar el contenido

Todo el contenido editable vive en **`data.js`** — el único archivo que necesitas tocar. Tiene instrucciones al inicio. Para conectar un enlace, solo pega la URL entre comillas:

```js
enlaces: {
  drive: "https://drive.google.com/...",   // <- tu enlace aquí
}
```

Si un enlace queda vacío `""`, el botón se oculta o se muestra como "pendiente" — la página nunca se ve rota.

## 📁 Estructura

```
index.html     Estructura y secciones
style.css      Identidad visual UIFCE
script.js      Renderiza el sitio desde data.js (no requiere edición)
data.js        ⭐ Contenido editable (proyectos, enlaces, herramientas, guías)
assets/
  logos/         Logos UIFCE (variantes)
  uifcito/        Mascota Uifcito (expresiones y animaciones)
  institucional/   Franja institucional (Facultad + UNAL)
```

## 🎨 Secciones

- **Inicio** — bienvenida con Uifcito
- **Proyectos** — tarjetas con estado, encargado y enlaces a recursos
- **Empalme Genially** — resumen del manual + recursos ya creados
- **Herramientas e IA** — organizadas por tarea
- **Recursos de marca** — logos, expresiones de Uifcito, tipografía y paleta
- **Guías y plantillas** — manuales y plantillas maestras

## 🌐 Publicar en la web (GitHub Pages)

En el repositorio: **Settings → Pages → Branch: `main` → `/root` → Save**. En unos minutos queda disponible en `https://<usuario>.github.io/<repo>/`.

---

> Nota: la carpeta fuente del semestre (videos, archivos `.story`, `.docx`) no está en este repositorio por su tamaño; se conserva en Drive.
