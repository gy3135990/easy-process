<template>
  <div :class="['button', props.type]">
    <slot></slot>
  </div>
</template>

<script setup name="ep-button">
import {ref, reactive, onMounted, getCurrentInstance} from "vue";
const props = defineProps({
  type: {
    type: String,
    default: 'default'
  },
});

const { proxy } = getCurrentInstance();

</script>

<style lang="less" scoped>
.button {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  line-height: 1;
  height: 32px;
  white-space: nowrap;
  cursor: pointer;
  color: #606266;
  box-sizing: border-box;
  outline: 0;
  vertical-align: middle;
  background-color: #FFFFFF;
  border: 1px solid #dcdfe6;
  padding: 8px 15px;
  font-size: 14px;
  border-radius: 4px;
  -webkit-appearance: none;
  user-select: none;
}

.button+.button {
  margin-left: 12px;
}

// 默认样式
.default {
  color: #606266;
  background-color: #FFFFFF;
  border: 1px solid #dcdfe6;

  &:hover {
    color: #79bbff;
    background-color: #ecf5ff;
    border: 1px solid #79bbff;
  }
  &:active {
    color: #337ecc;
    background-color: #ecf5ff;
    border: 1px solid #337ecc;
  }
}

// 主样式
.primary {
  color: #FFFFFF;
  background-color: #409EFF;
  border: 1px solid #409EFF;

  &:hover {
    color: #FFFFFF;
    background-color: #79bbff;
    border: 1px solid #79bbff;
  }
  &:active {
    color: #FFFFFF;
    background-color: #337ecc;
    border: 1px solid #337ecc;
  }
}
</style>