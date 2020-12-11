

# 完成一个组件库需要思考的问题

## 代码结构
## 样式解决方案  
### styles/
1. variables.scss 各种变量以及可配置设置
2. mixin.scss 全局 mixin (比如添加box-shadow transform) 不返回值
3. function.scss 全局 function 经过计算返回值
## 组件的需求和编码 
### 组件库样式变量分类
  1. 基础色彩系统 
  2. 字体系统
  3. 表单
  4. 按钮
  5. 边框 阴影 可开关配置
## 组件测试用例分析和编码 
## 代码打包输出和发布
## CI/CD, 文档生成