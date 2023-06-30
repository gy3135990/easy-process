<template>
  <div class="ep-container">
    <!-- 流程 -->
    <div class="ep-process" :style="`transform: scale(${ zoom / 100});`">
      <NodeWrap v-if="processData && processData.nodeConfig" :node="processData.nodeConfig"/>
      <EndNode/>
    </div>
    <!-- 缩放 -->
    <div class="ep-zoom">
      <div class="ep-zoom-out" :class="zoom == 50 && 'disabled'" @click="setZoom(1)"></div>
      <span>{{ zoom }}%</span>
      <div class="ep-zoom-in" :class="zoom == 300 && 'disabled'" @click="setZoom(2)"></div>
    </div>
  </div>
</template>

<script setup name="ProcessDesigner">
import NodeWrap from "./node/NodeWrap";
import EndNode from "./node/end/EndNode";

import {ref, reactive, onMounted, getCurrentInstance, toRaw, watch} from "vue";
import {defaultConfig} from "./config/defaultConfig";
import {copy} from "./utils/tools";
import {nodeConfig} from "./config/nodeConfig";

const { proxy } = getCurrentInstance();

const props = defineProps({
  data: { // 传入的流程节点数据
    type: Object,
    default: {}
  },
});

// 缩放值
let zoom = ref(100);

// 流程数据
let processData = ref({});
watch(
    () => props.data,
    (val) => {
      console.info("watch processData")
      init()
    }
);

onMounted(async () => {
  init()
});

/**
 * 设置绽放
 * @param type
 */
const setZoom = (type) => {
  if (type == 1) {
    if (zoom.value == 50) {
      return;
    }
    zoom.value -= 10;
  } else {
    if (zoom.value == 300) {
      return;
    }
    zoom.value += 10;
  }
};

// 初始化流程
const init = () => {
  if(props.data && props.data.nodeConfig) {
    processData.value = copy(props.data)
  } else {
    processData.value = copy(defaultConfig)
  }
}

/**
 * 获取流程配置结果
 */
const getResult = () => {
  return copy(processData.value)
}

defineExpose({
  getResult
});
</script>
<style lang="less" scoped>

.ep-container {
  position: relative;
  display: flex;
  justify-content: center;
  box-sizing: border-box;
  padding: 16px;
  width: 100%;
  height: 100%;
  background-color: #f5f5f7;
  overflow-x: hidden;
  overflow-y: auto;
}

.ep-process {
  width: 100%;
}

.ep-zoom {
  display: flex;
  position: absolute;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  height: 40px;
  width: 125px;
  right: 40px;
  margin-top: 30px;
  z-index: 10
}

.ep-zoom .ep-zoom-in,
.ep-zoom .ep-zoom-out {
  width: 30px;
  height: 30px;
  background: #fff;
  color: #c1c1cd;
  cursor: pointer;
  background-size: 100%;
  background-repeat: no-repeat;
}

.ep-zoom .ep-zoom-out {
  background-image: url(https://gw.alicdn.com/tfs/TB1s0qhBHGYBuNjy0FoXXciBFXa-90-90.png)
}

.ep-zoom .ep-zoom-out.disabled {
  opacity: .5
}

.ep-zoom .ep-zoom-in {
  background-image: url(https://gw.alicdn.com/tfs/TB1UIgJBTtYBeNjy1XdXXXXyVXa-90-90.png)
}

.ep-zoom .ep-zoom-in.disabled {
  opacity: .5
}
</style>
