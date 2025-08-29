<template>
  <div v-if="node" class="ep-node-drawer-container">
    <EpDrawer v-model="isShow" title="设置" icon="icon-ep-setting" width="600px">
      <template #default>
        <component :is="drawerComponents[node.nodeType]" :config="node.config"/>
      </template>
      <template #footer>
        <ep-button @click="cancelUpdateConfig">取消</ep-button>
        <ep-button type="primary" @click="updateConfig">确定</ep-button>
      </template>
    </EpDrawer>
  </div>
</template>
<script setup name="base-drawer">
import EpDrawer from "@/easy-process/components/drawer/ep-drawer.vue";
import EpButton from "@/easy-process/components/button/ep-button.vue";
import {defineAsyncComponent, getCurrentInstance, ref, shallowRef} from "vue";
import {nodeConfig} from "../../config/node-config.js";
import { drawerComponents } from "../../config/node-component.js";
import {copy} from "../../utils/common-tools.js";

const props = defineProps({

});

const { proxy } = getCurrentInstance();

// 节点数据的副本
let node = ref(null);
// 节点配置数据
const config = ref(null)
// 是否显示配置界面
let isShow = ref(false);

// 显示节点配置组件
const show = (data) => {
  // 复制数据
  node.value = copy(data)
  config.value = nodeConfig[node.value.nodeType]

  isShow.value = true
}

const emit = defineEmits(["updateConfig", "cancelUpdateConfig"]);

// 更新节点配置数据
const updateConfig = () => {
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
