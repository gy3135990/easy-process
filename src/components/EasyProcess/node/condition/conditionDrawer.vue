<template>
  <!-- 条件配置 -->
  <div>
    <el-form :model="props.config" label-width="80px">
      <el-form-item label="请假天数">
        <el-input v-model="props.config.days" />
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup name="ConditionDrawer">
import {ref, reactive, onMounted, getCurrentInstance} from "vue";

const props = defineProps({
  config: { // 传入的流程配置数据
    type: Object,
    default: {}
  },
});

const { proxy } = getCurrentInstance();

onMounted(async () => {

});

</script>

<style lang="less" scoped>

</style>
