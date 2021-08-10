<template>
  <v-row justify="center">
    <v-dialog :value="confirmOpen" persistent max-width="290">      
      <v-card>
        <v-card-title class="headline">{{ title }}</v-card-title>
        <v-card-text>{{ text }}</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="gray darken-1" text @click="onClose">Canel</v-btn>
          <v-btn color="green darken-1" text @click="onConfirm">Confirm</v-btn>
        </v-card-actions>
      </v-card> 
    </v-dialog>
  </v-row>
</template>

<script>
  export default {
    props:['text', 'title', 'confirmOpen'],
    name:"ConfirmModal",
    data () {
      return {      
      }
    },
     methods: {
        onClose(){        
          this.$emit('cancelConfirm');
        },
        onConfirm(){
          this.$emit('confirm');
        }
    }  
  }
</script>