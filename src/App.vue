<template>
  <v-app style="background:#FAFAFA">
    <Navbar v-if="isLogged"/>
    <Appbar v-if="isLogged && profile"/>
    <v-content>
      <v-container>
        <router-view></router-view>
      </v-container>
    </v-content>
    <Footer />
  </v-app>
</template>

<script>
import Navbar from "@/components/shared/Navbar";
import Appbar from "@/components/shared/Appbar";
import Footer from "@/components/shared/Footer";
import { createNamespacedHelpers } from "vuex";
const { mapGetters } = createNamespacedHelpers("auth");

export default {
  components: { Navbar, Appbar, Footer },
  data: () => ({}),

  computed: {
    ...mapGetters({
      isLogged: "token",
      profile: "profile",
      drawer: "drawer"
    })
  },

  methods: {
    changeDrawerStatus: function(value1) {
      this.drawer = value1;
    }
  }
};
</script>
<style>
.v-sheet {
  border-radius: 0px;
}

.v-card:not(.v-sheet--tile):not(.v-card--shaped) {
    border-radius: 0px;
}

.v-dialog {
    border-radius: 0px;
    margin: 24px;
    overflow-y: auto;
    pointer-events: auto;
    transition: 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
    width: 100%;
    z-index: inherit;
    box-shadow: 0px 11px 15px -7px rgba(0, 0, 0, 0.2), 0px 24px 38px 3px rgba(0, 0, 0, 0.14), 0px 9px 46px 8px rgba(0, 0, 0, 0.12);
}

</style>
