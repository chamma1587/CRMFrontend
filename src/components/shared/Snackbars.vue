<template>
  <div class="text-center ma-2">
    <v-snackbar :value="snackbar" @input="onClose">
      {{ text }}
      <v-btn color="pink" text @click="onClose">Close</v-btn>
    </v-snackbar>
  </div>
</template>

<script>
export default {
  name: "Snackbars",
  props: ["text", "snackbar"],
  data() {
    return {
      alert: true
    };
  },
  methods: {
    onClose() {
      this.$emit("classSnackbar");
    }
  }
};
</script>
