<template>
  <div :class="{'ep-node': true, 'ep-node-arrows': !isStart}">
    <div :class="{'ep-node-content': true, 'ep-node-error': !validatorResult.valid}" @mouseenter="mouseenter(true)" @mouseleave="mouseleave(false)">
      <div class="ep-node-header" :style="{color: config.color, 'background-color': config.bgColor}">
        <svg-icon :icon-class="config.icon.name" class="ep-node-icon" color="#FFFFFF"/>
        <div class="ep-node-header-title">{{config.title}}</div>
        <svg-icon icon-class="close" class="ep-node-close" color="#FFFFFF" v-if="props.canRemoved && config.canRemoved" @click="removeNode"/>
      </div>
      <div class="ep-node-body" @click="showNodeDrawer">
        <component ref="node" :is="nodeComponents[props.node.nodeType]" :node="props.node" :bizData="props.bizData" @validator="validator"/>
      </div>

      <div class="ep-node-move ep-node-move-left" v-if="isShowLeftMoveBtn">
        <svg-icon icon-class="left" class="ep-node-move-icon" :color="isSelectedLeftMoveBtn ? '#1e83e9' : '#696969'" @click="moveNode(1)" @mouseenter="selectedMoveBtn(1, true)" @mouseleave="selectedMoveBtn(1, false)"/>
      </div>
      <div class="ep-node-move ep-node-move-right" v-if="isShowRightMoveBtn">
        <svg-icon icon-class="right" class="ep-node-move-icon" :color="isSelectedRightMoveBtn ? '#1e83e9' : '#696969'" @click="moveNode(2)" @mouseenter="selectedMoveBtn(2, true)" @mouseleave="selectedMoveBtn(2, false)"/>
      </div>
      <div class="ep-node-error-msg" v-if="!validatorResult.valid">
        <div class="ep-node-error-msg-box">
          <svg-icon icon-class="tips" class="ep-node-error-icon" color="red" @mouseenter="showErrorTips(true)" @mouseleave="showErrorTips(false)"/>
          <div class="ep-node-error-tips" v-if="errorTips && validatorResult.message">{{validatorResult.message}}</div>
        </div>
      </div>
    </div>
    <AddNode :node="props.node"/>

    <!-- 节点配置Drawer -->
    <BaseDrawer ref="nodeDrawer" @updateConfig="updateConfig" @cancelUpdateConfig="cancelUpdateConfig"/>
  </div>
</template>

<script setup name="BaseNode">
import BaseDrawer from "./BaseDrawer";
import AddNode from "./AddNode";
import {ref, reactive, shallowRef, onMounted, getCurrentInstance, defineAsyncComponent, watch, computed, onUnmounted} from "vue";
import {nodeConfig} from "../../config/nodeConfig";
import {copy, getUUID} from "../../utils/tools";
import {START, CONDITION} from "../../config/nodeType"

const props = defineProps({
  node: { // 传入的流程节点数据
    type: Object,
    default: {}
  },
  bizData: { // 业务数据
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
  },
  validator: {
    type: Object
  }
});

const { proxy } = getCurrentInstance();

const nodeId = getUUID()

// 节点配置数据
const config = ref(nodeConfig[props.node.nodeType])
watch(
    () => props.node,
    (val) => {
      config.value = nodeConfig[props.node.nodeType]
      props.validator.validate()
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

// 节点左右移动按钮状态
const isShowLeftMoveBtn = ref(false)
const isSelectedLeftMoveBtn = ref(false)
const isShowRightMoveBtn = ref(false)
const isSelectedRightMoveBtn = ref(false)

// 验证结果
const validatorResult = ref({valid: true})
const errorTips = ref(false)

onMounted(async () => {

});

onUnmounted(async () => {
  props.validator.removeNodeRules(nodeId)
  props.validator.validate()
});

const isStart = computed(() => {
  return props.node.nodeType == START
})

// 显示节点配置组件
const showNodeDrawer = () => {
  if(config.value.hasDrawer) {
    if(props.node.nodeType == CONDITION && props.node.isLastCondition) {
      return false;
    }
    proxy.$refs.nodeDrawer.show(props.node, props.bizData)
  }
}

// 移除当前节点
const emit = defineEmits(["removeNode"]);
const removeNode = () => {
  emit("removeNode");
}

// 鼠标移入事件
const mouseenter = () => {
  showMoveBtn(1, true)
  showMoveBtn(2, true)
}

// 鼠标移出事件
const mouseleave = () => {
  showMoveBtn(1, false)
  showMoveBtn(2, false)
}

// 节点左右移动按钮状态
const showMoveBtn = (direction, flag) => {
  let index = props.conditionIndex
  let length = props.conditionNodes.length
  if(props.node.nodeType == CONDITION && index != length - 1) {
    if(direction == 1 && index != 0) {
      isShowLeftMoveBtn.value = flag
    } else if (direction == 2 && index != length - 2) {
      isShowRightMoveBtn.value = flag
    }

  }
}

const selectedMoveBtn = (direction, flag) => {
  if (direction == 1) {
    isSelectedLeftMoveBtn.value = flag
  } else {
    isSelectedRightMoveBtn.value = flag
  }
}

/**
 * 移动节点
 * @param direction 方向：1-左移 2-右移
 */
const moveNode = (direction) => {
  let index = props.conditionIndex
  let length = props.conditionNodes.length
  if (direction == 1) {
    let c = props.conditionNodes[index]
    props.conditionNodes[index] = props.conditionNodes[index - 1]
    props.conditionNodes[index - 1] = c

  } else {
    let c = props.conditionNodes[index]
    props.conditionNodes[index] = props.conditionNodes[index + 1]
    props.conditionNodes[index + 1] = c
  }
}

// 更新节点配置属性
const updateConfig = (data) => {
  props.node.config = data
  props.validator.validate()
}

// 取消更新节点配置属性
const cancelUpdateConfig = () => {
  props.validator.validate()
}

// 注册验证器
const validator = (fun) => {
  if(fun && fun instanceof Function) {
    props.validator.registerNodeRules(nodeId, () => {
      let result = fun()
      validatorResult.value = result
      return result
    })
  }
}

const showErrorTips = (flag) => {
  errorTips.value = flag
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

.ep-node-arrows {
  &:before {
    content: "";
    position: absolute;
    top: -12px;
    left: 50%;
    -webkit-transform: translateX(-50%);
    transform: translateX(-50%);
    width: 0;
    height: 4px;
    border-style: solid;
    border-width: 8px 6px 4px;
    border-color: #cacaca transparent transparent;
    background: #f5f5f7
  }
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
  position: relative;
  box-sizing: border-box;

  .ep-node-header {
    width: 100%;
    display: flex;
    align-items: center;
    background-color: #1e83e9;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    padding: 5px 10px;
    color: #FFFFFF;
    box-sizing: border-box;

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
    box-sizing: border-box;
  }
}

.ep-node-error {
  border: 2px solid red;
}
.ep-node-error-msg {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: -55px;
  z-index: 1;

  .ep-node-error-msg-box {
    position: relative;
    .ep-node-error-icon {
      width: 25px;
      height: 25px;
      cursor: pointer;
    }
    .ep-node-error-tips {
      position: absolute;
      z-index: 3;
      top: 50%;
      transform: translateY(-50%);
      left: 45px;
      min-width: 150px;
      background-color: #FFFFFF;
      border-radius: 5px;
      box-shadow: 5px 5px 10px 2px rgba(0, 0, 0, 0.2);
      display: flex;
      padding: 16px;


      &:before{
        content: '';
        width: 0;
        height: 0;
        border: 10px solid;
        position: absolute;
        top: 50%;
        left: -20px;
        transform: translateY(-50%);
        border-color: transparent #FFFFFF transparent transparent;
      }
    }
  }

}

.ep-node-move {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
}
.ep-node-move-left {
  left: -30px;
}
.ep-node-move-right {
  right: -30px;
}
.ep-node-move-icon {
  width: 35px;
  height: 35px;
  cursor: pointer;
}
</style>
