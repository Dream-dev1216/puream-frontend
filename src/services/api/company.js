import api from '@/api.js'
export default {
  /**
  * Get companies
  *
  * @param {}
  * @example
  *
  *     getCompanies()
  */
  getCompanies() {
    return api.get('/companies')
  },

  /**
  * Get company
  *
  * @param {}
  * @example
  *
  *     getCompany()
  */
  getCompany(id) {
    return api.get(`/companies/${id}`)
  },

  /**
  * Create a new company
  *
  * @param {Object}
  * @example
  *
  *     createCompany({
  *       name: 'Company Name'
  *     })
  */
  createCompany(payload) {
    return api.post('/companies', payload)
  },

  /**
  * Create a new company
  *
  * @param {Object}
  * @example
  *
  *     updateCompany({
  *       name: 'Company Name'
  *     })
  */
  updateCompany(payload) {
    return api.put(`/companies/${payload.id}`, payload)
  }
}