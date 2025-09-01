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
import {defineAsyncComponent, getCurrentInstance, nextTick, ref, shallowRef} from "vue";
import {nodeConfig} from "../../config/node-config.js";
import { drawerComponents } from "../../config/node-component.js";
import {KEY_PROCESS_CTRL} from "../../config/provide-keys.js"
import {ON_PRE_UPDATE_NODE_CONFIG, ON_AFTER_UPDATE_NODE_CONFIG} from "../../config/event-keys.js"
import {copy} from "../../tools/common-tools.js";

const props = defineProps({

});

const { proxy } = getCurrentInstance();

// 节点数据的副本
let node = ref(null);
// 节点配置数据
const config = ref(null)
// 是否显示配置界面
let isShow = ref(false);
// 流程控制器实例
const processCtrl = inject(KEY_PROCESS_CTRL)

// 显示节点配置组件
const show = (data) => {
  // 触发修改节点配置之前事件
  let isAllowUpdate = processCtrl.triggerEvent(ON_PRE_UPDATE_NODE_CONFIG, {
    tmpNodeId: data.tmpNodeId
  })
  if(isAllowUpdate !== undefined && !isAllowUpdate) {
    return
  }
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
  nextTick(() => {
    // 触发修改节点配置之后事件
    processCtrl.triggerEvent(ON_AFTER_UPDATE_NODE_CONFIG, {
      tmpNodeId: node.value.tmpNodeId
    })
  })
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
