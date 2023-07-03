# Easy Process

流程设计器，基于vue3 + vite4 + element-plus实现，具备快速应用及扩展的特点。

## 开发环境

```
Node >= 14
```

## 技术造型

- vue3
- vite4
- element-plus

## 目录结构

~~~
easy-process     
├─ public
│  └─ mock							// mock测试数据
├─ src
│  └─ api								// API接口
│  └─ assets							// 静态资源
│  └─ components
│    └─ EasyProcess					// 流程设计器
│      └─ ProcessDesigner.vue			// 流程设计器组件（入口）
│      └─ config						// 流程设计器-配置文件
│        └─ defaultConfig.js			// 初始化时默认流程结构
│        └─ nodeConfig.js				// 各节点属性配置
│        └─ nodeType.js				// 节点类型
│      └─ node						// 流程设计器-节点组件
│        └─ NodeWrap.vue				// 用于递归生成流程节点的组件
│        └─ base						// 通用组件
│          └─ Node.vue				// 通用节点组件（该组件只是节点的外壳，具体内容由各节点组件部署实现）
│          └─ Drawer.vue				// 通用节点属性配置组件（该组件只是节点属性配置的外壳，具体内容由各节点组件部署实现）
│          └─ AddNode.vue				// 添加节点组件
│        └─ router					// 路由节点
│          └─ routerNode.vue			// 路由节点组件
│        └─ condition					// 条件节点
│          └─ conditionNode.vue		// 条件节点组件
│          └─ conditionDrawer.vue		// 条件节点属性配置组件
│        └─ start						// 发起人节点
│          └─ startNode.vue			// 发起人节点组件
│          └─ startDrawer.vue			// 发起人节点属性配置组件
│        └─ approver					// 审批人节点
│          └─ approverNode.vue		// 审批人节点组件
│          └─ approverDrawer.vue		// 审批人节点属性配置组件
│        └─ notify					// 审批人节点
│          └─ notifyNode.vue			// 抄送人节点组件
│          └─ notifyDrawer.vue		// 抄送人节点属性配置组件
│        └─ utils						
│          └─ tools.js				// 工具类
│      └─ node						// 流程设计器-节点组件
│        └─ NodeWrap.vue				// 用于递归生成流程节点的组件
│    └─ SvgIcon						// svg图标组件
│  └─ utils
│    └─ request.js					// axios工具类
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
    "conditionNodes": [ // 条件节点，节点类型为router时有效，最少会有两个条件节点
      {
        "nodeName": "条件1",
        "nodeType": "condition",
        "isLastCondition": "true | false 是否为最后一个条件节点，最后一个条件节点不能设置任何条件，默认为通过",
        "config": {},
        "childNode": {}
      }
    ]
  }
}

```

