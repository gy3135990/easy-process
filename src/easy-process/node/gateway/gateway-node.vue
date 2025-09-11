<template>
  <!-- 路由节点 -->
  <div class="ep-node-gateway">
    <div class="ep-node-gateway-body">
      <ep-svg-icon :icon-class="currentGatewayType.icon" class="icon" v-if="currentGatewayType"/>
      <div class="select-type-box">
        <div class="type-item"  @click="addBranch">
          <ep-svg-icon icon-class="ep-gateway" class="type-item-icon"/>
          <div class="type-item-title">添加分支</div>
        </div>
        <div class="type-item" v-if="gatewayTypeList && gatewayTypeList.length>1" v-for="item in gatewayTypeList" @click="selectGatewayType(item.type)">
          <ep-svg-icon :icon-class="item.icon" class="type-item-icon"/>
          <div class="type-item-title">
            {{item.name}}
          </div>
        </div>
      </div>
    </div>
    <div class="ep-node-gateway-box">
      <div class="ep-node-gateway-col" v-for="(condition, index) in props.node.branchList">
        <!-- 生成节点 -->
        <node-wrap :node="condition" :branchList="props.node.branchList" :conditionIndex="index" @removeNode="removeCondition(index)"/>
        <!-- 用来遮挡最左列的线 -->
        <template v-if="index === 0">
          <div class="cover-line top-left-cover-line"></div>
          <div class="cover-line bottom-left-cover-line"></div>
        </template>
        <!-- 用来遮挡最右列的线 -->
        <template v-if="index === props.node.branchList.length - 1">
          <div class="cover-line top-right-cover-line"></div>
          <div class="cover-line bottom-right-cover-line"></div>
        </template>
      </div>
    </div>
    <add-node :node="props.node"/>
  </div>
</template>

<script setup name="router-node">
import NodeWrap from "../node-wrap.vue";
import AddNode from "../base/add-node.vue";
import {ref, onMounted, getCurrentInstance, computed} from "vue";
import {CONDITION} from "../../config/default-node-type.js"
import {gatewayTypeConfig, defaultGatewayType} from "../../config/gateway-type.js"
import {createNode} from "../../tools/node-tools.js";

const props = defineProps({
  node: { // 传入的流程配置数据
    type: Object,
    default: {}
  }
});

const { proxy } = getCurrentInstance();

const currentGatewayType = computed(() => {
  return gatewayTypeConfig[props.node.gatewayType]
})

const gatewayTypeList = computed(() => {
  let gatewayTypeList = []
  Object.keys(gatewayTypeConfig).forEach(key => {
    let item = gatewayTypeConfig[key]
    if(item.enable) {
      gatewayTypeList.push(item)
    }
  })
  return gatewayTypeList
})

onMounted(async () => {
  if (!props.node.gatewayType || !currentGatewayType) {
    props.node.gatewayType = defaultGatewayType
  }
});

const selectGatewayType = (gatewayType) => {
  props.node.gatewayType = gatewayType
}

// 移除条件
const emit = defineEmits(["removeNode"]);
const removeCondition = (index) => {
  let conditionNum = props.node.branchList.length
  if(conditionNum > 2) {
    props.node.branchList.splice(index, 1)
  } else {
    props.node.branchList.splice(index, 1)
    emit("removeNode")
  }
}

// 添加分支
const addBranch = () => {
  let defaultNode = createNode(CONDITION)
  props.node.branchList.push(defaultNode)
}
</script>

<style lang="less" scoped>
.ep-node-gateway {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  position: relative;

}
.ep-node-gateway-box {
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100%;

  .ep-node-gateway-col {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    border-top: 2px solid #cacaca;
    border-bottom: 2px solid #cacaca;
    background-color: #f5f5f7;

    padding-top: 50px;

    &:before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 0;
      margin: auto;
      width: 2px;
      height: 100%;
      background-color: #cacaca
    }
  }

  .cover-line {
    position: absolute;
    height: 8px;
    width: 50%;
    background-color: #f5f5f7;
  }
  .top-left-cover-line {
    top: -4px;
    left: -1px
  }
  .top-right-cover-line {
    top: -4px;
    right: -1px
  }

  .bottom-left-cover-line {
    bottom: -4px;
    left: -1px
  }
  .bottom-right-cover-line{
    bottom: -4px;
    right: -1px
  }
}
.ep-node-gateway-body {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: -17px;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
  width: 35px;
  height: 35px;
  cursor: pointer;

  &::before {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 50%;
    right: -20px;
    transform: translateX(-50%) rotate(45deg);
    background-color: #FFFFFF;
    border-radius: 5px;
    box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.3);
  }

  &:hover {
    .select-type-box {
      display: flex;
    }
  }

  .icon {
    font-size: 20px;
  }

  .add {
    font-size: 12px;
    color: #1e83e9;
  }

  .select-type-box {
    position: absolute;
    z-index: 10;
    right: -20px;
    transform: translateX(100%);
    top: revert-layer;
    background-color: #FFFFFF;
    border-radius: 5px;
    box-shadow: 5px 5px 10px 2px rgba(0, 0, 0, 0.2);
    display: none;

    &:hover {
      display: flex;
    }

    &:before{
      content: '';
      width: 0;
      height: 0;
      border: 10px solid;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      left: -20px;
      border-color: transparent #FFFFFF transparent transparent;
    }

    .type-item {
      width: 60px;
      display: flex;
      flex-direction: column;
      //justify-content: center;
      align-items: center;
      padding: 10px;
      border-radius: 5px;
      cursor: pointer;
      color: #5a5e66;

      &:hover {
        background-color: #499aec;
        color: #FFFFFF;
      }

      .type-item-icon {
        width: 20px;
        height: 20px;
      }
      .type-item-title {
        margin-top: 5px;
        font-size: 14px;
      }
    }
  }
}

</style>
