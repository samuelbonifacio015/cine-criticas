# Sistema de Reseñas de Películas y Series

Una aplicación web moderna para gestionar y compartir reseñas de películas y series, construida con React y TypeScript.

## 🚀 Características

- 📝 Crear y editar reseñas de películas y series
- ⭐ Sistema de calificación con estrellas
- 🏷️ Gestión de etiquetas para categorizar contenido
- 🖼️ Vista previa de imágenes
- 🔍 Búsqueda y filtrado de reseñas
- 📱 Diseño responsive
- 🌙 Modo oscuro

## 🛠️ Tecnologías Utilizadas

### Frontend

- **React**: Biblioteca JavaScript para construir interfaces de usuario
- **TypeScript**: Superset tipado de JavaScript
- **Vite**: Herramienta de construcción rápida
- **Tailwind CSS**: Framework CSS utilitario
- **shadcn/ui**: Componentes de UI reutilizables
- **Lucide React**: Biblioteca de iconos
- **React Hook Form**: Gestión de formularios
- **Zod**: Validación de esquemas
- **React Router**: Enrutamiento de la aplicación

### Estructura del Proyecto

```
src/
├── components/         # Componentes reutilizables
├── pages/             # Páginas de la aplicación
├── services/          # Servicios y lógica de negocio
├── types/             # Definiciones de tipos TypeScript
├── utils/             # Utilidades y helpers
└── App.tsx            # Componente raíz
```

## 📦 Instalación

1. Clona el repositorio:

```bash
git clone [URL_DEL_REPOSITORIO]
```

2. Instala las dependencias:

```bash
npm install
```

3. Inicia el servidor de desarrollo:

```bash
npm run dev
```

## 🎨 Componentes Principales

### ReviewForm

Formulario para crear y editar reseñas con:

- Campos para título, tipo (película/serie), director, año
- Calificación con estrellas
- Campo de reseña con texto enriquecido
- Gestión de imágenes con vista previa
- Sistema de etiquetas interactivo

### ReviewCard

Tarjeta que muestra:

- Imagen de la película/serie
- Título y tipo
- Calificación con estrellas
- Información adicional (director, año)
- Etiquetas
- Botones de acción (editar, eliminar)

### ReviewModal

Modal para ver detalles completos de una reseña:

- Vista ampliada de la imagen
- Información detallada
- Sistema de calificación
- Etiquetas
- Opciones de edición y eliminación

## 🔍 Funcionalidades de Búsqueda

- Búsqueda por título, director o contenido
- Filtrado por tipo (películas/series)
- Búsqueda por etiquetas
- Resultados en tiempo real

## 🎯 Próximas Mejoras

- [ ] Autenticación de usuarios
- [ ] Sistema de comentarios
- [ ] Compartir reseñas en redes sociales
- [ ] Integración con APIs de películas/series
- [ ] Sistema de recomendaciones
- [ ] Exportación de reseñas

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor, abre un issue para discutir los cambios propuestos.

## 📧 Contacto

Para cualquier consulta o sugerencia, por favor contacta a [samuelbonifacio015@gmail.com].
