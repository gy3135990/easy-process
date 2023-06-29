<template>
  <!-- 发起人节点 -->
  <div>
    发起人: {{node.config.name}}
  </div>
</template>

<script setup name="StartNode">
import {ref, reactive, onMounted, getCurrentInstance} from "vue";

const props = defineProps({
  node: { // 传入的流程配置数据
    type: Object,
    default: {}
  },
});

const { proxy } = getCurrentInstance();

onMounted(async () => {

});

</script>

<style lang="less" scoped>

</style>
