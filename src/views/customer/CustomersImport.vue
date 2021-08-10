<template>
  <div class="">
    <v-progress-linear indeterminate color="orange" v-if="loading"></v-progress-linear>
    <v-layout row v-if="errors">
      <v-flex>
        <Alert @dismissed="onDismissed" :text="errors"></Alert>
      </v-flex>
    </v-layout>
    <v-card class="pa-5">
      <v-card-title dark>
        <h3 class="mb-3">Import Customers</h3>
        <v-spacer></v-spacer>      
      </v-card-title>
      <v-divider></v-divider>
      <v-form>
        <v-row>
          <v-col cols="12" md="12" sm="12">
            <v-file-input
              v-model="form.file"             
              label="CSV file"              
            ></v-file-input>
          </v-col>
       
        </v-row>
      </v-form>
      <v-divider></v-divider>
      <v-card-actions>
        <v-row>
          <v-col cols="12" md="9" xs="6"></v-col>
          <v-col cols="12" md="3" xs="6">
            <v-btn
              large
              color="success"
              depressed
              :disabled="loading || !form.file"
              block
              @click="importCustomers()"
            >Import</v-btn>
          </v-col>
        </v-row>
      </v-card-actions>
    </v-card>
    <Snackbars
      :text="succesMsg"
      :snackbar="snackbar"
      :color="'success'"
      @classSnackbar="clossSnackbar"
    />
  </div>
</template>

<script>

import Alert from "@/components/shared/Alert";
import Snackbars from "@/components/shared/Snackbars";
import { CustomerService } from "@/services/customer-service.js";
import { checkError } from "@/config/errors.js";

export default {
  name: "CustomerImport",

  components: { Alert, Snackbars },

  data: () => ({
    loading: false,
    errors: null,
    snackbar: false,
    succesMsg: "",
    form: {
      file: null,
    }
  }),

  
  methods: {
    importCustomers() {
      this.loading = true;
      let fd = new FormData();
      fd.append('file', this.form.file);   

      CustomerService.import(fd)
        .then(response => {
          this.loading = false; 
          if (response.data.status_code === 200) {     
            this.succesMsg = "Customer has been imported successfuly";
            this.snackbar = true;
            this.reset();           
          }
        })
        .catch(error => {
          this.loading = false;
          let data = error.response.data;
          let errorOutput = checkError.errorFormatting(data);
          this.errors = errorOutput;
        });
    },

    onDismissed() {
      this.errors = null;
    },
    clossSnackbar() {
      this.snackbar = false;
    },
    reset() {
      this.form.name = "";     
      this.form.file = null; 
    }
  }
};
</script>
