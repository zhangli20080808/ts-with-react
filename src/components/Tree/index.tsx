/**
 * 1. 渲染树形结构
 * 2. 打开关闭功能
 * 3. 全选和取消全选功能
 * 4. 动态加载数据
 */
import React from "react";
import Tree from "./components/Tree";
import data from "./data";

export default () => {
  return (
    <div>
      <Tree data={data} />
    </div>
  );
};
