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

    loadingStartPoint: false,
    startingPoint: '',

    answers: [],
    loadingAnswers: false
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

        if (response.data.completed) {
          router.push({
            name: 'due-diligence-query-summary'
          })
        } else {
          router.push({
            name: 'due-diligence-query',
            params: {
              id: response.data.subject.id
            }
          })
        }
      } catch (error) {
        console.log(error.response)
      } finally {
        commit('SET_SUBMITTING_ANSWER', false)
      }
    },

    async saveAndReturnLatern({
      commit
    }, payload) {
      try {
        // const response = await subjectAPI.submitAnswer(payload)

        // commit('SET_SUBJECT', response.data.subject)

        router.push({
          name: 'start-query'
        })
      } catch (error) {
        console.log(error.response)
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

    async getAllTopics({
      commit
    }) {
      commit('SET_LOADING_TOPICS', true)
      try {
        const response = await subjectAPI.getAllTopics()

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

        if (response.data.completed) {
          commit('SET_STARTING_POINT', 'summary')
        } else {
          commit('SET_STARTING_POINT', response.data.subject_id)
        }
      } catch (error) {
        console.log(error.response)
      } finally {
        commit('SET_LOADING_START', false)
      }
    },

    async getAnswers({
      commit
    }) {
      commit('SET_LOADING_ANSWERS', true)
      try {
        const response = await subjectAPI.getAnswers()

        commit('SET_ANSWERS', response.data.answers)
      } catch (error) {
        console.log(error.response)
      } finally {
        commit('SET_LOADING_ANSWERS', false)
      }
    },

    async getCompanyAnswers({
      commit
    }, id) {
      commit('SET_LOADING_ANSWERS', true)
      try {
        const response = await subjectAPI.getCompanyAnswers(id)

        commit('SET_ANSWERS', response.data.answers)
      } catch (error) {
        console.log(error.response)
      } finally {
        commit('SET_LOADING_ANSWERS', false)
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
    },

    SET_LOADING_ANSWERS(state, loading) {
      state.loadingAnswers = loading
    },

    SET_ANSWERS(state, answers) {
      state.answers = answers
    },

    SET_STARTING_POINT(state, id) {
      state.startingPoint = id
    }
  }
}

export default module