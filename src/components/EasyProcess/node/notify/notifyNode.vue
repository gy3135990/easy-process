<template>
  <!-- 抄送人节点 -->
  <div>
    抄送人: {{node.config.name}}
  </div>
</template>

<script setup name="NotifyNode">
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
    "message": "请选择抄送人"
  }
}
</script>

<style lang="less" scoped>

</style>
