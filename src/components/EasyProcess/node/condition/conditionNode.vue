<template>
  <!-- 条件节点 -->
  <div class="ep-node-condition">
    <div v-if="!props.node.isLastCondition">
      请假天数: {{node.config.days}}天
    </div>
    <div v-else>
      其他条件进入此流程
    </div>
  </div>

</template>

<script setup name="ConditionNode">
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
  let valid = true;
  if (!props.node.isLastCondition) {
    if (!props.node.config.days) {
      valid = false
    }
  }
  return {
    "valid": valid,
    "message": "请选择条件"
  }
})

onMounted(async () => {

});

</script>

<style lang="less" scoped>
.ep-node-condition {

}
</style>
