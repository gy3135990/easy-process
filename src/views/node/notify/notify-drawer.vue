<template>
  <!-- 抄送人配置 -->
  <div>
    抄送人：<input v-model="props.config.name" />
  </div>
</template>

<script setup name="notify-drawer">
import {getCurrentInstance, inject} from "vue";
import {KEY_PROCESS_DATA} from "@/easy-process/config/provide-keys.js"

const props = defineProps({
  config: { // 传入的流程配置数据
    type: Object,
    default: {}
  }
});

const { proxy } = getCurrentInstance();

// 获取流程数据
const processData = inject(KEY_PROCESS_DATA)

/**
 * 更新流程数据前置处理
 * 该函数会优先于全局修改节点配置之前事件（on_pre_update_node_config）执行
 * @returns {boolean} 返回 true 表示可以更新流程数据，返回 false 表示不能更新流程数据
 */
const preUpdateHandle = () => {
  if (!props.config.name) {
    alert("请填写抄送人")
    return false
  }
  return true
}

defineExpose({
  preUpdateHandle,
});
</script>

<style lang="less" scoped>

</style>
