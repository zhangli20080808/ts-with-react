import React, { useCallback, useState, useEffect } from "react";
import { ModalProps } from "antd/lib/modal";
import { Input, Modal, Tree, TreeSelect } from "antd";
import { TreeProps } from "antd/lib/tree";
import { TreeNodeNormal } from "antd/lib/tree/Tree";
// import CustomerModal from "../Modal";
const { TreeNode } = Tree;
type TreeData = Array<TreeNodeNormal>;
interface SecondCategory extends ModalProps {
  treeData: TreeData;
}

const SecondCategory: React.FC<SecondCategory> = (props) => {
  const { treeData, ...modalProps } = props;
  const [searchValue, setSearchValue] = useState("");
  const [expandedKeys, setExpandedKeys] = useState<string[]>();
  const [autoExpandParent, setAutoExpandParent] = useState(true);
  const [checkedKeys, setCheckedKeys] = useState([] as any);
  const [treeNode, setTreeNode] = useState<TreeData>([]);
  // const [defaultExpendsKeys, setDefaultExpendsKeys] = useState();

  // 获取所有的keys
  const getAllExpendKeys = useCallback(() => {
    const allKeys: string[] = [];
    const loop = (data: TreeData) => {
      data.forEach((item) => {
        allKeys.push(item.key);
        if (item.children && item.children.length > 0) {
          loop(item.children);
        }
      });
    };
    loop(treeData);
    setExpandedKeys(allKeys);
  }, [treeData]);

  useEffect(() => {
    setTreeNode(treeData);
    getAllExpendKeys();
  }, [getAllExpendKeys, treeData]);

  const getCheckedKeys = useCallback(
    (checked) => {
      if (checked.length) {
        treeData.filter(function dep(node: any) {
          if (checked.includes(node?.key as any)) {
            return true;
          }
          if (!node.children) return false;
          const children = node.children.filter(dep);
          if (children?.length) {
            return true;
          }
          return false;
        });
      }
      return {
        checked,
      };
    },
    [treeData]
  );
  const treeProps: TreeProps = {
    checkable: true,
    defaultExpandAll: true,
    expandedKeys,
    checkedKeys,
    autoExpandParent,
    blockNode: true,
    onCheck: (e) => {
      const checked = getCheckedKeys(e);
      setCheckedKeys(checked);
    },
    onExpand: (keys) => {
      setExpandedKeys(keys);
      setAutoExpandParent(false);
    },
  };
  const renderTreeNodes = (data: any) =>
    data.map((item: any) => {
      const index = data?.item?.indexOf(searchValue);
      const beforeStr = item.title.substr(0, index);
      const afterStr = item.title.substr(index + searchValue.length);
      const title =
        index > -1 ? (
          <span>
            {beforeStr}
            <span style={{ color: "#f50" }}>{searchValue}</span>
            {afterStr}
          </span>
        ) : (
          <span>{item.title}</span>
        );
      if (item.children) {
        return (
          <TreeNode
            title={item.title}
            key={item.key}
            dataRef={item}
            checkable={item.checkable}
          >
            {renderTreeNodes(item.children)}
          </TreeNode>
        );
      }
      return <TreeNode key={item.key} {...item} title={title} />;
    });

  // const getParentKey = useCallback((key: string, tree: TreeData) => {
  //   let parentKey: string | undefined;
  //   for (let i = 0; i < tree.length; i++) {
  //     const node = tree[i];
  //     if (node.children) {
  //       if (node.children.some((item: any) => item.key === key)) {
  //         parentKey = node.key;
  //       } else if (getParentKey(key, node.children)) {
  //         parentKey = getParentKey(key, node.children);
  //       }
  //     }
  //   }
  //   return parentKey;
  // }, []);

  // const handleChange = useCallback(
  //   (e: React.ChangeEvent<HTMLInputElement>) => {
  //     const { value } = e.target;
  //     const expandedKeys = treeData
  //       .map((item) => {
  //         if ((item?.title as string)?.indexOf(value) > -1) {
  //           return getParentKey(item.key, treeData);
  //         }
  //         return null;
  //       })
  //       .filter((item, i, self) => item && self.indexOf(item) === i);
  //     setExpandedKeys(expandedKeys);
  //     setSearchValue(value);
  //     setAutoExpandParent(true);
  //   },
  //   [getParentKey, treeData]
  // );
  console.log(checkedKeys, "expandedKeys");

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      let rootNodes = [...treeData];
      let expandedKeys: string[] = [];
      if (value) {
        rootNodes = rootNodes.filter(function dep(node) {
          if ((node?.title as string).indexOf(value) > -1) {
            console.log("====================================");
            console.log(node, value);
            console.log("====================================");
            return true;
          }
          if (!node.children) return false;
          const children = node.children.filter(dep);
          if (children.length) {
            expandedKeys.push(node?.key as any);
            return true;
          }
          return false;
        });
      }
      setSearchValue(value);
      setTreeNode(rootNodes);
      if(!value){
        getAllExpendKeys()
        return
      }
      setExpandedKeys(expandedKeys);
    },
    [getAllExpendKeys, treeData]
  );

  return (
    <div>
      <Modal {...modalProps}>
        <span>
          <Input.Search
            placeholder="搜索类目"
            // onSearch={(value) => setSearchValue(value)}
            allowClear
            onChange={handleChange}
          />
        </span>
        {treeData.length > 0 && (
          <Tree {...treeProps}>{renderTreeNodes(treeNode)}</Tree>
        )}
      </Modal>
    </div>
  );
};

export default SecondCategory;
