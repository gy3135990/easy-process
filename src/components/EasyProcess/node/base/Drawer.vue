<template>
  <div v-if="node" class="ep-node-drawer-container">
    <el-drawer v-model="isShow" class="ep-node-drawer" :append-to-body="true" :with-header="false">
      <template #default>
        <div class="ep-node-drawer-header">
          <div class="ep-node-drawer-header-icon">
            <el-icon><Setting /></el-icon>
          </div>
          <div class="ep-node-drawer-header-title">
            {{config.title}}设置
          </div>
        </div>
        <div class="ep-node-drawer-body">
          <component :is="drawerComponents[node.nodeType]" :config="node.config"/>
        </div>
      </template>
      <template #footer>
        <div style="flex: auto">
          <el-button @click="cancelUpdateConfig">取消</el-button>
          <el-button type="primary" @click="updateConfig">确定</el-button>
        </div>
      </template>
    </el-drawer>
  </div>
</template>
<script setup name="Drawer">
import {ref, reactive, shallowRef, onMounted, getCurrentInstance, defineAsyncComponent} from "vue";
import {nodeConfig} from "../../config/nodeConfig";
import {copy} from "../../utils/tools";

const props = defineProps({

});

const { proxy } = getCurrentInstance();

// 节点数据的副本
let node = ref(null);
// 节点配置数据
const config = ref(null)
// 是否显示配置界面
let isShow = ref(false);

// 加载节点抽屉组件
const modules = import.meta.glob('../*/*Drawer.vue')
const drawerComponents = shallowRef({});
Object.keys(nodeConfig).forEach(key => {
  let item = nodeConfig[key]
  if(item.hasDrawer) {
    let component = defineAsyncComponent(modules[`../${key}/${key}Drawer.vue`])
    drawerComponents.value[key] = component
  }
})

onMounted(async () => {

});

// 显示节点配置组件
const show = (data) => {
  console.info("show", data)

  // 复制数据
  node.value = copy(data)
  config.value = nodeConfig[node.value.nodeType]

  isShow.value = true
}

const emit = defineEmits(["updateConfig", "cancelUpdateConfig"]);
// 更新节点配置数据
const updateConfig = () => {
  console.info("更新节点配置数据", node.value)
  isShow.value = false
  emit("updateConfig", copy(node.value.config));
}
// 取消更新节点配置数据
const cancelUpdateConfig = () => {
  isShow.value = false
  emit("cancelUpdateConfig");
}

defineExpose({
  show
});
</script>

<style lang="less">

.ep-node-drawer {
  display: flex;
  flex-direction: column;
  width: 100%;

  .el-drawer__body {
    padding: 0 !important;
  }
}

.ep-node-drawer-header {
  display: flex;
  padding: 20px;
  border-bottom: 1px solid #cacaca;

  .ep-node-drawer-header-icon {
    font-size: 20px;
    margin-right: 8px;
  }
  .ep-node-drawer-header-title {
    color: #5a5e66;
    font-size: 16px;
    font-weight: bold;
  }
}
.ep-node-drawer-body {
  padding: 20px;
  overflow-y: auto;
}
</style>
