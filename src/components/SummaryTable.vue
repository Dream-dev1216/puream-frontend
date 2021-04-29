<template>
  <div class="d-flex flex-column flex-grow-1">
    <div class="display-1 my-2">{{ title }}</div>
    <v-card>
      <v-card-text>
        <v-data-table
          :headers="headers"
          :items="answers"
          :loading="loading"
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
              </div>
            </td>
          </template>

          <template v-slot:item.upload="{ item }">
            <p v-for="(link, index) in item.upload" :key="index">
              <a :href="link">{{link}}</a>
            </p>
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
export default {
  props: {
    loading: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    },
    answers: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      headers: [
        { text: 'Subject', align: 'left', value: 'subject_name', sortable: false },
        { text: 'Yes/No', align: 'left', value: 'yes_no', sortable: false },
        { text: 'Upload', align: 'left', value: 'upload', sortable: false },
        { text: 'Comment', align: 'left', value: 'comment', sortable: false },
        { text: 'Category', align: 'left', value: 'category_id', sortable: false }
      ]
    }
  },
  computed: {
  },

  mounted() {
  },
  
  methods: {
    categoryName(category_id) {
      const answer = this.answers.find((a) => a.category_id === category_id)

      return answer ? answer.category_name : ''
    }
  }
}
</script>
