<template>
  <!-- 发起人节点 -->
  <div>
    发起人: {{node.config.name}}
  </div>
</template>

<script setup name="start-node">
import {getCurrentInstance, inject} from "vue";
import {KEY_PROCESS_DATA, KEY_VALIDATOR} from "../../config/keys.js"

const props = defineProps({
  node: { // 传入的流程配置数据
    type: Object,
    default: {}
  }
});

const { proxy } = getCurrentInstance();

// 获取流程数据
const processData = inject(KEY_PROCESS_DATA)
// 获取流程验证器实例
const validator = inject(KEY_VALIDATOR)

// 注册验证器
validator.register(props.node.tempNodeId, () => {
  return {
    "valid": props.node.config.name ? true : false,
    "message": "请选择发起人"
  }
})
</script>

<style lang="less" scoped>

</style>
