<template>
  <div class="ep-node-wrap" v-if="props.node">
    <!-- 路由节点 -->
    <gateway-node :node="props.node" @removeNode="removeNode" v-if="props.node.nodeType === GATEWAY" :key="props.node.tmpNodeId"/>
    <!-- 普通节点 -->
    <base-node :node="props.node" :branchList="props.branchList" :conditionIndex="props.conditionIndex" @removeNode="removeNode" :key="props.node.tmpNodeId" v-else/>
    <!-- 子节点 -->
    <node-wrap :node="props.node.childNode" @removeNode="removeChildNode" v-if="props.node.childNode && props.node.childNode.nodeType" />
  </div>
</template>

<script setup name="NodeWrap">
import BaseNode from "./base/base-node.vue";
import GatewayNode from "./gateway/gateway-node.vue";
import {getCurrentInstance, onMounted, ref} from "vue";
import {GATEWAY} from "../config/default-node-type.js"

const props = defineProps({
  node: { // 当前流程节点数据
    type: Object,
    default: {}
  },
  branchList: { // 条件集合，当节点类型为condition时有效
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
  if (props.node.childNode.nodeType === GATEWAY) {
    let nextNode = props.node.childNode.branchList[0].childNode
    if (nextNode) {
      nextNode.childNode = props.node.childNode.childNode
    } else {
      nextNode = props.node.childNode.childNode
    }
    props.node.childNode = nextNode ? nextNode : null
  } else {
    props.node.childNode = props.node.childNode.childNode
  }
}
</script>

<style lang="less" scoped>

</style>
