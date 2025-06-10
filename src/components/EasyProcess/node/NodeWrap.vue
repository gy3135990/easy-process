<template>
  <div class="ep-node-wrap" v-if="props.node">
    <!-- 路由节点 -->
    <RouterNode :node="props.node" @removeNode="removeNode" v-if="props.node.nodeType == ROUTER" :key="props.node.tempNodeId"/>
    <!-- 普通节点 -->
    <BaseNode :node="props.node" :conditionNodes="props.conditionNodes" :conditionIndex="props.conditionIndex" @removeNode="removeNode" :key="props.node.tempNodeId" v-else/>
    <!-- 子节点 -->
    <NodeWrap :node="props.node.childNode" @removeNode="removeChildNode" v-if="props.node.childNode && props.node.childNode.nodeType" />
  </div>
</template>

<script setup name="NodeWrap">
import BaseNode from "./base/BaseNode";
import RouterNode from "./router/RouterNode";
import {ref, onMounted, getCurrentInstance} from "vue";
import {ROUTER} from "../config/nodeType"

const props = defineProps({
  node: { // 当前流程节点数据
    type: Object,
    default: {}
  },
  conditionNodes: { // 条件集合，当节点类型为condition时有效
    type: Array,
    default: []
  },
  conditionIndex: { // 当前条件节点的顺序，当节点类型为condition时有效
    type: Number,
    default: 0
  },
  canRemoved: { // 当前节点是否可以移除
    type: Boolean,
    default: true
  }
});

const { proxy } = getCurrentInstance();

// 流程配置数据
let config = ref({});

onMounted(async () => {

});

// 移除当前节点
const emit = defineEmits(["removeNode"]);
const removeNode = () => {
  emit("removeNode");
}

// 移除子节点
const removeChildNode = () => {
  let nextChildNode = props.node.childNode.childNode
  props.node.childNode = nextChildNode
}
</script>

<style lang="less" scoped>

</style>
