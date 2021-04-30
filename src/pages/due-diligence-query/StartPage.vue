<template>
  <div class="d-flex flex-column flex-grow-1">
    <div class="d-flex align-center py-3">
      <div class="display-1">Due Diligence Summary</div>
    </div>

    <v-row dense justify="center">
      <v-col cols="12" md="6">
        <div class="d-flex justify-space-between">
          
          <v-btn
            color="primary"
            :loading="loadingStartPoint"
            :disabled="loadingStartPoint"
            :to="'/due-diligence-query/'+startingPoint"
          >
            {{ startingPoint == 'summary' ? 'Review Submission' : 'Start/Resume' }}
          </v-btn>
          <v-btn
            v-if="myCompany && !myCompany.is_completed"
            color="success"
            :loading="loadingStartPoint"
            :disabled="loadingStartPoint"
            @click="onSubmitClicked"
          >
            Submit
          </v-btn>
        </div>

        <v-data-table
          ref="expandableTable"
          :headers="headers"
          :items="answers"
          :loading="loadingAnswers && loadingTopics"
          group-by="category_id"
          hide-default-footer
          :items-per-page="40"
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
              </div>
            </td>
          </template>

          <template v-slot:item.actions="{ item }">
            <v-btn
              v-if="myCompany && !myCompany.is_completed"
              small
              outlined
              fab
              color="indigo"
              @click="editItem(item)"
            >
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
          </template>
          <template #item.upload="{ value }">
            <a v-if="value" :href="`${value}`" target="_blank">
              See Attachment
            </a>
          </template>
        </v-data-table>
        
        <div class="d-flex flex-row-reverse">
          <v-btn
            v-if="myCompany && !myCompany.is_completed"
            color="success"
            :loading="loadingStartPoint"
            :disabled="loadingStartPoint"
            @click="onSubmitClicked"
          >
            Submit
          </v-btn>
        </div>
      </v-col>
    </v-row>
    <v-dialog
      v-model="completeDialog"
      width="500"
    >
      <v-card>
        <v-card-title class="grey lighten-2">
          Confirm
        </v-card-title>

        <v-card-text>
          <div class="text-center py-2">Are you sure?</div>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            text
            @click="completeDialog = false"
          >
            Cancel
          </v-btn>
          <v-btn
            color="primary"
            @click="submitAll"
          >
            Complete
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import { router } from 'vue'

export default {
  data() {
    return {
      headers: [
        { text: '', align: 'left', value: 'subject_name', sortable: false },
        { text: '', align: 'left', value: 'yes_no', sortable: false },
        { text: '', align: 'left', value: 'upload', sortable: false },
        { text: '', align: 'left', value: 'comment', sortable: false },
        { text: '', align: 'left', value: 'category_id', sortable: false },
        { text: '', value: 'actions', sortable: false }
      ],
      expanded: [],
      dataReady: false,
      completeDialog: false
    }
  },
  computed: {
    ...mapState({
      user: (state) => state.auth.user,
      myCompany: (state) => state.companies.company,
      startingPoint: (state) => state.subjects.startingPoint,
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
    await this.getCompany(this.user.company_id)
    await this.getStartingPoint()
    this.collapseAll()
    this.dataReady = true
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
    editItem(item) {
      this.$router.push('due-diligence-query/' + item.subject_id)
    },
    submitAll() {
      this.completeDialog = false
      this.submitCompany(this.user.company_id)
    },
    ...mapActions('subjects', ['getTopics', 'getStartingPoint', 'getAnswers']),
    ...mapActions('companies', ['getCompany', 'submitCompany']),

    onSubmitClicked(item) {
      this.completeDialog = true
    }
  }
}
</script>
