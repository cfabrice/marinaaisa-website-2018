---
name: 'blog-portfolio-usando-vue-nuxt-vuex'
title: Web personal con blog y portfolio usando Vue.js + Nuxt + Markdown
year: 11 Dec 2018
colors: '#5a46ff'
trans: 'blog-portfolio-using-vue-nuxt-vuex'
id: 'prueba-blog'
description: |
  ¡Holi! Soy @marinaaisa y te quiero contar cómo he creado mi nueva web con portfolio y blog. Qué tecnología he utilizado y por qué.
---

## ¿Por qué re-hice mi web con Nuxt?

Aunque algunos ya me conoceis, soy [Marina Aísa](https://twitter.com/MarinaAisa), UX Engineer (diseño y front-end) y actualmente trabajo en [Holaluz](https://www.holaluz.com).

El pasado año, 2018, estuve muy enfocada en aprender bien JavaScript, el cual era una asignatura pendiente que antes solo tocaba a través de librerias como jQuery. Al mismo tiempo, en Holaluz, empezamos a utilizar [Nuxt.js](https://nuxtjs.org/) un framework sobre [Vue.js](https://vuejs.org/) para rehacer tanto las webs estáticas como dinámicas (SPA) de la empresa en componentes y poder crear un sistema de diseño con ello.

Mi web anterior estaba hecha con [Middleman](https://middlemanapp.com/) un generador de páginas estáticas basado en Ruby, así que aproveché para rehacer mi web con Nuxt y Vue, con el fin de:
- Aprender
- Mejorar la performance
- Añadir funcionalidades a la web como un blog y sistema de portfolio
- Añadir dos idiomas, español y inglés, también en los posts del blog

Lo que más me atrae de Nuxt es la filosofía serverless (Nuxt también puede ser SSR pero no me interesaba) y el prerendering estático que proporciona a aplicaciones SPA. Resumidamente, con ello se puede combinar lo mejor de una web estática: HTML compilado lo que conlleva mejor SEO, más lo mejor de una single-page-application: webpack, optimizaciones de caché, lazy-loading y funciones y datos asíncronos.

## ¿Cómo?

Nuxt al ser un framework https://jamstack.org/ está muy orientado a obtener contenido mediante APIs como por ejemplo headless CMS, lo cual me parecían muy interesantes en el principio pero que no ví necesario para una web como la mía ya que los CMSs están orientados a que sean utilizados por personas sin conocimientos técnicos, además de ser caros, guardar los assets en sus propios servidores y no ser la mejor opción si quería tener la mejor performance.

Por ello, me decidí a utilizar un sistema de Markdowns que guardaría en Github y llamaría dinámicamente.


Mediante la función asíncrona asyncData que proporciona Nuxt solo en sus páginas (no es sus componentes) hago una importación de los markdown que tengo guardados en la carpeta <inline-code>content</inline-code> del proyecto, posteriormente los devuelvo en forma de una promesa de arrays de objetos. Como véis, la importación depende de "blogs" que será el array "blogsEs" o "blogsEn" dependiendo del que tenemos guardado en el store.


Los packages que utilizo para parsear los markdown con

Instalar packages

```javascript
async asyncData ({store}) {

  const blogsEs = ['nombre-del-post-1', 'nombre-del-post-2', 'nombre-del-post-2']
  const blogsEn = ['post-1-name', 'post-2-name', 'post-3-name']

  const blogs = store.state.i18n.locale === 'en' ? blogsEn : blogsEs
  
  async function asyncImport (blogName) {
    const wholeMD = await import(`~/content/${store.state.i18n.locale}/blog/${blogName}.md`)
    return wholeMD.attributes
  }

  return Promise.all(blogs.map(blog => asyncImport(blog)))
  .then((res) => {
    return {
      blogs: res
    }
  })
}
```

## Errores que cometí por el camino

Vuex