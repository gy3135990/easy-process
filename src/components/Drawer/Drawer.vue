<template>
  <Teleport to="body" v-if="props.modelValue">
    <div class="drawer">
      <!-- header -->
      <div class="drawer-header" v-if="!props.withHeader">
        <svg-icon :icon-class="props.icon" class="drawer-header-icon" color="#5a5e66" v-if="props.icon"/>
        <div class="drawer-header-title">{{props.title}}</div>
        <svg-icon icon-class="close" class="drawer-header-close" color="#5a5e66"/>
      </div>
      <!-- body -->
      <div class="drawer-body">
        <slot></slot>
      </div>
      <!-- footer -->
      <div class="drawer-footer">
        <slot name="footer">

        </slot>
      </div>
    </div>
    <!-- 遮罩 -->
    <div class="drawer-overlay"></div>
  </Teleport>
</template>

<script setup name="Drawer">
import {ref, reactive, onMounted, getCurrentInstance} from "vue";

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  title: {
    type: String,
    default: null
  },
  icon: {
    type: String,
    default: null
  },
  'z-index': {
    type: Number,
    default: 2000
  },
  'with-header': { // 控制是否显示 header 栏, 默认为 true, 当此项为 false 时, title attribute 和 title slot 均不生效
    type: Boolean,
    default: false
  },
});

const { proxy } = getCurrentInstance();

const close = () => {
  proxy.$emit("update:modelValue", false)
}

</script>

<style lang="less" scoped>
.drawer {
  position: fixed;
  width: 500px;
  height: 100%;
  background-color: #FFFFFF;
  box-shadow: -5px -5px 10px 2px rgba(0, 0, 0, 0.2);
  top: 0;
  right: 0;
  z-index: v-bind("props.zIndex + 1");
  display: flex;
  flex-direction: column;
}

.drawer-header {
  padding: 16px;
  border-bottom: 1px solid #cacaca;
  min-height: 30px;
  display: flex;
  flex-direction: row;
  width: 100%;
  align-items: center;
  box-sizing: border-box;

  .drawer-header-icon {
    width: 20px;
    height: 20px;
    font-size: 16px;
    padding-right: 10px;
  }
  .drawer-header-title {
    flex: 1;
    color: #5a5e66;
    font-size: 16px;
    font-weight: bold;
  }
  .drawer-header-close {
    width: 20px;
    height: 20px;
    font-size: 16px;
    cursor: pointer;
  }
}

.drawer-body {
  flex: 1;
  padding: 16px;
  overflow-y: auto;
}

.drawer-footer {
  padding: 16px;
  display: flex;
  flex-direction: row;
  width: 100%;
  align-items: center;
  box-sizing: border-box;
  justify-content: right;
}
.drawer-overlay {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: v-bind("props.zIndex");
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  overflow: auto;
}
</style>