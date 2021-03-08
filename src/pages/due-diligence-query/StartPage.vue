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
          :items="topics"
          class="mt-1 elevation-1"
          hide-default-footer
          :loading="loadingTopics"
        >
          <template v-slot:item.completed="{ item }">
            <v-chip
              v-if="item.completed"
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
        { text: 'Topic', value: 'name', sortable: false },
        { text: 'Complete/Incomplete', value: 'completed', sortable: false, align: 'right' }
      ]
    }
  },
  computed: {
    ...mapState({
      topics: (state) => state.subjects.topics,
      loadingTopics: (state) => state.subjects.loadingTopics,
      loadingStartPoint: (state) => state.subjects.loadingStartPoint
    })
  },
  mounted() {
    this.getTopics()
  },
  methods: {
    ...mapActions('subjects', ['getTopics', 'getStartingPoint'])
  }
}
</script>
