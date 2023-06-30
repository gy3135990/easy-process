<template>
  <div class="ep-node-wrap" v-if="props.node">
    <RouterNode :node="props.node" @removeNode="removeNode" v-if="props.node.nodeType == 'router'"/>
    <Node :node="props.node" :canRemoved="props.canRemoved" @removeNode="removeNode" v-else/>
    <!-- 子节点 -->
    <NodeWrap :node="props.node.childNode" @removeNode="removeChildNode" v-if="props.node.childNode && props.node.childNode.nodeType" />
  </div>
</template>

<script setup name="NodeWrap">
import {ref, reactive, shallowRef, onMounted, getCurrentInstance, defineAsyncComponent} from "vue";
import {nodeConfig} from "../config/nodeConfig";
import Node from "./base/Node";
import RouterNode from "./router/RouterNode";

const props = defineProps({
  node: { // 当前流程节点数据
    type: Object,
    default: {}
  },
  canRemoved: { // 当前节点是否可以移除
    type: Boolean,
    default: true
  },
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
.ep-node-wrap {

}

</style>
