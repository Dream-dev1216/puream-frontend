import api from '@/api.js'
export default {
  /**
  * Get subject
  *
  * @param {}
  * @example
  *
  *     getSubject()
  */
  getSubject(id) {
    return api.get(`/subjects/${id}`)
  },

  /**
  * Submit answer
  *
  * @param {}
  * @example
  *
  *     submitAnswer(data)
  */
  submitAnswer(data) {
    return api.post('/subjects/submit-answer', data)
  },

  /**
  * Get topics
  *
  * @param {}
  * @example
  *
  *     getTopics()
  */
  getTopics() {
    return api.get('/subjects/topics')
  },

  getStartingPoint() {
    return api.get('/subjects/starting-point')
  }
}