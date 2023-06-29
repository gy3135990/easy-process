<template>
  <!-- 条件配置 -->
  <div>
    条件配置
  </div>
</template>

<script setup name="ConditionDrawer">
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
