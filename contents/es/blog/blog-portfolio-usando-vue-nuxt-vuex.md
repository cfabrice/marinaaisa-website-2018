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

Lo que más me atrae de Nuxt es la filosofía serverless (Nuxt también puede ser SSR pero no lo creo necesario para mi web) y el prerendering estático que proporciona a aplicaciones SPA. Resumidamente, con ello se puede combinar lo mejor de una web estática: HTML compilado -> lo que conlleva mejor SEO, más lo mejor de una *single page application*: Webpack, optimizaciones de caché, lazy-loading y funciones y datos asíncronos.

## ¿De dónde saco el contenido si no tengo servidor?

Nuxt al seguir la arquitectura [JAMStack](https://jamstack.org/) está construido para obtener contenido mediante APIs, por ello muchas personas utilizan headless CMSs como [Contentful](https://www.contentful.com/) o [Prismic](https://prismic.io/). Me parecían opciones interesantes en un principio pero me dí cuenta que no era necesario para una web como la mía ya que los CMSs están orientados para ser utilizados por personas sin conocimientos técnicos, además de ser caros, guardar los assets en sus propios servidores y no ser la mejor opción si quería tener la mejor performance.

**Por ello, me decidí a utilizar un sistema de Markdowns que guardaría en Github y llamaría dinámicamente.**

### Importación de los artículos en la página principal dependiendo del idioma

Mediante la función asíncrona <inline-code>asyncData</inline-code> que proporciona Nuxt solo en sus páginas (no es sus componentes) hago una importación de los markdown que tengo guardados en la carpeta <inline-code>content</inline-code> del proyecto. Posteriormente los devuelvo en forma de promesa como un array de objetos. Como puedes ver a continuación, la importación depende de la constante <inline-code>blogs</inline-code> que será el array <inline-code>blogsEs</inline-code> o <inline-code>blogsEn</inline-code> dependiendo del idioma de la página.

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

### Generación de páginas dinámicas a partir de archivos markdown

Nuxt tiene una funcionalidad muy interesante y es la creación de [rutas dinámicas](https://nuxtjs.org/guide/routing/#dynamic-routes).

En la siguiente importación vuelvo a utilizar <inline-code>asyncData</inline-code> en vez de <inline-code>data</inline-code> como suele hacerse en Vue, para primero importar cada markdown y después devolver un nuevo objeto con la información que quiero utilizar en el template de la página.
**En la importación juego con que la URL es igual al nombre de cada archivo markdown.** 
En el caso de que el archivo md no exista simplemente irá a la página 404.

```javascript
async asyncData ({params, store}) {
  const fileContent = await import(`~/contents/${store.state.i18n.locale}/blog/${params.slug}.md`)
  const attr = fileContent.attributes
  return {
    colors: attr.colors,
    date: attr.date,
    description: attr.description,
    id: attr.id,
    name: params.slug,
    related: attr.related,
    renderFunc: fileContent.vue.render,
    staticRenderFuncs: fileContent.vue.staticRenderFns,
    title: attr.title,
    urlTranslation: attr.urlTranslation
  }
}
```

El loader para archivos Markdown de Webpack que utilizo es: [frontmatter-markdown-loader](https://www.npmjs.com/package/frontmatter-markdown-loader) que me permite meter componentes de Vue dentro de markdown, así como extraer los atributos <inline-code>frontmatter</inline-code> como hacen generadores estáticos como Jekyll. Y para que el código se vea así de bonito cuando lo pongo en markdown: [HighlightJS](https://highlightjs.org/)

## Hablemos de performance

¿Recuerdas que antes te he hablado que una de mis motivaciones para crear esta web era tener un blog que tuviera una buena performance?
Con Nuxt lo he conseguido, y aún me queda bastante por optimizar.

Si has llegado hasta aquí seguramente habrás pensado: *"Vaya percal ha montado Marina, si total podía haber hecho un blog en Medium y ya está"* y justo ahora vas a entender por qué no me gusta Medium.

Además de que escribiendo en Medium **no tienes el control sobre tu blog** como CSS, SEO, añadir funcionalidades, el contenido **lo cedes a Medium**, tiene limitación de artículos leídos... encima, **tienen una performance de mierda.**

Gracias a la herramienta [Lighthouse](https://developers.google.com/web/fundamentals/performance/audit/) de Google podemos analizar y comparar Medium con mi web.

<image-responsive
    imageURL="performance.jpg"
    :width="'952'"
    :height="'509'"
    alt="performance" />

Como veis Medium hace muchas cosas bien pero la performance no es una de ellas. Esto se traduce en experiencia de usuario como una carga muy lenta, sobre todo en dispositivos móviles. **Porque sí, la performance es experiencia de usuario.** Ya hablaremos más de ello otro día.
Lo interesante aquí es que con Nuxt he conseguido llegar a un **94%** de performance frente a un 40% que ofrece Medium en la primera carga, pero lo mejor es que al utilizar sistemas de caché, **la segunda vez que entres en mi web la performance es de 100%** mientras que Medium es del 60%.

## Web en inglés y español

Para traducir la web en los dos idiomas utilizo, 

## Funcionalidades que quiero añadir en el futuro

Critico mucho Medium pero en verdad me gusta, y de hecho quiero añadir su famoso *"clap"*

## Cosas de la web que os contaré otro día

- Lazy loading de componentes e imágenes en Vue
- El gran error que cometí en el camino: Vuex

*English version coming soon*

## Resumen

Aquí te dejo el código total de mi web pero ten en cuenta que es mi primer proyecto con Nuxt y Vue en solitario y que sé que tengo que limpiar bastante el CSS cuando tenga tiempo.