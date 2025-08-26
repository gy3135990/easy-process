<template>
  <div class="app-container">
    <svg class="svg-icon1" aria-hidden="true" viewBox="0 0 1024 1024">
      <use :xlink:href="icons.close" fill="red"/>
    </svg>
  </div>
</template>

<script setup name="Test">
import {ref} from "vue";
const icons = ref({})
const namePattern = /([^/]+)\.svg$/i
function init() {
  let files = import.meta.glob('../assets/icons/svg/*', {eager: true, as: 'url'});
  console.log(files);
  Object.keys(files).forEach(key => {
    let fileName = getFileName(namePattern, key)
    if (fileName) {
      icons.value[fileName] = files[key]
    }
  })
  console.log("icons.value", icons.value)
}

const getFileName = (pattern, path) => {
  let result = pattern.exec(path)
  if (result !== null) {
    return result[1]
  }
  return null
}
init()
</script>

<style lang="less" scoped>
.svg-icon1 {
  width: 25px;
  height: 25px;
  font-size: 50px;
}
</style>
