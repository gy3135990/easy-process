<template>
  <div class="app-container">
    <div class="header">
      <div class="title">{{processData.processName}}</div>
      <div class="publish">
        <el-button type="primary" round @click="publish">发布</el-button>
      </div>
    </div>
    <div class="body">
      <ProcessDesigner ref="process" :data="processData"></ProcessDesigner>
    </div>
  </div>
</template>

<script setup name="WorkFlow">
import ProcessDesigner from "@/components/EasyProcess/processDesigner";
import {getCurrentInstance, onMounted, ref} from "vue";
import { getWorkFlowData } from "@/api/api.js";
const { proxy } = getCurrentInstance();

// 审批数据
let processData = ref({})

onMounted(async () => {
  // 获取审批数据
  getWorkFlowData({processId: '10001'}).then(response => {
    console.info("getWorkFlowData", response)
    processData.value = response.data;
  })
})

/**
 * 发布流程
 */
const publish = () => {
  let result = proxy.$refs.process.getResult();
  console.info("发布流程:", result)
}
</script>

<style lang="less" scoped>
.app-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

}
.header {
  position: fixed;
  z-index: 2;
  width: 100%;
  height: 50px;
  background-color: #1c84c6;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0px 16px;
  box-sizing: border-box;

  .title {
    color: #FFFFFF;
    font-weight: bold;
  }
  .publish {

  }
}
.body {
  position: absolute;
  top: 0;
  left: 0;
  padding-top: 50px;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
}
</style>
