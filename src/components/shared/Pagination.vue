<template>
  <v-row v-if="total > 1">
    <v-col md="2" xs="5">
      <v-btn
        large
        color="default"
        depressed
        :disabled="loading || disabledPrev"
        block
        @click="previous"
      >Previous</v-btn>
    </v-col>
    <v-col md="8" xs="2"></v-col>
    <v-col md="2" xs="5">
      <v-btn
        large
        color="default"
        depressed
        :disabled="loading || disabledNext"
        block
        @click="next"
      >Next</v-btn>
    </v-col>  
  </v-row>
</template>

<script>
export default {
  name: "Pagination",
  props: {
    loading: Boolean,
    page: Number,
    total: Number
  },
  data: function() {
    return {
      disabledPrev: true,
      disabledNext: true
    };
  },
  watch: {
    page: function() {
      this.initPagination();
    },

    total: function() {
      this.initPagination();
    }
  },

  mounted() {
    this.initPagination();
  },

  methods: {
    initPagination() {
      this.disabledPrev = true;
      if (this.page  > 1 && this.total > 0) {
        this.disabledPrev = false;
      }

      this.disabledNext = this.page < this.total ? false : true;
    },
    previous() {
      this.$emit("previous");
    },
    next() {
      this.$emit("next");
    }
  }
};
</script>

