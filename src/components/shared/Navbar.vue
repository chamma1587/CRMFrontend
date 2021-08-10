<template>
  <v-navigation-drawer v-model="drawer" :clipped="$vuetify.breakpoint.lgAndUp" app>
    <v-list dense>
      <template v-for="item in items">
        <v-list-item :key="item.text" link :to="item.link">
          <v-list-item-action style="backgroun-color:none">
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ item.text }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </template>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  data: () => ({
    items: [
      { icon: "mdi-home", text: "Home", link: "/" },   
      { icon: "mdi-account-multiple", text: "Customers", link: "/customers" },
      { icon: "mdi-upload", text: "Customer Import", link: "/customer/import" },
    ]
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

  watch: {
    drawer(value) {
      this.toggleNav(value);
    }
  },

  methods: {
    toggleNav: function(value) {
      this.$store.dispatch("auth/changeDrawer", value);
    }
  }
};
</script>

<style>
.v-list-item--active {
  background: rgba(102, 125, 256, 1);
  color: #fff;
}
.v-list .v-list-item--active .v-icon {
  color: #fff;
}
.v-list-item--active .v-list-item__title {
  color: #fff;
}
.v-navigation-drawer__content {
  padding: 15px;
}
.v-navigation-drawer__content .v-list-item--dense,
.v-list--dense .v-list-item {
  min-height: auto;
  border-radius: 50px;
}
.v-navigation-drawer__content .v-list-item--link:before {
  border-radius: 50px;
  background-color: white;
}

.v-list-item--active .v-list-item__action i:before {
  color: #fff;
}
</style>
