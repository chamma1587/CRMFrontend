<template>
  <v-container>
    <v-col>
      <v-card class outlined>
        <v-list-item v-if="data">
          <v-list-item-content>
            <v-list-item-title class="sub-headline">{{data.first_name}} {{data.last_name}}</v-list-item-title>
            <v-list-item-subtitle>{{data.email}}</v-list-item-subtitle>
          </v-list-item-content>
          <v-list-item-content v-if="data.phone_numbers">
            <span
              v-for="(phone,index) in data.phone_numbers"
              :key="index"
            >{{phone}},</span>
          </v-list-item-content>
          <v-spacer/>
          <v-list-item-action>
            <v-btn icon class="orange" dark @click="editItemTrigger(data)">
              <v-icon>mdi-account-edit</v-icon>
            </v-btn>
          </v-list-item-action>
          <v-list-item-action v-if="data">
            <v-btn icon class="red" dark @click="deleteItemTrigger(data.uuid)">
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </v-list-item-action>
        </v-list-item>
      </v-card>
    </v-col>  

    <ConfirmModal
      :text="confirmText"
      :confirmOpen="confirmOpen"
      :title="confirmTitle"
      @confirm="deleteItemConfirmation"
      @cancelConfirm="cancelConfrimDelete"
    />
    <EditCustomer
      :popup="editCustomerDetails"
      :customer="editDetail"
      :phoneNumbers="phoneNumbers"
      @modalStatus="changeModalStatus($event)"
      @successEditDetail="successEditDetail($event)"
    />
  </v-container>
</template>

<script>
import ConfirmModal from "@/components/shared/ConfirmModal";
import { CustomerService } from "@/services/customer-service.js";
import { checkError } from "@/config/errors.js";
import EditCustomer from "@/components/admin/customer/EditCustomer";


export default {
  name: "StudentList",
  props: ["loading", "data"],
  components: { ConfirmModal, EditCustomer },
  data() {
    return {
      defaultImage: require("@/assets/img/avatar.svg"),
      confirmOpen: false,
      deleteItem: null,
      confirmText: "Customer delete",
      confirmTitle: "Are you sure?",
      editCustomerDetails: false,
      editDetail: [],
      phoneNumbers: []     
    };
  },
  methods: {
    deleteConfirmation() {
      this.$emit("delete");
    },
    deleteItemTrigger(vale) {
      this.confirmOpen = true;
      this.deleteItem = vale;
    },
    deleteItemConfirmation() {
      this.loading = true;
      this.confirmOpen = false;
      CustomerService.delete(this.deleteItem)
        .then(response => {
          this.loading = false;
          if (response.data.status_code === 200) {
            this.$emit("successDelete", true);
          }
        })
        .catch(error => {
          this.loading = false;
          let data = error.response.data;
          let errorOutput = checkError.errorFormatting(data);
          this.errors = errorOutput;
        });
    },

    editItemTrigger(data) {
      this.editCustomerDetails = true;
      this.editDetail = data;

      if (data.phoneNumbers && data.phoneNumbers.data) {
        let array = data.phoneNumbers.data;
        this.phoneNumbers = [];
        let numbers = [];
        array.forEach(function(value) {
          if (value.phone_number) {
            numbers.push(value.phone_number);
          }
        });

        this.phoneNumbers = numbers;
      }
    },

    changeModalStatus(event) {
      this.editCustomerDetails = event;
      this.editDetail = [];
    },

    successEditDetail(value) {
      if (value) {
        this.editCustomerDetails = false;
        this.editDetail = [];
        this.$emit("successEdit");
      }
    },

    cancelConfrimDelete() {
      this.confirmOpen = false;
      this.deleteItem = null;
    }
  }
};
</script>
<style>
.container{
  padding: 0px;
}
</style>

