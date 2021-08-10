<template>
  <v-dialog class="md-4" max-width="700px" persistent v-model="popup">
    <v-card>
      <v-card-title>
        <span>Add Customer</span>
      </v-card-title>
      <v-container class="pa-6">
        <v-layout row v-if="errors">
          <v-flex>
            <Alert @dismissed="onDismissed" :text="errors"></Alert>
          </v-flex>
        </v-layout>

        <v-row>
          <v-col cols="6">
            <v-label>First Name</v-label>
            <v-text-field
              hide-details
              class="grey-lighten-3 ma-2"
              outlined
              v-model="form.first_name"
              dense
            />
          </v-col>

          <v-col cols="6">
            <v-label>Last Name</v-label>
            <v-text-field
              hide-details
              class="grey-lighten-3 ma-2"
              outlined
              v-model="form.last_name"
              dense
            />
          </v-col>

          <v-col cols="12">
            <v-label>Email</v-label>
            <v-text-field
              hide-details
              class="grey-lighten-3 ma-2"
              outlined
              v-model="form.email"
              dense
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="10">
            <v-text-field
              hide-details
              class="grey-lighten-3 ma-2"
              placeholder="Phone number"
              outlined
              v-model="phones"
              dense
              type="number"
            />
          </v-col>
          <v-col cols="2">
            <v-btn class="primary mt-2" :disabled="!phones" @click="addNumbers">Add</v-btn>
          </v-col>
          <v-col cols="12" v-if="form.phone_numbers">
            <v-list>
              <v-list-item v-for="(item,index) in form.phone_numbers" :key="index">
                <v-list-item-content>{{item}}</v-list-item-content>
                <v-spacer></v-spacer>
                <v-list-item-action>
                  <v-icon @click="removeNumbers(index)">mdi-delete</v-icon>
                </v-list-item-action>
              </v-list-item>
            </v-list>
          </v-col>
        </v-row>
      </v-container>
      <v-card-actions class="pa-6">
        <v-btn color="default" class="mr-2" sole @click="close">Cancel</v-btn>
        <span>
          <v-btn
            color="success"
            :loading="loading"
            :disabled="loading"
            class="mr-2"
            sole
            @click="addCustomer"
          >Create</v-btn>
        </span>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>


<script>
import Alert from "@/components/shared/Alert";
import { CustomerService } from "@/services/customer-service.js";
import { checkError } from "@/config/errors.js";

export default {
  name: "AddClassroom",
  props: ["popup", "selectedId"],
  components: { Alert },

  data: () => ({
    form: {
      first_name: null,
      last_name: null,
      email: null,
      phone_numbers: []
    },
    numbers: [],
    phones: null,
    errors: null,
    loading: false
  }),

  mounted() {
    this.onDismissed();
  },

  methods: {
    addCustomer() {
      this.loading = true;
      CustomerService.create(this.form)
        .then(response => {
          this.loading = false;
          if (response.data.meta.message === "Success") {
            this.reset();
            this.$emit("successCreate", true);
          }
        })
        .catch(error => {
          this.loading = false;
          let data = error.response.data;
          let errorOutput = checkError.errorFormatting(data);
          this.errors = errorOutput;
        });
    },

    addNumbers() {
      this.form.phone_numbers.push(this.phones);
      this.phones = null;
    },

    removeNumbers(index) {
      this.form.phone_numbers.splice(this.form.phone_numbers.indexOf(index), 1);
    },

    onDismissed() {
      this.errors = null;
    },

    close() {
      this.reset();
      this.onDismissed();
      this.$emit("modalStatus", !this.popup);
    },
    reset() {
      this.form.first_name = null;
      this.form.last_name = null;
      this.form.email = null;
      this.form.phone_numbers = [];
      this.phones = null;
    }
  }
};
</script>