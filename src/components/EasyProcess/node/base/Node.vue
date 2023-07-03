<template>
  <div class="ep-node">
    <div class="ep-node-content">
      <div class="ep-node-header" :style="{color: config.color, 'background-color': config.bgColor}">
        <svg-icon :icon-class="config.icon.className" class="ep-node-icon" color="#FFFFFF"/>
        <div class="ep-node-header-title">{{config.title}}</div>
<!--        <el-icon class="ep-node-close" v-if="props.canRemoved && config.canRemoved" @click="removeNode"><CloseBold /></el-icon>-->
        <svg-icon icon-class="close" class="ep-node-close" color="#FFFFFF" v-if="props.canRemoved && config.canRemoved" @click="removeNode"/>
      </div>
      <div class="ep-node-body" @click="showNodeDrawer">
        <component :is="nodeComponents[props.node.nodeType]" :node="props.node"/>
      </div>
    </div>
    <AddNode :node="props.node"/>
    <!-- 节点配置Drawer -->
    <Drawer ref="nodeDrawer" @updateConfig="updateConfig" @cancelUpdateConfig="cancelUpdateConfig"/>
  </div>
</template>

<script setup name="Node">
import {ref, reactive, shallowRef, onMounted, getCurrentInstance, defineAsyncComponent, watch} from "vue";
import {nodeConfig} from "../../config/nodeConfig";
import Drawer from "./Drawer";
import AddNode from "./AddNode";
import {copy} from "../../utils/tools";

const props = defineProps({
  node: { // 传入的流程节点数据
    type: Object,
    default: {}
  },
  canRemoved: { // 当前节点是否可以移除
    type: Boolean,
    default: true
  },
});

const { proxy } = getCurrentInstance();

// 节点配置数据
const config = ref(nodeConfig[props.node.nodeType])
watch(
    () => props.node,
    (val) => {
      config.value = nodeConfig[props.node.nodeType]
    }
);

const modules = import.meta.glob('../*/*Node.vue')
const nodeComponents = shallowRef({});

Object.keys(nodeConfig).forEach(key => {
  let item = nodeConfig[key]
  // 加载节点组件
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

// 移除当前节点
const emit = defineEmits(["removeNode"]);
const removeNode = () => {
  emit("removeNode");
}

// 更新节点配置属性
const updateConfig = (data) => {
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
  box-shadow: 5px 5px 10px 2px rgba(0, 0, 0, 0.2);
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

    .ep-node-icon {
      font-size: 16px;
    }

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
</style>
