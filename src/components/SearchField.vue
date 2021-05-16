<template>
  <div class="search-field">
    <v-icon class="search-field-icon">mdi-magnify</v-icon>
    <input placeholder="搜索照片库" @change="$emit('change', $event.target.value)"/>
    <div class="search-field-notched"></div>
  </div>
</template>

<script>

export default {
  name: 'SearchField'
}
</script>

<style scoped>
.search-field {
  position: relative;
  display: inline-flex;
  width: 280px;
  height: 32px;
  box-sizing: border-box;
  margin-right: 8px;
}
.search-field > .search-field-icon {
  width: 48px;
}
.search-field > input {
  border: none;
  outline: none;
  background-color: transparent;
  width: 100%;
  height: 100%;
  font-size: 15px;
  color: #fff;
  z-index: 99;
}
.search-field > input::placeholder {
  color: #f4f4f4;
}

.search-field > div.search-field-notched {
  position: absolute;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  border-radius: 4px;
  background-color: rgba(255, 255, 255, 0.15);
}

.search-field > input:focus ~ div.search-field-notched,
.search-field > input:hover ~ div.search-field-notched {
  background-color: rgba(255, 255, 255, 0.25);
}
</style>
