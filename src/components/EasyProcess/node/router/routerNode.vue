<template>
  <!-- 路由节点 -->
  <div class="ep-node-router">
    <div class="ep-condition-node-add">添加条件</div>
    <div class="ep-node-router-box">
      <div class="ep-node-router-col" v-for="(condition, index) in props.node.conditionNodes">
        <!-- 生成节点 -->
        <NodeWrap :node="condition"/>
        <!-- 用来遮挡最左列的线 -->
        <template v-if="index == 0">
          <div class="cover-line top-left-cover-line"></div>
          <div class="cover-line bottom-left-cover-line"></div>
        </template>
        <!-- 用来遮挡最右列的线 -->
        <template v-if="index == props.node.conditionNodes.length - 1">
          <div class="cover-line top-right-cover-line"></div>
          <div class="cover-line bottom-right-cover-line"></div>
        </template>
      </div>
    </div>
    <div class="ep-node-add">
      <div class="ep-node-add-btn">
        <el-icon class="ep-node-add-btn-icon"><Plus /></el-icon>
      </div>
    </div>
  </div>
</template>

<script setup name="RouterNode">
import NodeWrap from "../NodeWrap";
import {ref, reactive, onMounted, getCurrentInstance} from "vue";

const props = defineProps({
  node: { // 传入的流程配置数据
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
.ep-node-router {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  position: relative;

}
.ep-node-router-box {
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100%;

  .ep-node-router-col {
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
.ep-node-add {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 30px 0px;
  position: relative;

  .ep-node-add-btn {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 30px;
    height: 30px;
    border-radius: 40px;
    background-color: #1c84c6;
    cursor: pointer;
    box-shadow: 1px 1px 6px -2px;

    .ep-node-add-btn-icon {
      font-size: 20px;
      font-weight: bold;
      color: #FFFFFF;
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

.ep-condition-node-add {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: -15px;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
  width: 70px;
  height: 30px;
  font-size: 12px;
  color: #1c84c6;
  background-color: #FFFFFF;
  border-radius: 20px;
  cursor: pointer;
}
</style>
