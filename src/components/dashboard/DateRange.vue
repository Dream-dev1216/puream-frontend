<template>
  <div>
    <v-menu
      v-model="menu"
      :close-on-content-click="false"
      :nudge-width="200"
      offset-y
      left
      transition="slide-x-reverse-transition"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="primary"
          text
          v-bind="attrs"
          v-on="on"
        >
          <v-icon left>mdi-clock</v-icon>
          {{ optionLabel }}
        </v-btn>
      </template>

      <v-card>
        <v-card-text>
          <v-chip-group
            id="date-range-options"
            v-model="optionId"
            color="primary"
          >
            <v-chip
              v-for="(option, i) in dateOptions"
              :key="i"
              filter
              :value="option.id"
              outlined
            >
              {{ option.text }}
            </v-chip>
          </v-chip-group>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            text
            @click="menu = false"
          >
            Cancel
          </v-btn>
          <v-btn
            color="primary"
            @click="menu = false"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-menu>
  </div>
</template>
<script>
import { mapState } from 'vuex'

export default {
  props: {
  },
  data () {
    return {
      menu: false
    }
  },
  computed: {
    ...mapState('bytesUsage', ['optionId', 'dateOptions']),
    optionLabel() {
      const option = this.dateOptions.find((option) => option.id === this.optionId)

      return option ? option.text : ''
    }
  },
  methods: {
    dlgBtnClicked() {
      this.$emit('close')
    },
    apply() {
      this.$emit('submit', {
        timeRangeOption: this.locTimeRangeOption,
        dateFrom: this.locDateFrom,
        dateTo: this.locDateTo,
        timeFrom: this.locTimeFrom,
        timeTo: this.locTimeTo
      })
    }
  }
}
</script>
<style>
  #date-range-options .v-slide-group__content {
    display: flex;
    flex-direction: column;
  }
</style>