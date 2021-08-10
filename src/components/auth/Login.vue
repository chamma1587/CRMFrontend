<template>
  <div class="login-page">
    <v-layout align-center justify-center class="pt-10">
      <v-flex xs12 sm8 md4>
        <v-layout row v-if="errors">
          <v-flex>
            <Alert @dismissed="onDismissed" :text="errors"></Alert>
          </v-flex>
        </v-layout>

        <v-card class="elevation-12 pb-5" v-if="showLogin">
          <v-toolbar dark color="primary" flat>
            <v-toolbar-title>Login Form</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
          <v-card-text>
            <v-progress-linear v-if="loading" indeterminate color="blue darken-2"></v-progress-linear>
            <v-form>
              <v-text-field
                prepend-icon="person"
                name="email"
                label="Login"
                type="email"
                v-model="email"
                @keydown.enter="login"
              ></v-text-field>
              <v-text-field
                v-model="password"
                id="password"
                prepend-icon="lock"
                name="password"
                label="Password"
                type="password"
                @keydown.enter="login"
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-btn @click="login" :loading="loading" :disabled="loading" block color="success">Login</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import Alert from "@/components/shared/Alert";
import { mapGetters } from "vuex";

export default {
  name: "Login",
  components: { Alert },
  data() {
    return {
      email: "",
      password: "",
      showLogin: true
    };
  },
  mounted() {
    this.onDismissed();
  },
  computed: {
    ...mapGetters("auth", {
      errors: "errors",
      isLogged: "token",
      loading: "loading"
    })
  },

  methods: {
    login() {
      this.$store
        .dispatch("auth/retrieveToken", {
          email: this.email,
          password: this.password
        })
        .then(response => {
          if (response.statusText === "OK") {
            this.showLogin = false;
            this.$router.push("/");
          }
        });
    },

    onDismissed() {
      this.$store.dispatch("auth/clearError");
    }
  }
};
</script>
<style>
.login-page {
  padding-bottom: 100px;
}
</style>

