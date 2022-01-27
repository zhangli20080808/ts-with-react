import React, { Component } from "react";
import { Checkbox } from "antd";
import Icon from "../../Icon/icon";
import { TreeData } from "../typings";

interface Props {
  data: TreeData;
  onCollapse: any;
  onCheck: any;
}
export default class TreeNode extends Component<Props> {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(props: Props) {
    super(props);
  }
  render() {
    const {
      data: { name, children, key, collapsed, checked },
      onCheck,
      onCollapse,
    } = this.props;
    // <Icon icon="arrow-down" size="4x" theme="dark" />
    // <Icon icon="folder-open" size="4x" theme="dark" />
    // <Icon icon="folder" size="4x" theme="dark" />
    // <Icon icon="file-alt" size="4x" theme="dark" />
    // <Icon icon="file-alt" size="4x" theme="dark" />
    // <Icon icon="spinner" size="4x" theme="dark" />
    let caret = null; // xiaojiantou
    let icon = null; // tubiao
    // 有children属性
    if (children) {
      if (children.length > 0) {
        // 有children属性，有儿子
        // 小图标有可能开关，取决于 collapsed
        caret = (
          <Icon
            onClick={() => onCollapse(key)}
            icon={collapsed ? "caret-right" : "caret-down"}
            // size="2x"
            // theme="dark"
          />
        );
        icon = (
          <Icon
            icon={collapsed ? "folder" : "folder-open"}
            // size="2x"
            // theme="dark"
          />
        );
      } else {
        caret = null;
        icon = <Icon icon="file" theme="dark" />;
      }
    } else {
      // 没有children属性 小图标向右，icon未打开
      caret = (
        <Icon
          onClick={() => onCollapse(key)}
          icon="caret-right"
          //   size="2x"
          //   theme="dark"
        />
      );
      icon = (
        <Icon
          icon="folder"
          //   size="2x"
          //   theme="dark"
        />
      );
    }
    return (
      <div className="tree-node">
        {/* 自己节点内容 */}
        <div className="inner">
          <span className="content">
            {caret}
            <Checkbox
              style={{ margin: "0 6px" }}
              checked={checked}
              onChange={(e) => onCheck(key)}
            />
            <span className="icon">{icon}</span>
            {name}
          </span>
          {children && children.length > 0 && !collapsed && (
            <div className="children">
              {children.map((item) => (
                <TreeNode
                  data={item}
                  key={item.key}
                  onCollapse={onCollapse}
                  onCheck={onCheck}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }
}
