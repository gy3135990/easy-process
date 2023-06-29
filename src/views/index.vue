<template>
  <div class="app-container">
    <ProcessDesigner :data="processData"></ProcessDesigner>
  </div>
</template>

<script setup name="WorkFlow">
import ProcessDesigner from "@/components/EasyProcess/processDesigner";
import {onMounted, ref} from "vue";
import { getWorkFlowData } from "@/api/api.js";

// 审批数据
let processData = ref({})

onMounted(async () => {
  // 获取审批数据
  getWorkFlowData({processId: '10001'}).then(response => {
    console.info("getWorkFlowData", response)
    processData.value = response.data;
  })
})

</script>

<style scoped>
.app-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
