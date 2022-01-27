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
    const data = this.keyNodeMap[key];
    if (data) {
      data.collapsed = !data.collapsed;
      data.children = data.children || [];
      this.setState({ data: this.state.data });
    }
  };
  render() {
    const {
      data: { name },
    } = this.props;

    return (
      <div className="tree">
        <div className="tree-nodes">
          <TreeNode data={data} onCollapse={this.onCollapse} />
        </div>
      </div>
    );
  }
}
