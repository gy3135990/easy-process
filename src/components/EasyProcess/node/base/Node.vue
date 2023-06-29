<template>
  <div class="ep-node">
    <div class="ep-node-content" @click="showNodeDrawer">
      <div class="ep-node-header" :style="{color: config.color, 'background-color': config.bgColor}">
        <slot name="icon"></slot>
        <div class="ep-node-header-title">{{config.title}}</div>
        <el-icon class="ep-node-close" v-if="config.canRemoved"><CloseBold /></el-icon>
      </div>
      <div class="ep-node-body">
        <component :is="nodeComponents[props.node.nodeType]" :node="props.node"/>
      </div>
    </div>
    <div class="ep-node-add">
      <div class="ep-node-add-btn" v-on:mouseenter="showAddSelect(true)" v-on:mouseleave="showAddSelect(false)">
        <el-icon class="ep-node-add-btn-icon"><Plus /></el-icon>
        <div class="ep-node-add-select">
          <div class="ep-node-add-select-box" v-if="isShowAddSelect" v-on:mouseenter="showAddSelect(true)" v-on:mouseleave="showAddSelect(false)">
            <div class="ep-node-add-select-item" v-for="item in nodeSelect">
<!--              <img class="ep-node-add-select-item-icon" :src="nodeIcon(item.nodeType)" />-->

              <svg-icon :icon-class="item.nodeType" class="ep-node-add-select-item" color="#1c84c6"/>
              <div class="ep-node-add-select-item-title">
                {{item.title}}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 节点配置Drawer -->
    <Drawer ref="nodeDrawer" @updateConfig="updateConfig" @cancelUpdateConfig="cancelUpdateConfig"/>
  </div>
</template>

<script setup name="Node">
import {ref, reactive, shallowRef, onMounted, getCurrentInstance, defineAsyncComponent} from "vue";
import {nodeConfig} from "../../config/nodeConfig";
import Drawer from "./Drawer";
import {nodeIcon} from "../../utils/tools";

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
const isShowAddSelect = ref(true)
const nodeSelect = ref([])


const modules = import.meta.glob('../*/*Node.vue')
const nodeComponents = shallowRef({});

Object.keys(nodeConfig).forEach(key => {
  let item = nodeConfig[key]
  // 加载节点组件
  let component = defineAsyncComponent(modules[`../${key}/${key}Node.vue`])
  nodeComponents.value[key] = component

  // 生成可增加节点数据
  if(item.canAdd) {
    nodeSelect.value.push({
      "title": item.title,
      "nodeType": key
    })
  }
})

onMounted(async () => {

});

// 显示节点配置组件
const showNodeDrawer = () => {
  if(config.value.hasDrawer) {
    proxy.$refs.nodeDrawer.show(props.node)
  }
}

// 更新节点配置属性
const updateConfig = (data) => {
  console.info("updateConfig", data)
  props.node.config = data
}

// 取消更新节点配置属性
const cancelUpdateConfig = () => {

}

// 显示添加节点选择框
let addSelectTimeout
const showAddSelect = (flag) => {
  /*if(flag) {
    clearTimeout(addSelectTimeout)
    isShowAddSelect.value = flag
  } else {
    addSelectTimeout = setTimeout(()=> {
      isShowAddSelect.value = flag
    }, 300)
  }*/
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

.ep-node-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 200px;
  min-height: 80px;
  border-radius: 5px;
  font-size: 14px;
  box-shadow: 5px 5px 10px 5px #5a5e66;
  white-space: normal;
  word-break: break-word;

  .ep-node-header {
    width: 100%;
    display: flex;
    align-items: center;
    background-color: #1e83e9;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    padding: 5px 10px;
    color: #FFFFFF;

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
  }
}

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
    cursor: pointer;
    box-shadow: 1px 1px 10px 1px #5a5e66;
    position: relative;

    .ep-node-add-btn-icon {
      font-size: 20px;
      font-weight: bold;
      color: #FFFFFF;
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
        //flex-flow: row wrap;

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
          .ep-node-add-select-item-icon {
            width: 35px;
            height: 35px;
          }
          .ep-node-add-select-item-title {
            color: #5a5e66;
            font-size: 14px;
          }
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
