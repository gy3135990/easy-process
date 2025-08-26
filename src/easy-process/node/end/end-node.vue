<template>
  <!-- 结束节点 -->
  <div class="ep-node-end">
    <div class="ep-node-end-icon"></div>
    <div class="ep-node-end-text">流程结束</div>
  </div>
</template>

<script setup name="end-node">
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
.ep-node-end {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;


  .ep-node-end-icon {
    width: 15px;
    height: 15px;
    border-radius: 10px;
    background-color: #cacaca;
  }
  .ep-node-end-text {
    color: #5a5e66;
    margin-bottom: 100px;
  }
}
</style>
