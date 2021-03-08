<template>
  <div class="flex-grow-1">
    <div class="d-flex flex-column flex-sm-row">
      <v-overlay :value="loadingSubject">
        <v-progress-circular
          indeterminate
          size="64"
        ></v-progress-circular>
      </v-overlay>
      <v-row v-if="!loadingSubject && subject" dense justify="center" class="py-4 mt-2">
        <v-col cols="12">
          <v-slider
            :value="10"
            ticks="always"
            readonly
            thumb-label="always"
            track-color="grey"
            :max="31"
            :height="30"
          >
            <template v-slot:thumb-label="{ value }">
              {{ value }}%
            </template>
          </v-slider>
        </v-col>
        <v-col cols="12" md="6">
          <v-card class="mt-4">
            <v-card-text>
              <div class="display-1 my-2">{{ subject.subject }}</div>
              <v-form ref="form" v-model="isFormValid" lazy-validation @submit.prevent="">
                <template v-if="subject.yes_no">
                  <div>{{ subject.yes_no_question }}</div>
                  <v-radio-group
                    v-model="form.yes_no"
                    row
                    :rules="[$rules.required]"
                  >
                    <v-radio
                      label="Yes"
                      value="yes"
                    ></v-radio>
                    <v-radio
                      label="No"
                      value="no"
                    ></v-radio>
                  </v-radio-group>
                </template>

                <template v-if="visibleUpload">
                  <div class="my-2">{{ subject.upload_title }}</div>
                  <v-file-input
                    v-model="form.fileInput"
                    placeholder="Upload a file"
                    outlined
                    dense
                    :rules="[$rules.required]"
                  >
                  </v-file-input>
                </template>

                <template v-if="visibleComment">
                  <div class="my-2">{{ subject.comment_title }}</div>
                  <v-textarea
                    v-model="form.comment"
                    placeholder="Comment"
                    outlined
                    dense
                    :rules="[$rules.required]"
                  >
                  </v-textarea>
                </template>

                <div class="d-flex justify-space-between mt-2">
                  <a
                    type="submit"
                    color="primary"
                    :loading="submittingAnswer"
                    :disabled="submittingAnswer"
                    @click="saveAndReturnLater"
                  >
                    Save and return later
                  </a>
                  <v-btn
                    type="submit"
                    color="primary"
                    class="ml-auto"
                    :loading="submittingAnswer"
                    :disabled="submittingAnswer"
                    @click="next"
                  >Next</v-btn>
                </div>
              </v-form>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  components: {
  },
  data() {
    return {
      isFormValid: true,
      progressed: 30,
      form: {
        yes_no: '',
        fileInput: undefined,
        comment: ''
      }
    }
  },
  computed: {
    ...mapState('subjects', ['loadingSubject', 'submittingAnswer', 'subject']),
    
    visibleUpload() {
      if (this.subject.yes_no === false && this.subject.upload)
        return true
      if ((this.form.yes_no === 'yes' && this.subject.truthy === true || this.subject.truthy === false && this.form.yes_no === 'no') && this.subject.upload)
        return true

      return false
    },

    visibleComment() {
      if (this.subject.yes_no === false && this.subject.comment)
        return true
      if ((this.form.yes_no === 'yes' && this.subject.truthy === true || this.subject.truthy === false && this.form.yes_no === 'no') && this.subject.comment)
        return true

      return false
    }
  },
  mounted() {
    this.getSubject(this.$route.params.id)
  },
  methods: {
    ...mapActions('subjects', ['getSubject', 'submitAnswer']),
    saveAndReturnLater() {

    },
    next() {
      if (this.$refs.form.validate()) {
        const formData = new FormData()

        formData.append('subject_id', this.$route.params.id)
        formData.append('yes_no', this.form.yes_no)
        formData.append('upload', this.form.fileInput)
        formData.append('comment', this.form.comment)

        this.submitAnswer(formData)
      }
    }
  }
}
</script>
