<template>
  <!-- 条件节点 -->
  <div class="ep-node-condition">
    条件节点
  </div>

</template>

<script setup name="ConditionNode">
import Node from "../base/Node";
import {ref, reactive, onMounted, getCurrentInstance} from "vue";

const props = defineProps({
  node: { // 传入的流程配置数据
    type: Object,
    default: {}
  },
});

const { proxy } = getCurrentInstance();

// 流程配置数据
let config = ref({});

onMounted(async () => {

});

</script>

<style lang="less" scoped>
.ep-node-condition {

}
</style>
