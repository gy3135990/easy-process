<template>
  <!-- 审核人配置 -->
  <div>
    审核人配置
  </div>
</template>

<script setup name="ApproverDrawer">
import {ref, reactive, onMounted, getCurrentInstance} from "vue";

const props = defineProps({
  node: { // 传入的流程配置数据
    type: Object,
    default: {}
  },
});

const { proxy } = getCurrentInstance();

onMounted(async () => {

});

</script>

<style lang="less" scoped>

</style>
