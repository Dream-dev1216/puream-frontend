<template>
  <div class="d-flex flex-column flex-grow-1">
    <div class="d-flex align-center py-3">
      <div class="display-1">Due Diligence Summary</div>
    </div>

    <v-row dense justify="center">
      <v-col cols="12" md="6">
        <div class="d-flex align-center">
          <v-btn
            color="primary"
            @click="getStartingPoint"
            :loading="loadingStartPoint"
            :disabled="loadingStartPoint"
          >
            Start/Resume
          </v-btn>
        </div>

        <v-data-table
          :headers="headers"
          :items="answers"
          :loading="loadingAnswers && loadingTopics"
          group-by="category_id"
          show-group-by
          hide-default-footer
          :items-per-page="40"
          ref="expandableTable"
        >
          <template v-slot:group.header="{ group, headers, toggle, isOpen }">
            <td :colspan="headers.length">
              <div class="d-flex align-center">
                <v-btn @click="toggle" icon :ref="group">
                  <v-icon v-if="isOpen">mdi-chevron-down</v-icon>
                  <v-icon v-else>mdi-chevron-up</v-icon>
                </v-btn>
                <span class="mx-2 font-weight-bold">{{ categoryName(group) }}</span>
                <v-spacer></v-spacer>
                <v-chip
                  v-if="isCompleted(group)"
                  class="ma-2"
                  small
                  color="green"
                  outlined
                  style="width: 110px;"
                >
                  <v-icon left>
                    mdi-check
                  </v-icon>
                  Complete
                </v-chip>
                <v-chip
                  v-else
                  class="ma-2"
                  small
                  color="grey"
                  style="width: 110px;"
                  outlined
                >
                  <v-icon left>
                    mdi-minus
                  </v-icon>
                  Incomplete
                </v-chip>
                <v-btn icon>
                  <v-icon>
                    mdi-pencil
                  </v-icon>
                </v-btn>
              </div>
            </td>
          </template>
          <template #item.upload="{ value }">
            <a v-if="value" :href="`${value}`" target="_blank">
              See Attachment
            </a>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  data() {
    return {
      headers: [
        { text: 'Subject', align: 'left', value: 'subject_name', sortable: false },
        { text: 'Yes/No', align: 'left', value: 'yes_no', sortable: false },
        { text: 'Upload', align: 'left', value: 'upload', sortable: false },
        { text: 'Comment', align: 'left', value: 'comment', sortable: false },
        { text: 'Category', align: 'left', value: 'category_id', sortable: false }
      ],
      expanded: [],
      dataReady: false
    }
  },
  computed: {
    ...mapState({
      topics: (state) => state.subjects.topics,
      answers: (state) => state.subjects.answers,
      loadingAnswers: (state) => state.subjects.loadingAnswers,
      loadingTopics: (state) => state.subjects.loadingTopics,
      loadingStartPoint: (state) => state.subjects.loadingStartPoint
    })
  },
  async mounted() {
    await this.getTopics()
    await this.getAnswers()
    this.dataReady = true
    this.collapseAll()
  },
  methods: {
    collapseAll() {

      for (const name of Object.keys(this.$refs.expandableTable.openCache)) {
        
        this.$refs.expandableTable.openCache[name] = false
      }
    },
    categoryName(category_id) {
      const answer = this.answers.find((a) => a.category_id === category_id)

      return answer ? answer.category_name : ''
    },
    isCompleted(category_id) {
      const answer = this.topics.find((a) => a.id === category_id)

      return answer ? answer.completed : ''
    },
    ...mapActions('subjects', ['getTopics', 'getStartingPoint', 'getAnswers'])
  }
}
</script>
