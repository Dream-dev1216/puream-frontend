<template>
  <div class="d-flex flex-column flex-grow-1">
    <div class="d-flex align-center py-3">
      <div class="display-1">Dashboard</div>
      <v-spacer></v-spacer>
      <v-btn color="primary" to="add" :append="true">
        Create New
      </v-btn>
    </div>

    <v-card>
      <v-data-table
        :headers="headers"
        :items="companies"
        class="flex-grow-1"
        hide-default-footer
        :loading="loadingCompanies"
      >
        <template v-slot:item.completed="{ item }">
          <div>{{ item.completed ? 'Completed' : 'Confirm' }}</div>
        </template>
        <template v-slot:item.action="{  }">
          <div class="actions">
            <v-btn icon>
              <v-icon small>mdi-pencil</v-icon>
            </v-btn>
            <v-btn icon>
              <v-icon small>mdi-delete</v-icon>
            </v-btn>
          </div>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
export default {
  data() {
    return {
      headers: [
        { text: 'Company Name', value: 'name' },
        { text: 'Completed', value: 'completed' },
        { text: 'Actions', sortable: false, align: 'right', value: 'action' }
      ]
    }
  },
  computed: {
    ...mapState({
      companies: (state) => state.companies.companies,
      loadingCompanies: (state) => state.companies.loadingCompanies
    })
  },
  mounted() {
    this.getCompanies()
  },
  methods: {
    ...mapActions({
      getCompanies: 'companies/getCompanies'
    })
  }
}
</script>
