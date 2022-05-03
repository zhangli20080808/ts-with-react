// @ts-nocheck
import React, { useCallback, useEffect, useState } from "react";
import { Tree, Icon } from "antd";
import { TreeProps } from "antd/lib/tree";
import {
  AntTreeNode,
  AntTreeNodeDropEvent,
  AntTreeNodeProps,
  TreeNodeNormal,
} from "antd/lib/tree/Tree";

const { TreeNode } = Tree;
type TreeData = Array<TreeNodeNormal>;

interface BaseTreeProps extends TreeProps {
  data: TreeData;
  onData: (data) => void;
  onAddClick?: (node: TreeNodeNormal) => void; // 添加二级类目
}

type SameLevelParent = (a: AntTreeNode, b: AntTreeNode) => boolean;
const BaseTree: React.FC<BaseTreeProps> = (props) => {
  const { data, onData, onAddClick, ...restTreeProps } = props;
  const [treeData, setTreeData] = useState([] as TreeData);
  useEffect(() => {
    setTreeData(data);
  }, [data]);
  function onDrop(info: AntTreeNodeDropEvent) {
    console.log("info", info);
    const dragNode = info.dragNode; // 拖拽元素
    const dropNode = info.node; // 放置元素
    console.log(dragNode, dropNode);
    const isSameLevel: SameLevelParent = (a, b) => {
      const aLevel = a.props.pos.split("-").length;
      const bLevel = b.props.pos.split("-").length;
      return aLevel === bLevel;
    };

    const isSameParent: SameLevelParent = (a, b) => {
      const aLevel = a.props.pos.split("-");
      const bLevel = b.props.pos.split("-");
      aLevel.pop();
      bLevel.pop();
      return aLevel.join("") === bLevel.join("");
    };
    // 拥有相同父级并且处于统一层级，可拖拽
    const canDrop =
      isSameParent(dragNode, dropNode) &&
      isSameLevel(dragNode, dropNode) &&
      info.dropToGap;

    console.log(
      "aaaaaaaaaaaaaaaaaaaaa",
      isSameParent(dragNode, dropNode),
      isSameLevel(dragNode, dropNode),
      info.dropToGap
    );
    if (!canDrop) {
      return;
    }
    const sameLevel = isSameLevel(dragNode, dropNode);
    const sameParent = isSameParent(dragNode, dropNode);
    // console.log("sameLevel", sameLevel);
    // console.log("sameParent", sameParent);
    // console.log("info.dropPosition", info.dropPosition);
    if (sameParent && sameLevel) {
      const dropKey = info.node.props.eventKey;
      const dragKey = info.dragNode.props.eventKey;
      const dropPos = info.node.props.pos.split("-");
      const dragPos = info.dragNode.props.pos.split("-");
      // -1 代表移动到最顶级组的第一个位置 info.dropPosition 不准确
      const dropPosition =
        info.dropPosition - Number(dropPos[dropPos.length - 1]);
      const otherPosition =
        Number(dragPos[dragPos.length - 1]) -
          Number(dropPos[dropPos.length - 1]) >
        0;
      const loop = (
        data: TreeData,
        key: string,
        callback: (data: TreeNodeNormal, i: number, res: any) => void
      ) => {
        for (let i = 0; i < data.length; i++) {
          if (data[i].key === key) {
            return callback(data[i], i, data);
          }
          if (data[i].children) {
            loop(data[i].children, key, callback);
          }
        }
      };
      const data = [...treeData];
      // Find dragObject
      let dragObj: AntTreeNode;
      loop(data, dragKey, (item: AntTreeNode, index: number, arr: TreeData) => {
        arr?.splice(index, 1);
        dragObj = item;
      });

      if (!info.dropToGap) {
        loop(data, dropKey, (item: AntTreeNodeProps) => {
          if (item?.children) {
          }
          item.children = item.children || [];
          item.children.push(dragObj as any);
        });
      }
      // else if (
      //   (info.node.props.children || []).length > 0 && // Has children
      //   info.node.props.expanded && // Is expanded
      //   dropPosition === 1 // On the bottom gap
      // ) {
      //   loop(data, dropKey, (item) => {
      //     item.children = item.children || [];
      //     // where to insert 示例添加到头部，可以是随意位置
      //     item.children.unshift(dragObj);
      //   });
      // }
      else {
        let ar: TreeData;
        let i: number;
        loop(
          data,
          dropKey,
          (item: AntTreeNode, index: number, arr: TreeData) => {
            ar = arr;
            i = index;
          }
        );
        if (dropPosition === -1 || otherPosition) {
          // 移动到最顶级第一个位置
          ar.splice(i, 0, dragObj);
        } else {
          //  1 | 0
          ar.splice(i + 1, 0, dragObj);
        }
      }

      console.log("data", data);
      // setTreeData(data);
      onData(data);
    }
  }
  const renderTreeNodes = useCallback(
    (data) => {
      return data.map((item) => {
        const curItem = { ...item };
        if (curItem.parentKey === 0) {
          curItem.title = (
            <span>
              {curItem.title}
              <span
                onClick={(e) => {
                  e.stopPropagation();
                  onAddClick(curItem);
                }}
              >
                添加
              </span>
              {curItem.children && curItem.children.length === 0 && (
                <span>删除</span>
              )}
            </span>
          );
        } else {
          curItem.title = (
            <span>
              {curItem.title} <span>删除</span>
            </span>
          );
        }
        if (curItem.children) {
          return (
            <TreeNode title={curItem.title} key={curItem.key} dataRef={curItem}>
              {renderTreeNodes(curItem.children)}
            </TreeNode>
          );
        }

        return <TreeNode {...curItem} />;
      });
    },
    [onAddClick]
  );

  return (
    <Tree
      defaultExpandAll
      draggable
      // treeData={treeData}
      onDrop={onDrop}
      {...restTreeProps}
    >
      {renderTreeNodes(treeData)}
    </Tree>
  );
};
export default BaseTree;
