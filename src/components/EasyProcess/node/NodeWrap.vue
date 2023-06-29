<template>
  <div class="ep-node-wrap" v-if="props.node">
    <RouterNode :node="props.node" v-if="props.node.nodeType == 'router'"/>
    <Node :node="props.node" v-else/>
    <!-- 子节点 -->
    <NodeWrap :node="props.node.childNode" v-if="props.node.childNode && props.node.childNode.nodeType" />
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
});

const { proxy } = getCurrentInstance();

// 流程配置数据
let config = ref({});

onMounted(async () => {

});

</script>

<style lang="less" scoped>
.ep-node-wrap {

}

</style>
