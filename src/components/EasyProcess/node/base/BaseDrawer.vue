<template>
  <div v-if="node" class="ep-node-drawer-container">
    <Drawer v-model="isShow" :title="config.title + '设置'" icon="setting" width="600px">
      <template #default>
        <component :is="drawerComponents[node.nodeType]" :config="node.config" :bizData="bizData"/>
      </template>
      <template #footer>
        <Button @click="cancelUpdateConfig">取消</Button>
        <Button type="primary" @click="updateConfig">确定</Button>
      </template>
    </Drawer>
  </div>
</template>
<script setup name="BaseDrawer">
import Drawer from "@/components/Drawer/Drawer";
import Button from "@/components/Button/Button";
import {ref, reactive, shallowRef, onMounted, getCurrentInstance, defineAsyncComponent} from "vue";
import {nodeConfig} from "../../config/nodeConfig";
import {copy} from "../../utils/tools";

const props = defineProps({

});

const { proxy } = getCurrentInstance();

// 节点数据的副本
let node = ref(null);
// 业务数据的副本
let bizData = ref(null);
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
const show = (data, bizData) => {
  // 复制数据
  node.value = copy(data)
  bizData.value = copy(bizData)
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

<style lang="less" scoped>

.ep-node-drawer {

}
</style>
