<template>
  <div class="ep-node-add">
    <div class="ep-node-add-btn" v-on:mouseenter="showAddSelect(true)" v-on:mouseleave="showAddSelect(false)">
      <el-icon class="ep-node-add-btn-icon"><Plus /></el-icon>
      <div class="ep-node-add-select">
        <div class="ep-node-add-select-box" v-if="isShowAddSelect">
          <div :class="{'ep-node-add-select-item': true, 'ep-node-add-selected': item.selected}" v-for="item in nodeSelect" v-on:click="addNode(item.type)" v-on:mouseenter="addNodeSelected(item, true)" v-on:mouseleave="addNodeSelected(item, false)">
            <svg-icon :icon-class="item.icon.name" class="ep-node-add-select-item-icon" :color="item.selected ? '#FFFFFF' : item.icon.color"/>
            <div class="ep-node-add-select-item-title">
              {{item.title}}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup name="AddNode">
import {ref, reactive, shallowRef, onMounted, getCurrentInstance, defineAsyncComponent} from "vue";
import {nodeConfig} from "../../config/nodeConfig";
import {copy} from "../../utils/tools";

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
    let childNode = copy(props.node.childNode)
    addNode.childNode = childNode
    console.info("addNode", addNode)
    props.node.childNode = addNode
    console.info("props.node.childNode", props.node.childNode)
  }
}
</script>

<style lang="less" scoped>
.ep-node-add {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 30px 0px;

  .ep-node-add-btn {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 30px;
    height: 30px;
    border-radius: 40px;
    background-color: #1c84c6;
    box-shadow: 5px 5px 10px 2px rgba(0, 0, 0, 0.2);
    position: relative;

    .ep-node-add-btn-icon {
      font-size: 20px;
      font-weight: bold;
      color: #FFFFFF;
      cursor: pointer;
    }

    .ep-node-add-select {
      position: relative;
      width: 0px;
      height: 100%;

      .ep-node-add-select-box {
        position: absolute;
        z-index: 3;
        top: 50%;
        transform: translateY(-50%);
        left: 25px;
        //width: 100px;
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
          left: -20px;
          transform: translateY(-50%);
          border-color: transparent #FFFFFF transparent transparent;
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
