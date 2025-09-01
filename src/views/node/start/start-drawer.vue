<template>
  <!-- 发起人配置 -->
  <div>
    发起人：<input v-model="props.config.name" />
  </div>
</template>

<script setup name="start-drawer">
import {getCurrentInstance, inject} from "vue";
import {KEY_PROCESS_DATA} from "@/easy-process/config/provide-keys.js"

const props = defineProps({
  config: { // 传入的流程配置数据
    type: Object,
    default: {}
  },
});

const { proxy } = getCurrentInstance();

// 获取流程数据
const processData = inject(KEY_PROCESS_DATA)
</script>

<style lang="less" scoped>

</style>
