<template>
  <div id="ep-container" class="ep-container" @mousedown="startDragging">
    <!-- 流程 -->
    <div class="ep-process" :style="`transform: scale(${ zoom / 100});`">
      <!-- 递归节点 -->
      <NodeWrap v-if="processData && processData.nodeConfig" :node="processData.nodeConfig"/>
      <!-- 结束节点 -->
      <EndNode/>
    </div>
    <!-- 缩放 -->
    <div class="ep-zoom">
      <svg-icon icon-class="subtract" class="ep-zoom-icon" color="#ffffff" @click="setZoom(1)"/>
      <span>{{ zoom }}%</span>
      <svg-icon icon-class="plus" class="ep-zoom-icon" color="#ffffff" @click="setZoom(2)"/>
    </div>
  </div>
</template>

<script setup name="ep-designer">
import NodeWrap from "./node/node-wrap.vue";
import EndNode from "./node/end/end-node.vue";

import {ref, onMounted, getCurrentInstance, watch, provide, nextTick} from "vue";
import { defaultConfig } from "./config/default-config.js";
import { copy } from "./utils/tools.js";
import { createProcessCtrl } from "./utils/process-ctrl.js";
import { createValidator } from "./utils/validator.js";
import { KEY_PROCESS_CTRL, KEY_VALIDATOR, KEY_PROCESS_DATA } from "./config/keys.js"

const { proxy } = getCurrentInstance();

const props = defineProps({
  data: { // 传入的流程节点数据
    type: Object,
    default: {}
  }
});

// 缩放值
let zoom = ref(100);
// 创建流程控制器实例
let processCtrl = createProcessCtrl()
// 依赖注入: 流程控制器实例
provide(KEY_PROCESS_CTRL, processCtrl)
// 创建节点验证器实例
let validator = createValidator()
// 依赖注入: 节点验证器实例
provide(KEY_VALIDATOR, validator)

// 流程数据
let processData = ref({});
// 依赖注入: 流程数据
provide(KEY_PROCESS_DATA, processData)

watch(
    () => props.data,
    (val) => {
      init()
    }
);


onMounted(async () => {
  init()
});

/**
 * 设置缩放
 * @param type
 */
const setZoom = (type) => {
  if (type === 1) {
    if (zoom.value === 40) {
      return;
    }
    zoom.value -= 10;
  } else {
    if (zoom.value === 100) {
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
  nextTick(() => {
    validate()
  })
}

const validate = (callback) => {
  let result = validator.validate()
  if (callback && typeof callback === 'function') {
    callback(result.valid, result.messages)
  }
}

/**
 * 获取流程配置结果
 */
const getResult = () => {
  return copy(processData.value)
}

const getProcessCtrl = () => {
  return processCtrl
}

// 是否正在拖动
const isDragging = ref(false)
// 鼠标按下时的坐标
const startX = ref(0)
const startY = ref(0)
// 初始滚动位置
const scrollX = ref(0)
const scrollY = ref(0)

const startDragging = (event) => {
  isDragging.value = true;
  // 鼠标按下的位置
  startX.value = event.clientX;
  startY.value = event.clientY;
  const element = document.getElementById("ep-container");
  scrollX.value = element.scrollLeft; // 记录初始滚动位置
  scrollY.value = element.scrollTop; // 记录初始滚动位置
  document.addEventListener('mousemove', doDragging);
  document.addEventListener('mouseup', stopDragging);
}
const doDragging = (event) => {
  if (isDragging.value) {
    let deltaX = event.clientX - startX.value; // 计算鼠标移动的距离
    let deltaY = event.clientY - startY.value; // 计算鼠标移动的距离
    const element = document.getElementById("ep-container");
    element.scrollLeft = scrollX.value - deltaX; // 更新滚动位置
    element.scrollTop = scrollY.value - deltaY; // 更新滚动位置
  }
}
const stopDragging = () => {
  isDragging.value = false;
  document.removeEventListener('mousemove', doDragging);
  document.removeEventListener('mouseup', stopDragging);
}

defineExpose({
  validate,
  getResult,
  getProcessCtrl
});
</script>
<style lang="less" scoped>

.ep-container {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  background-color: #f5f5f7;
  overflow-x: auto;
  overflow-y: auto;
  padding: 16px;
  &:active {
    cursor: all-scroll;
  }
}

.ep-process {
  position: relative;
  width: max-content;
  height: 100%;
  margin: auto;
}

.ep-zoom {
  display: flex;
  position: absolute;
  align-items: center;
  justify-content: space-between;
  height: 40px;
  width: 125px;
  right: 40px;
  top: 70px;
  z-index: 10
}

.ep-zoom-icon {
  width: 20px;
  height: 20px;
  cursor: pointer;
  background-color: #5a5e66;
  border-radius: 5px;
  padding: 3px;
}
</style>
