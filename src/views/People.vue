<template>
  <div class="people">
    <v-slide-group mandatory center-active v-model="model">
      <v-slide-item v-for="n in 9" :key="n" v-slot:default="{ active, toggle }">
        <v-card :color="active ? 'primary' : 'grey lighten-1'" class="ma-2 pa-2 d-flex align-center justify-center" height="96" width="96" @click="toggle">
          <span class="face-name">习近平习</span>
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
.v-slide-item--active span.face-name {
  color: white;
}
</style>
