<template>
  <div v-if="text" >
    <div v-for="(error,index) in text" :key="index" >
    <v-alert @input="onClose"  dismissible   type="error" :value="true" >
      {{ error }}
    </v-alert>  
    </div>
  </div> 
</template>

<script>
  export default {
    name: "Alert",
    props:['text'],
    data () {
      return {
        alert: true
      }
    },
    methods: {
        onClose(){
          this.$emit('dismissed');
        }
    }
  }
</script>