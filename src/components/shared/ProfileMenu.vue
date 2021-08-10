
<template>
  <v-menu class="mt-10">
    <template v-slot:activator="{ on }">
      <v-list-item v-on="on" color="grey" v-if="profile.profile">
        <v-avatar size="30">
          <img :src="profile.profile.profile_image || defaultImage">
        </v-avatar>
      </v-list-item>
      <v-list-item v-on="on" color="grey" v-else>
        <v-avatar size="30">
          <img :src="defaultImage">
        </v-avatar>
      </v-list-item>
    </template>
    <v-card class="profile-menu">
      <v-list>
        <v-list-item>
         
          <v-list-item-content >
            <v-list-item-title>Administration</v-list-item-title>           
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <v-divider></v-divider>

      <v-card-actions>
        <v-btn text @click="logout()">Logout</v-btn>
      </v-card-actions>
    </v-card>
  </v-menu>
</template>

<script>
export default {
  data() {
    return {
      defaultImage: require("@/assets/img/avatar.svg"),
      profile: []
    };
  }, 

  methods: {  

    logout: function() {
      this.$store.dispatch("auth/destroyToken").then(response => {
        if (response) {
          this.$router.push("/login");
        }
      });
    }
  }
};
</script>


