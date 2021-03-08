<template>
  <div class="d-flex flex-grow-1 white">
    <!-- Toolbar -->
    <v-app-bar
      app
    >
      <div class="d-flex justify-space-between align-center container">
        <img src="/images/logo.png" style="width: 160px;">
        <v-spacer></v-spacer>
        <toolbar-user />
      </div>
    </v-app-bar>

    <v-main>
      <v-container>
        <v-layout>
          <slot></slot>
        </v-layout>
      </v-container>
    </v-main>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'

// navigation menu configurations
import config from '../configs'

import ToolbarUser from '../components/toolbar/ToolbarUser'

export default {
  components: {
    ToolbarUser
  },
  data() {
    return {
      drawer: null,
      showSearch: false,
      navigation: config.navigation,
      logoImgError: false
    }
  },
  computed: {
    ...mapState('app', ['product', 'isContentBoxed', 'menuTheme', 'toolbarTheme', 'isToolbarDetached']),
    ...mapState({
      authUser: (state) => state.auth.user
    })
  }
}
</script>
