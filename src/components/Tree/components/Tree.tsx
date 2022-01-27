import React, { Component } from "react";
import TreeNode from "./TreeNode";
import { TreeData } from "../typings";
import data from "../data";

interface Props {
  data: TreeData;
}
interface State {
  data: TreeData;
}
interface KeyNodeMap {
  [key: string]: TreeData;
}
export default class Tree extends Component<Props, State> {
  keyNodeMap: KeyNodeMap;
  constructor(props: Props) {
    super(props);
    // 创建一个 keyMap 根据key去寻找对应的key值对象
    this.state = { data: this.props.data };
    this.keyNodeMap = {}; // key是节点的key 值就是节点本身
    this.buildKeyMap();
  }
  buildKeyMap = () => {
    this.keyNodeMap = {};
    this.keyNodeMap[data.key] = data;
    if (data.children && data.children.length > 0) {
      this.walk(data.children, data);
    }
  };
  walk = (children: TreeData[], parent: TreeData) => {
    children.forEach((item: TreeData) => {
      this.keyNodeMap[item.key] = item;
      item.parent = parent;
      if (item.children && item.children.length > 0) {
        this.walk(item.children, item);
      }
    });
  };
  // 将对应key 对象的 collapsed 取反
  onCollapse = (key: string) => {
    let data = this.keyNodeMap[key];
    if (data) {
      let { children } = data;
      if (children) {
        data.collapsed = !data.collapsed;
        data.children = data.children || [];
        this.setState({ data: this.state.data });
      } else {
        // children 不存在，则说明儿子未加载，需要加载
        data.loading = true;
        this.setState({ data: this.state.data });
        setTimeout(() => {
          data.children = [
            {
              name: `${data.name}的儿子1`,
              key: `${data.key}-1`,
              type: "folder",
              collapsed: true,
            },
            {
              name: `${data.name}的儿子2`,
              key: `${data.key}-2`,
              type: "folder",
              collapsed: true,
            },
          ];
          data.loading = false;
          data.collapsed = false;
          this.buildKeyMap();
          this.setState({ data: this.state.data });
        }, 2000);
      }
    }
  };
  onCheck = (key: string) => {
    let data = this.keyNodeMap[key];
    if (data) {
      data.checked = !data.checked;
      if (data.checked) {
        //如果新状态为true
        // 处理儿子
        this.checkAllChildren(data.children, true);
        // 如果一个节点，它所有子节点都被选中了，自己也要被选中
        this.checkParent(data.parent);
      } else {
        // 让所有下级节点取消选中
        this.checkAllChildren(data.children, false);
        this.checkParent(data.parent);
      }
      this.setState({ data: this.state.data });
    }
  };
  checkAllChildren = (children: TreeData[] = [], checked: boolean) => {
    children.forEach((item: TreeData) => {
      item.checked = checked;
      this.checkAllChildren(item.children, checked);
    });
  };
  // 如果当前父亲他的所有儿子都被选中了，自己也被选中
  checkParent = (parent?: TreeData) => {
    while (parent) {
      parent.checked = parent.children?.every((item: TreeData) => item.checked);
      parent = parent.parent;
    }
  };
  render() {
    const { data } = this.props;
    return (
      <div className="tree">
        <div className="tree-nodes">
          <TreeNode
            data={data}
            onCollapse={this.onCollapse}
            onCheck={this.onCheck}
          />
        </div>
      </div>
    );
  }
}
