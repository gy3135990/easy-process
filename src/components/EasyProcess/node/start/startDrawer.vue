<template>
  <!-- 发起人配置 -->
  <div>
    <el-form :model="props.config" label-width="80px">
      <el-form-item label="发起人">
        <el-input v-model="props.config.name" />
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup name="StartDrawer">
import {getCurrentInstance, inject} from "vue";
import {KEY_PROCESS_DATA} from "../../config/keys";

const props = defineProps({
  config: { // 传入的流程配置数据
    type: Object,
    default: {}
  },
});

const { proxy } = getCurrentInstance();

// 获取流程数据
const processData = inject(KEY_PROCESS_DATA)
</script>

<style lang="less" scoped>

</style>
