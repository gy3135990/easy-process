<template>
  <!-- 抄送人节点 -->
  <div>
    流程驳回
  </div>
</template>

<script setup name="notify-node">
import {getCurrentInstance, inject} from "vue";
import {KEY_PROCESS_DATA, KEY_VALIDATOR} from "@/easy-process/config/provide-keys.js"

const props = defineProps({
  node: { // 传入的流程配置数据
    type: Object,
    default: {}
  }
});

const { proxy } = getCurrentInstance();

// 获取流程数据
const processData = inject(KEY_PROCESS_DATA)
</script>

<style lang="less" scoped>

</style>
