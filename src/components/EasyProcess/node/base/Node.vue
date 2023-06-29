<template>
  <div class="ep-node">
    <div class="ep-node-content" @click="showNodeDrawer">
      <div class="ep-node-header" :style="{color: config.color, 'background-color': config.bgColor}">
        <slot name="icon"></slot>
        <div class="ep-node-header-title">{{config.title}}</div>
        <el-icon class="ep-node-close" v-if="config.canRemoved"><CloseBold /></el-icon>
      </div>
      <div class="ep-node-body">
        <component :is="nodeComponents[props.node.nodeType]" :node="props.node"/>
      </div>
    </div>
    <div class="ep-node-add">
      <div class="ep-node-add-btn">
        <el-icon class="ep-node-add-btn-icon"><Plus /></el-icon>
      </div>
    </div>
    <!-- 节点配置Drawer -->
    <Drawer ref="nodeDrawer" @updateConfig="updateConfig" @cancelUpdateConfig="cancelUpdateConfig"/>
  </div>
</template>

<script setup name="Node">
import {ref, reactive, shallowRef, onMounted, getCurrentInstance, defineAsyncComponent} from "vue";
import {nodeConfig} from "../../config/nodeConfig";
import Drawer from "./Drawer";

const props = defineProps({
  node: { // 传入的流程配置数据
    type: Object,
    default: {}
  },
});

const { proxy } = getCurrentInstance();

// 节点配置数据
const config = ref(nodeConfig[props.node.nodeType])

// 加载节点组件
const modules = import.meta.glob('../*/*Node.vue')
const nodeComponents = shallowRef({});
Object.keys(nodeConfig).forEach(key => {
  let component = defineAsyncComponent(modules[`../${key}/${key}Node.vue`])
  nodeComponents.value[key] = component
})

onMounted(async () => {

});

// 显示节点配置组件
const showNodeDrawer = () => {
  if(config.value.hasDrawer) {
    proxy.$refs.nodeDrawer.show(props.node)
  }
}

// 更新节点配置属性
const updateConfig = (data) => {
  console.info("updateConfig", data)
  props.node.config = data
}

// 取消更新节点配置属性
const cancelUpdateConfig = () => {

}


</script>

<style lang="less" scoped>
.ep-node {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  margin: 0px 100px;
}

.ep-node-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 200px;
  min-height: 80px;
  border-radius: 5px;
  font-size: 14px;
  box-shadow: 1px 1px 6px -2px;
  white-space: normal;
  word-break: break-word;

  .ep-node-header {
    width: 100%;
    display: flex;
    align-items: center;
    background-color: #1e83e9;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    padding: 5px 10px;
    color: #FFFFFF;

    .ep-node-header-title {
      flex: 1;
      margin-left: 4px
    }

    .ep-node-close {
      font-size: 16px;
      text-align: center;
      cursor: pointer;
    }
  }
  .ep-node-body {
    width: 100%;
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    background-color: #FFFFFF;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
    padding: 10px;
    color: #5a5e66;
    cursor: pointer;
  }
}

.ep-node-add {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 30px 0px;

  .ep-node-add-btn {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 30px;
    height: 30px;
    border-radius: 40px;
    background-color: #1c84c6;
    cursor: pointer;
    box-shadow: 1px 1px 6px -2px;
    position: relative;

    .ep-node-add-btn-icon {
      font-size: 20px;
      font-weight: bold;
      color: #FFFFFF;
    }
  }

  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: -1;
    margin: auto;
    width: 2px;
    height: 100%;
    background-color: #cacaca
  }
}

</style>
