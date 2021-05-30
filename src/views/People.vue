<template>
  <div class="people">
    <v-slide-group mandatory center-active v-model="model">
      <v-slide-item v-for="n in 15" :key="n" v-slot:default="{ active, toggle }">
        <v-card :color="active ? 'primary' : 'grey lighten-1'" class="ma-2" height="64" width="64" @click="toggle">
        </v-card>
      </v-slide-item>
    </v-slide-group>

    <h5 class="text-h5 mb-4">Selected {{ model }}</h5>
  </div>
</template>

<script>
export default {
  name: 'People',
  data: () => ({
    model: null
  })
}
</script>

<style scoped>
</style>
