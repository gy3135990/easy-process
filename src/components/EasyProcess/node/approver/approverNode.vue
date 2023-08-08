<template>
  <!-- 审批人节点 -->
  <div>
    审批人: {{node.config.name}}
  </div>
</template>

<script setup name="ApproverNode">
import {onMounted, getCurrentInstance, inject} from "vue";
import {KEY_VALIDATOR} from "../../config/keys"

const props = defineProps({
  tempNodeId: { // 临时节点ID
    type: String
  },
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

// 获取流程验证器实例
const validator = inject(KEY_VALIDATOR)

// 注册验证器
validator.register(props.tempNodeId, () => {
  return {
    "valid": props.node.config.name ? true : false,
    "message": "请选择审批人"
  }
})

onMounted(async () => {

});
</script>

<style lang="less" scoped>

</style>
