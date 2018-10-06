import Vuex from "vuex";

const LANGS = ["en", "ja"];

const importsByLang = { en: {}, ja: {} };

const types = {
  INITIALIZE: "INITIALIZE"
};

const importAll = (resolve, lang) => {
  resolve.keys().forEach((key) => {
    const [_, work] = key.match(/\/(.+)\.md$/);
    importsByLang[lang][work] = resolve(key);
  });
};
importAll(require.context("~/contents/en/work", true, /\.md$/), "en");
importAll(require.context("~/contents/ja/work", true, /\.md$/), "ja");

const createStore = () => {
  return new Vuex.Store({
    strict: false,
    state: {
      locale: process.env.buildLocale,
      en: [],
      ja: []
    },
    actions: {
      initializeWorksFromAttributes ({ commit }) {
        LANGS.forEach((lang) => {
          const works = Object.keys(importsByLang[lang]).map((key) => {
            const frontmatter = importsByLang[lang][key];
            const attr = frontmatter.attributes;
            return {
              name: key,
              title: attr.title,
              year: attr.year,
              owner: attr.owner,
              colors: attr.colors,
              role: attr.role,
              cardAlt: attr.cardAlt,
              description: attr.description,
              related: attr.related,
              renderFunc: frontmatter.vue.render,
              staticRenderFuncs: frontmatter.vue.staticRenderFns,
              image: {
                main: attr.image && attr.image.main,
                og: attr.image && attr.image.og
              }
            };
          });
          commit(
            types.INITIALIZE,
            { works, lang }
          );
        });
      },
      async nuxtServerInit({ dispatch }) {
        dispatch("initializeWorksFromAttributes", {laughly: "laughly"});
      }
    },
    mutations: {
      [types.INITIALIZE](state, payload) {
        state[payload.lang] = payload.works;
      }
    }
  });
};
export default createStore;
