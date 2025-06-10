<template>
  <div class="ep-node-add">
    <div ref="nodeAddBtn" class="ep-node-add-btn" v-on:mouseenter="showAddSelect(true)" v-on:mouseleave="showAddSelect(false)">
      <svg-icon icon-class="plus" class="ep-node-add-btn-icon" color="#FFFFFF"/>
      <div ref="nodeAddSelect" :class="['ep-node-add-select-box', nodeAddSelectPostion == 1 ? 'ep-node-add-left' : 'ep-node-add-right']" v-if="isShowAddSelect">
        <div :class="{'ep-node-add-select-item': true, 'ep-node-add-selected': item.selected}" v-for="item in nodeSelect" v-on:click="addNode(item.type)" v-on:mouseenter="addNodeSelected(item, true)" v-on:mouseleave="addNodeSelected(item, false)">
          <svg-icon :icon-class="item.icon.name" class="ep-node-add-select-item-icon" :color="item.selected ? '#FFFFFF' : item.icon.color"/>
          <div class="ep-node-add-select-item-title">
            {{item.title}}
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup name="AddNode">
import {ref, onMounted, getCurrentInstance} from "vue";
import {nodeConfig} from "../../config/nodeConfig";
import {copy, getUUID} from "../../utils/tools";

const props = defineProps({
  node: { // 传入的流程节点数据
    type: Object,
    default: {}
  },
});

const { proxy } = getCurrentInstance();

// 节点配置数据
const config = ref(nodeConfig[props.node.nodeType])

// 是否显示添加节点选择框
const isShowAddSelect = ref(false)
const nodeAddSelectPostion = ref(null)
const nodeSelect = ref([])

Object.keys(nodeConfig).forEach(key => {
  let item = nodeConfig[key]
  // 生成可增加节点数据
  if(item.canAdd) {
    nodeSelect.value.push({
      "title": item.title,
      "type": key,
      "icon": item.icon,
      "isSelected": false
    })
  }
})

onMounted(async () => {

});

// 显示添加节点选择框
const showAddSelect = (flag) => {
  isShowAddSelect.value = flag
  if(flag) {
    proxy.$nextTick(()=> {
      let box = proxy.$refs.nodeAddSelect.getBoundingClientRect()
      let boxWidth = box.width
      let btn = proxy.$refs.nodeAddBtn.getBoundingClientRect()
      let btnRight = btn.right

      const windowWidth = window.innerWidth;
      if((btnRight + boxWidth) > windowWidth) {
        nodeAddSelectPostion.value = 1
      } else {
        nodeAddSelectPostion.value = 2
      }
    })
  }
}

const addNodeSelected = (item, flag) => {
  if (flag) {
    item.selected = true
  } else {
    item.selected = false
  }
}

// 添加节点
const addNode = (nodeType) => {
  let typeConfig = nodeConfig[nodeType]
  if(typeConfig) {
    let addNode = copy(typeConfig.defaultNode)
    // 生成临时节点ID
    addNode.tempNodeId = getUUID()
    let childNode = copy(props.node.childNode)
    addNode.childNode = childNode
    props.node.childNode = addNode
  }
  showAddSelect(false)
}
</script>

<style lang="less" scoped>
.ep-node-add {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px 0px;

  .ep-node-add-btn {
    position: absolute;
    z-index: 10;
    left: 50%;
    top: 50%;
    transform: translateX(-50%) translateY(-60%);
    display: flex;
    justify-content: center;
    align-items: center;
    width: 30px;
    height: 30px;
    border-radius: 40px;
    background-color: #1c84c6;
    box-shadow: 5px 5px 10px 2px rgba(0, 0, 0, 0.2);
    transition-property: width, height;
    transition-duration: 0.1s;

    &:hover {
      width: 35px;
      height: 35px;
    }

    .ep-node-add-btn-icon {
      font-size: 20px;
      font-weight: bold;
      color: #FFFFFF;
      cursor: pointer;
    }

    .ep-node-add-select-box {
      position: absolute;
      z-index: 10;
      top: 50%;
      transform: translateY(-50%);
      height: 80px;
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
        transform: translateY(-50%);
      }

      .ep-node-add-select-item {
        width: 80px;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin: 0px 10px;
        cursor: pointer;
        border: 1px solid #ccc;
        border-radius: 100px;
        color: #5a5e66;

        .ep-node-add-select-item-icon {
          width: 35px;
          height: 35px;
        }
        .ep-node-add-select-item-title {
          font-size: 14px;
        }
      }

      .ep-node-add-selected {
        background-color: #1e83e9!important;
        color: #FFFFFF!important;
      }
    }

    .ep-node-add-left {
      right: 50px;

      &:before {
        right: -20px;
        border-color: transparent transparent transparent #FFFFFF;
      }
    }

    .ep-node-add-right {
      left: 50px;

      &:before {
        left: -20px;
        border-color: transparent #FFFFFF transparent transparent;
      }
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
