<template>
  <div class="app-container">
    <div class="header">
      <div class="title">{{processData.processName}}</div>
      <div class="publish">
        <button @click="publish">发布</button>
      </div>
    </div>
    <div class="body">
      <ep-designer ref="process" :data="processData"/>
    </div>
  </div>
</template>

<script setup name="WorkFlow">
import {getCurrentInstance, onMounted, ref} from "vue";
import {
  ON_DESIGNER_MOUNTED, ON_PRE_ADD_NODE, ON_AFTER_ADD_NODE,
  ON_PRE_REMOVE_NODE, ON_AFTER_REMOVE_NODE,
  ON_PRE_UPDATE_NODE_CONFIG, ON_AFTER_UPDATE_NODE_CONFIG
} from "@/easy-process/config/event-keys.js"
const { proxy } = getCurrentInstance();
import mockData from '~/public/mock/data.json'

// 审批数据
let processData = ref({})

onMounted(async () => {
  // 获取流程数据
  processData.value = mockData;
  // 绑定事件
  bindEvent()
})

/**
 * 绑定事件
 */
const bindEvent = () => {
  proxy.$refs.process.bindEvent(ON_DESIGNER_MOUNTED, () => {
    console.log("触发流程设计器加载完成事件")
  })
  proxy.$refs.process.bindEvent(ON_PRE_ADD_NODE, (params) => {
    console.log("触发新增节点之前事件", params)
    return true
  })
  proxy.$refs.process.bindEvent(ON_AFTER_ADD_NODE, (params) => {
    console.log("触发新增节点之后事件", params)
  })
  proxy.$refs.process.bindEvent(ON_PRE_REMOVE_NODE, (params) => {
    console.log("触发移除节点之前事件", params)
    return true
  })
  proxy.$refs.process.bindEvent(ON_AFTER_REMOVE_NODE, (params) => {
    console.log("触发移除节点之后事件", params)
  })
  proxy.$refs.process.bindEvent(ON_PRE_UPDATE_NODE_CONFIG, (params) => {
    console.log("触发更新节点配置之前事件", params)
    return true
  })
  proxy.$refs.process.bindEvent(ON_AFTER_UPDATE_NODE_CONFIG, (params) => {
    console.log("触发更新节点配置之后事件", params)
  })
}

/**
 * 发布流程
 */
const publish = () => {
  proxy.$refs.process.validate((valid, messages) => {
    if(valid) {
      let result = proxy.$refs.process.getResult();
      console.info("发布流程:", result)
      alert(JSON.stringify(result))
    } else {
      alert(JSON.stringify(messages))
    }

  })

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
  //width: 100%;
  min-width: 100%;
  height: 100%;
  width: 100%;
  box-sizing: border-box;
}
</style>
