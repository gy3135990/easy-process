<template>
  <div class="app-container">

  </div>
</template>

<script setup name="Test">
function init() {
  // const p = /(\/.*)?Node.vue/
  // const p = /\/([^/]+)Node\.vue$/
  const p = /([^/]+)Node\.vue$/i
  // let text = '../src/node/testNode.vue'
  let text = '../testNode.Vue'
  let result = p.exec(text)
  console.log("======", result)
  console.log("======", result[1])
}
init()
</script>

<style lang="less" scoped>

</style>
