<template>
  <!-- 审批人节点 -->
  <div>
    审批人: {{node.config.name}}
  </div>
</template>

<script setup name="ApproverNode">
import {getCurrentInstance, inject} from "vue";
import { KEY_VALIDATOR, KEY_PROCESS_DATA } from "../../config/keys"

const props = defineProps({
  node: { // 传入的流程配置数据
    type: Object,
    default: {}
  },
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
    "message": "请选择审批人"
  }
})
</script>

<style lang="less" scoped>

</style>
