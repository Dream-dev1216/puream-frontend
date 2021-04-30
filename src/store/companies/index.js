import companyAPI from '../../services/api/company'
import router from '../../router'

const module = {
  namespaced: true,
  state: {
    loadingCompanies: false,

    error: null,

    data: [],
    companies: [],
    company: null
  },

  actions: {
    async getCompanies({
      commit
    }) {
      commit('SET_LOADING_COMPANIES', true)
      try {
        const response = await companyAPI.getCompanies()

        commit('SET_COMPANIES', response.data.companies)
      } catch (error) {
        console.log(error.response)
      } finally {
        commit('SET_LOADING_COMPANIES', false)
      }
    },

    async getCompany({
      commit
    }, id) {
      try {
        const response = await companyAPI.getCompany(id)

        commit('SET_COMPANY', response.data.company)
      } catch (error) {
        throw new Error(err)
      }
    },

    async createCompany({
      commit, dispatch
    }, payload) {
      commit('SET_LOADING_COMPANIES', true)
      try {
        const response = await companyAPI.createCompany(payload)

        dispatch('app/showSuccess', response.data, { root: true })
      } catch (err) {
        throw new Error(err)
      } finally {
        commit('SET_LOADING_COMPANIES', false)
      }
    },

    async updateCompany({ commit, dispatch }, payload) {
      try {
        const response = await companyAPI.updateCompany(payload)

        commit('auth/SET_AUTH_COMPANY', response.data.data, { root: true })

        dispatch('app/showSuccess', 'Due diligence successfully submitted', { root: true })
      } catch (error) {
        dispatch('app/showError', 'Due diligence Submition failed.', { root: true })

        console.log(error)
      }
    },

    async deleteCompany({ commit, dispatch }, id) {
      try {
        const response = await companyAPI.deleteCompany(id)

        return response
      } catch (error) {
        throw new Error(error)
      }
    },

    async submitCompany({ commit, state, dispatch }, id) {
      try {
        const response = await companyAPI.submitCompany(id)

        commit('SET_COMPANY', { ...state.company, is_completed: 1 })
        dispatch('app/showSuccess', 'Due diligence successfully submitted.', { root: true })
      } catch (error) {
        dispatch('app/showError', 'Due diligence Submition failed.', { root: true })
        throw new Error(error)
      }
    }
  },

  mutations: {
    SET_ERROR(state, error) {
      state.error = error.error
    },
    CLEAR_ERROR(state) {
      state.error = null
    },

    SET_LOADING_COMPANIES(state, loading) {
      state.loadingCompanies = loading
    },

    SET_COMPANIES(state, companies) {
      state.companies = companies
    },

    SET_COMPANY(state, company) {
      state.company = company
    }
  },

  getters: {
    companyName: (state) => (companyId) => {
      const company = state.companies.find((company) => companyId === company.id)

      return company ? company.name : 'Not Assigned'
    }
  }
}

export default module