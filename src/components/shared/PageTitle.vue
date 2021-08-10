<template>
  <v-row>
    <v-progress-linear v-if="loading" indeterminate color="blue darken-2"></v-progress-linear>
    <v-col lg="12" class="page-title">
      <v-card class="mx-auto mb-1" outlined>
        <v-card-title>
          {{title}}
          <span v-if="data">- {{data.name}} - {{data.code}}</span>
          <v-spacer></v-spacer>
          <v-text-field
            hide-details
            :value="serach"
            prepend-inner-icon="mdi-magnify"
            label="Search"
            class="grey-lighten-3 ma-2"
            background-color="#FAFAFA"
            outlined
            fieldset="#ddd"
            v-model="keyword"
            dense
          ></v-text-field>
          <v-btn class="success mr-1" @click="searchCustomers()" :disabled="!keyword">Search</v-btn>
          <v-btn class="default" @click="resetSearch()">Reset</v-btn>
        </v-card-title>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "PageTitle",
  props: ["title", "loading", "data", "serach"],
  data() {
    return {
      keyword: null
    };
  },
  methods: {
    searchCustomers() {
      this.$emit("searchText", this.keyword);
    },
    resetSearch() {
      this.keyword ="";
      this.$emit("searchText", this.keyword);
    }
  }
};
</script>
<style>
.page-title .v-card__title {
  padding: 0;
  padding-left: 15px;
  padding-right: 15px;
}

.page-title fieldset {
  color: #ddd !important;
}
</style>

