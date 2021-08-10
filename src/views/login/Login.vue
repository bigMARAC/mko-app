<template>
  <v-card></v-card>
</template>

<script>
  export default {
    data: () => ({
      items: [
        { title: 'Dashboard', icon: 'mdi-view-dashboard' },
        { title: 'Photos', icon: 'mdi-image' },
        { title: 'About', icon: 'mdi-help-box' },
      ],
      drawer: null
    }),
  }
</script>