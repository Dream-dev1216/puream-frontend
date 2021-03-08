import subjectAPI from '../../services/api/subject'
import router from '../../router'

const module = {
  namespaced: true,
  state: {
    loadingSubject: false,
    submittingAnswer: false,

    subject: null,

    loadingTopics: false,
    topics: [],

    loadingStartPoint: false
  },

  actions: {
    async getSubject({
      commit
    }, id) {
      commit('SET_LOADING_SUBJECT', true)
      try {
        const response = await subjectAPI.getSubject(id)

        commit('SET_SUBJECT', response.data.subject)
      } catch (error) {
        console.log(error.response)
      } finally {
        commit('SET_LOADING_SUBJECT', false)
      }
    },

    async submitAnswer({
      commit
    }, payload) {
      commit('SET_SUBMITTING_ANSWER', true)
      try {
        const response = await subjectAPI.submitAnswer(payload)

        commit('SET_SUBJECT', response.data.subject)

        router.push({
          name: 'due-diligence-query',
          params: {
            id: response.data.subject.id
          }
        })
      } catch (error) {
        console.log(error.response)
      } finally {
        commit('SET_SUBMITTING_ANSWER', false)
      }
    },

    async getTopics({
      commit
    }) {
      commit('SET_LOADING_TOPICS', true)
      try {
        const response = await subjectAPI.getTopics()

        commit('SET_TOPICS', response.data.categories)
      } catch (error) {
        console.log(error.response)
      } finally {
        commit('SET_LOADING_TOPICS', false)
      }
    },

    async getStartingPoint({
      commit
    }) {
      commit('SET_LOADING_START', true)
      try {
        const response = await subjectAPI.getStartingPoint()

        router.push({
          name: 'due-diligence-query',
          params: {
            id: response.data.subject_id
          }
        })
      } catch (error) {
        console.log(error.response)
      } finally {
        commit('SET_LOADING_START', false)
      }
    }
  },

  mutations: {
    SET_LOADING_SUBJECT(state, loading) {
      state.loadingSubject = loading
    },

    SET_SUBMITTING_ANSWER(state, loading) {
      state.submittingAnswer = loading
    },

    SET_SUBJECT(state, subject) {
      state.subject = subject
    },

    SET_LOADING_TOPICS(state, loading) {
      state.loadingTopics = loading
    },

    SET_TOPICS(state, topics) {
      state.topics = topics
    },

    SET_LOADING_START(state, loading) {
      state.loadingStartPoint = loading
    }
  }
}

export default module