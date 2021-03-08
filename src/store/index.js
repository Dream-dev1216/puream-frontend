import Vue from 'vue'
import Vuex from 'vuex'

// Global vuex
import AppModule from './app'
import auth from './auth'
import companies from './companies'
import subjects from './subjects'

Vue.use(Vuex)

/**
 * Main Vuex Store
 */
const store = new Vuex.Store({
  modules: {
    app: AppModule,
    auth,
    companies,
    subjects
  }
})

export default store
