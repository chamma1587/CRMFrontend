<template>
  <v-app-bar :clipped-left="$vuetify.breakpoint.lgAndUp" app color="white" flat>
    <v-app-bar-nav-icon @click="toggleNav(drawer = !drawer)"/>
    <v-toolbar-title style="width: 400px" class="ml-0 pl-4">
      <span>
      CRM
      </span>
    </v-toolbar-title>  
    <v-spacer/>   
    <v-btn icon>
      <v-avatar item>
        <ProfileMenu @profileData="updateProfile($event)"/>
      </v-avatar>
    </v-btn>
  </v-app-bar>
</template>

<script>
import ProfileMenu from "./ProfileMenu";

export default {
  components: { ProfileMenu },
  data: () => ({
    name: null,
  }),

  computed: {
    drawer: {
      get() {
        return this.$store.state.auth.drawer;
      },
      set(value) {
        this.$store.commit("auth/setDrawer", value);
      }
    }
  },

  methods: {
    toggleNav: function(value) {
      this.$store.dispatch("auth/changeDrawer", value);
    },

    updateProfile(value) {
      this.name = value.user.first_name;
    }
  }
};
</script>
<style>
.v-toolbar__content {
  align-items: center;
  display: flex;
  position: relative;
  z-index: 0;
  border-bottom: solid 1px #e2e8f0;
}
</style>

