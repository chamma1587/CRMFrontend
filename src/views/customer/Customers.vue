<template>
  <div class="customer">
    <PageTitle
      :title="title"
      :loading="loading"
      :serach="search"
      @searchText="searchChange($event)"
    />
    <v-layout row v-if="errors && !loading">
        <v-flex>
          <Alert @dismissed="onDismissed" :text="errors"></Alert>
        </v-flex>
      </v-layout>
    <v-row v-if="!loading">
      
      <CustomerList
        v-for="(item, index) in customers"
        :key="index"
        :data="item"
        @successDelete="successDelete()"
        @successEdit="successEdit()"
      />
    </v-row>
    <v-row v-if="total > 1">
      <v-col cols="12" md="12" sm="12">
        <v-card>
          <v-divider></v-divider>
          <v-card-actions>
            <pagination
              :page.sync="page"
              :total.sync="total"
              @next="next()"
              @previous="previous()"
              :loading="loading"
            ></pagination>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <v-btn bottom color="blue" dark fab fixed right @click="openModal">
      <v-icon>mdi-plus</v-icon>
    </v-btn>

    <AddCustomer
      :popup="addModal"
      @modalStatus="changeModalStatus($event)"
      @successCreate="successCreate"
    />
    <Snackbars :text="succesMsg" :snackbar="snackbar" @classSnackbar="clossSnackbar"/>
  </div>
</template>
<script>
import Snackbars from "@/components/shared/Snackbars";
import PageTitle from "@/components/shared/PageTitle";
import CustomerList from "@/components/admin/customer/CustomerList";
import { CustomerService } from "@/services/customer-service.js";
import { checkError } from "@/config/errors.js";
import AddCustomer from "@/components/admin/customer/AddCustomer";
import Pagination from "@/components/shared/Pagination";
import Alert from "@/components/shared/Alert";

export default {
  name: "Customer",
  components: {
    PageTitle,
    CustomerList,
    AddCustomer,
    Snackbars,
    Pagination,
    Alert
  },
  data: () => ({
    title: "Customers",
    loading: false,
    addModal: false,
    customers: [],
    search: "",
    succesMsg: "",
    snackbar: false,
    page: 1,
    total: 0,
    errors: []
  }),

  mounted() {
    this.getCustomerList();
  },

  methods: {
    searchChange(value) {
      this.search = value;
      this.getCustomerList();
    },
    getCustomerList() {
      this.loading = true;
      CustomerService.getCustomerList(this.search, this.page)
        .then(response => {
          this.loading = false;
          if (response) {
            this.customers = response.data.data;
            this.total = response.data.meta.pagination.total_pages;
            this.page = response.data.meta.pagination.current_page;
          }
        })
        .catch(error => {
          this.customers = [];
          this.loading = false;
          let data = error.response.data;
          let errorOutput = checkError.errorFormatting(data);
          this.errors = errorOutput;
        });
    },
    openModal() {
      this.addModal = true;
    },
    changeModalStatus(value) {
      this.addModal = value;
    },
    successCreate() {
      this.addModal = false;
      this.snackbar = true;
      this.succesMsg = "Customer successfully created";
      this.getCustomerList();
    },
    successDelete() {
      this.addModal = false;
      this.snackbar = true;
      this.succesMsg = "Customer successfully deleted";
      this.getCustomerList();
    },

    successEdit() {
      this.addModal = false;
      this.snackbar = true;
      this.succesMsg = "Customer successfully updated";
      this.getCustomerList();
    },

    clossSnackbar() {
      this.snackbar = false;
    },
    previous() {
      if (this.page > 1) {
        this.page--;
        this.getCustomerList();
      }
    },
    next() {
      if (this.total > this.page) {
        this.page++;
        this.getCustomerList();
      }
    },
     onDismissed() {
      this.errors = null;
    },
  }
};
</script>
