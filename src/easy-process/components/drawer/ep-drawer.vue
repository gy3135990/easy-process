<template>
  <Teleport to="body" v-if="props.modelValue">
    <div class="drawer">
      <!-- header -->
      <div class="drawer-header" v-if="!props.hideHeader">
        <ep-svg-icon :icon-class="props.icon" class="drawer-header-icon" color="#5a5e66" v-if="props.icon"/>
        <div class="drawer-header-title">{{props.title}}</div>
        <ep-svg-icon icon-class="icon-ep-close" class="drawer-header-close" color="#5a5e66" @click="close" v-if="!props.hideCloseBtn"/>
      </div>
      <!-- body -->
      <div class="drawer-body">
        <slot></slot>
      </div>
      <!-- footer -->
      <div class="drawer-footer">
        <slot name="footer"></slot>
      </div>
    </div>
    <!-- 遮罩 -->
    <div class="drawer-overlay"></div>
  </Teleport>
</template>

<script setup name="ep-drawer">
import {ref, reactive, onMounted, onUnmounted, getCurrentInstance} from "vue";

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
  'hide-header': { // 控制是否显示 header 栏, 默认为 false
    type: Boolean,
    default: false
  },
  'hide-close-btn': { // 控制是否显示 关闭按钮, 默认为 false
    type: Boolean,
    default: false
  },
  width: {
    type: String,
    default: '500px'
  },
});

const { proxy } = getCurrentInstance();

onMounted(() => {
  window.addEventListener('keydown', escListener);
});

onUnmounted(() => {
  window.removeEventListener('keydown', escListener);
});

// 监听ESC事件
const escListener = (event) => {
  if (event.keyCode === 27) {
    close()
  }
}

const emit = defineEmits(["update:modelValue", "close"]);
const close = () => {
  // proxy.$emit("update:modelValue", false)
  emit("update:modelValue", false)
  emit("close");
}

</script>

<style lang="less" scoped>
.drawer {
  position: fixed;
  width: v-bind("props.width");
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