# Easy Process

流程设计器，基于vue3 + vite4 + element-plus实现，具备快速应用及扩展的特点。

## 前言

本项目完全开源，如果这个项目让你有所收获，记得 Star 关注哦，这对我是非常不错的鼓励与支持。

本项目处于刚刚开发完成状态，未经过大量的测试，如果在使用过程中发现BUG，请提交Issues。

后续我会持续更新项目，使项目更加完善。

## 开源许可协议

- MIT

## 开发环境

```
Node >= 14
```

## 技术选型

- vue3
- vite4
- element-plus

## 运行项目

```shell
npm install
npm run dev
```

## 目录结构

~~~
easy-process     
├─ public
│  └─ mock								// mock测试数据
├─ src
│  └─ api								// API接口
│  └─ assets							// 静态资源
│  └─ components
│    └─ EasyProcess						// 流程设计器
│      └─ ProcessDesigner.vue			// 流程设计器组件（入口）
│      └─ config						// 流程设计器-配置文件
│        └─ defaultConfig.js			// 初始化时默认流程结构
│        └─ nodeConfig.js				// 各节点属性配置
│        └─ nodeType.js					// 节点类型
│      └─ node							// 流程设计器-节点组件
│        └─ NodeWrap.vue				// 用于递归生成流程节点的组件
│        └─ base						// 通用组件
│          └─ Node.vue					// 通用节点组件（该组件只是节点的外壳，具体内容由各节点组件部署实现）
│          └─ Drawer.vue				// 通用节点属性配置组件（该组件只是节点属性配置的外壳，具体内容由各节点组件部署实现）
│          └─ AddNode.vue				// 添加节点组件
│        └─ router						// 路由节点
│          └─ routerNode.vue			// 路由节点组件
│        └─ condition					// 条件节点
│          └─ conditionNode.vue			// 条件节点组件
│          └─ conditionDrawer.vue		// 条件节点属性配置组件
│        └─ start						// 发起人节点
│          └─ startNode.vue				// 发起人节点组件
│          └─ startDrawer.vue			// 发起人节点属性配置组件
│        └─ approver					// 审批人节点
│          └─ approverNode.vue			// 审批人节点组件
│          └─ approverDrawer.vue		// 审批人节点属性配置组件
│        └─ notify						// 审批人节点
│          └─ notifyNode.vue			// 抄送人节点组件
│          └─ notifyDrawer.vue			// 抄送人节点属性配置组件
│        └─ utils						
│          └─ tools.js					// 工具类
│    └─ SvgIcon							// svg图标组件
│  └─ utils
│    └─ request.js						// axios工具类
│  └─ views
│    └─ index.vue						// demo
├─ README.md							// 使用手册
~~~



## 使用手册

### 快速开始

1. 导入流程设计器组件

   ```js
   import ProcessDesigner from "@/components/EasyProcess/ProcessDesigner";
   ```

   

2. 使用组件

   ```html
   <ProcessDesigner ref="process" :data="processData"/>
   ```

   

3. 获取流程设计结果

   ```js
   import {getCurrentInstance} from "vue";
   const { proxy } = getCurrentInstance();
   
   let result = proxy.$refs.process.getResult();
   ```



### 流程配置数据结构

```json
{
  "processId": "流程ID",
  "processName": "流程名称",
  "nodeConfig": {
    "nodeName": "节点名称",
    "nodeType": "节点类型 start-发起人节点 approver-审批节点 router-路由节点 condition-条件节点 notify-抄送节点",
    "config": {}, // 节点配置，根据需求可以自定义
    "childNode": {}, // 下级节点
    "conditionNodes": [ // 条件节点，节点类型为router时有效，至少会有两个条件节点
      {
        "nodeName": "条件",
        "nodeType": "condition",
        "isLastCondition": "true | false 是否为最后一个条件节点，最后一个条件节点不能设置任何条件，默认为通过",
        "config": {},
        "childNode": {}
      }
    ]
  },
  "bizData": { // 该属性为自定义的业务数据，在各节点中可获取传入的业务数据，用于业务处理，比如传入表单数据，注意，业务数据只能用于只读操作
    
  }
}

```

### 定义节点

节点的属性定义在config属性下，具体需要哪些属性请依据业务自行定义。

节点组件一般会由两个组件组成：

- xxxNode.vue（用于在流程节点上展示定义的属性配置）
- xxxDrawer.vue（用于配置该节点的属性）

xxxNode.vue组件下会通过props.node传入当前节点数据

xxxDrawer.vue组件下会通过props.config传入当前节点属性配置的**副本**数据，因为是地址传递，所以可以直接对其内部的属性进行修改。在点击确定会将修改后的副本数据覆盖原来的数据。

xxxNode.vue和xxxDrawer.vue组件下可通过props.bizData获取到传入的业务数据



### 节点的默认配置

在config/nodeConfig.js文件下维护各节点的默认配置，格式如下：

```json
{
    "title": "条件", // 节点标题
    "color": "#FFFFFF", // 节点标题颜色
    "bgColor": "#3CB371", // 节点标题背景颜色
    "canAdd": false, // 节点是否可以增加
    "canRemoved": true, // 节点是否能够移除
    "hasDrawer": true, // 节点是否可以进行配置(点击后侧弹出属性配置抽屉)
    "icon": { // 图标（使用的svg图标）
        "name": "condition", // 图标名（svg图标的文件名，不包含后缀）
        "color": "#3CB371" // 图标颜色（注：如果你导入的svg图标设置颜色不生效，请用IDE打开图标文件，找到并删除fill属性（可能存在多个）并保存即可）
    },
    "defaultNode": { // 默认节点结构，用于添加节点时
        "nodeName": "条件",
        "nodeType": "condition",
        "isLastCondition": false,
        "config": {},
        "childNode": {}
    },
}
```



### 开发一个新类型的节点

1、在src/components/EasyProcess/config/nodeType.js文件下定义一个新的节点类型

```js
export const NEWTYPE = 'newType'
```

2、在src/components/EasyProcess/config/nodeConfig.js文件下配置该节点的信息

```js
// 引入新节点
import { NEWTYPE } from "./nodeType"
// 节点配置
nodeConfig[NEWTYPE] = {
    "title": "新节点", // 节点标题
    "color": "#FFFFFF", // 节点标题颜色
    "bgColor": "#808000", // 节点标题背景颜色
    "canAdd": true, // 节点是否可以增加
    "canRemoved": true, // 节点是否能够移除
    "hasDrawer": true,
    "icon": { // 图标
        "name": "notify", // 图标名，项目使用的是svg图标，请将图标文件放至src/assets/icons/svg目录下（注：如果你导入的svg图标设置颜色不生效，请用IDE打开图标文件，找到并删除fill属性（可能存在多个）并保存即可）
        "color": "#808000" // 颜色
    },
    "defaultNode": { // 默认节点结构，用于添加节点时
        "nodeName": "新节点",
        "nodeType": "newType",
        "config": {},
        "childNode": null
    }
}
```

3、在src/components/EasyProcess/node目录下创建一个文件夹，名称与节点类型一致

4、在该目录创建两个vue文件：xxxNode.vue和xxxDrawer.vue，其中xxx要与节点类型一致

xxxNode.vue

```html
<template>
  <div>
    <!-- 属性显示 -->
  </div>
</template>

<script setup name="NewTypeNode">
import {ref, reactive, onMounted, getCurrentInstance} from "vue";

const props = defineProps({
  node: { // 传入的流程配置数据
    type: Object,
    default: {}
  },
  bizData: { // 业务数据
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

```

xxxDrawer.vue

```html
<template>
  <div>
	<!-- 属性设置 -->
  </div>
</template>

<script setup name="NewTypeDrawer">
import {ref, reactive, onMounted, getCurrentInstance} from "vue";

const props = defineProps({
  config: { // 传入的流程配置数据
    type: Object,
    default: {}
  },
  bizData: { // 业务数据
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

```

5、如何定义节点，请看**定义节点**章节

6、运行项目进行测试

 