<template>
  <v-menu left bottom style="marging:20px;">
    <template v-slot:activator="{ on }">
      <v-btn icon v-on="on">
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </template>

    <v-list>
      <v-list-item>
        <v-icon>mdi-delete</v-icon>
        <v-list-item-title>Remove</v-list-item-title>
      </v-list-item>
      <v-list-item>
        <v-icon>mdi-account-circle</v-icon>
        <v-list-item-title>Profile</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
export default {
    methods: {
        
    }
}
</script>

