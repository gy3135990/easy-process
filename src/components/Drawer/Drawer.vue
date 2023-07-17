<template>
  <Teleport to="body">
    <div class="drawer">
      <div class="drawer-header">
        <svg-icon icon-class="setting" class="drawer-header-icon" color="#5a5e66"/>
        <div class="drawer-header-title">标题</div>
        <svg-icon icon-class="close" class="drawer-header-close" color="#5a5e66"/>
      </div>
      <div class="drawer-body">
        <slot></slot>
      </div>
      <div class="drawer-footer">
        <slot name="footer">
          <el-button>Default</el-button>
          <el-button type="primary">Primary</el-button>
        </slot>
      </div>
    </div>
  </Teleport>
</template>

<script setup name="Drawer">
import {ref, reactive, onMounted, getCurrentInstance} from "vue";

const props = defineProps({
  modelValue: {
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
  z-index: 10;
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
  }
  .drawer-header-title {
    flex: 1;
    color: #5a5e66;
    font-size: 16px;
    font-weight: bold;
    padding-left: 10px;
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
</style>