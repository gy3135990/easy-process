<template>
  <!-- 审批人节点 -->
  <div>
    审批人: {{node.config.name}}
  </div>
</template>

<script setup name="ApproverNode">
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
