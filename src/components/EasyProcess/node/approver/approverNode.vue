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
  bizData: { // 业务数据
    type: Object,
    default: {}
  },
});

const { proxy } = getCurrentInstance();

const emit = defineEmits(["validator"]);
onMounted(async () => {
  emit("validator", validator);
});

// 验证器
const validator = () => {
  return {
    "valid": props.node.config.name ? true : false,
    "message": "请选择审批人"
  }
}
</script>

<style lang="less" scoped>

</style>
