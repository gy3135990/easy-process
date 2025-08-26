<template>
  <!-- 条件节点 -->
  <div class="ep-node-condition">
    <div v-if="!isLastCondition">
      请假天数: {{node.config.days}}天
    </div>
    <div v-else>
      其他条件进入此流程
    </div>
  </div>

</template>

<script setup name="condition-node">
import {getCurrentInstance, inject} from "vue";
import {KEY_PROCESS_DATA, KEY_VALIDATOR} from "../../config/keys.js"

const props = defineProps({
  node: { // 传入的流程配置数据
    type: Object,
    default: {}
  },
  isLastCondition: {
    type: Boolean,
    default: false
  }
});

const { proxy } = getCurrentInstance();

// 获取流程数据
const processData = inject(KEY_PROCESS_DATA)
// 获取流程验证器实例
const validator = inject(KEY_VALIDATOR)

// 注册验证器
validator.register(props.node.tempNodeId, () => {
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

</script>

<style lang="less" scoped>
.ep-node-condition {

}
</style>
