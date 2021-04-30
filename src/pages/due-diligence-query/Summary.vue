<template>
  <div class="d-flex flex-column flex-grow-1">
    <div class="display-1 my-2">
      <v-btn
        color="success"
        :loading="loadingStartPoint"
        :disabled="!myCompany || myCompany.is_completed || loadingStartPoint"
        @click="onSubmitClicked"
      >
        Submit
      </v-btn>
      <router-link to="/">
        <v-btn
          class="ml-3"
          color="primary"
        >
          Back
        </v-btn>
      </router-link>
    </div>

    <summary-table
      :loading="loadingAnswers"
      title="Due Diligence Summary"
      :answers="answers"
    >
    </summary-table>

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
import SummaryTable from '../../components/SummaryTable'

export default {
  components: {
    SummaryTable
  },

  data() {
    return {
      headers: [
        { text: 'Topic', value: 'name' },
        { text: 'Actions', sortable: false, align: 'right', value: 'action' }
      ],
      completeDialog: false
    }
  },

  computed: {
    ...mapState({
      user: (state) => state.auth.user,
      answers: (state) => state.subjects.answers,
      loadingAnswers: (state) => state.subjects.loadingAnswers,
      myCompany: (state) => state.companies.company,
      loadingStartPoint: (state) => state.subjects.loadingStartPoint
    })
  },

  async mounted() {
    this.getAnswers()
    await this.getCompany(this.user.company_id)
  },

  methods: {
    ...mapActions({
      getAnswers: 'subjects/getAnswers'
    }),

    ...mapActions('companies', ['submitCompany', 'getCompany']),

    submitAll() {
      this.completeDialog = false
      this.submitCompany(this.user.company_id)
    },

    onSubmitClicked(item) {
      this.completeDialog = true
    }
  }
}
</script>
