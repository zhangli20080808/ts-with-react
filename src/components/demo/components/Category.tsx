import React, { useCallback, useState } from "react";
import { Radio, Modal } from "antd";
// import { useRequest } from "ahooks";
import { PageTitle } from "../index";
import CategoryModal from "../components/modal/Indicators";
import TitleContainer from "./TitleContainer";
import NoContent from "./NoContent";
import BaseTree from "./BaseTree";
import SecondCategoryModal from "../components/modal/SecondCategory";
import { AddIndicatorsAndCategory } from "../types";
const treeData = [
  {
    title: "Branch 1",
    key: "Branch 1",
    parentKey: 0,
    checkable: false,
    children: [
      {
        title: "Branch 1.1",
        key: "Branch 1.1",
      },
      {
        title: "Branch 1.2",
        key: "Branch 1.2",
        children :[
          {
            title: "Branch 1.2.1",
            key: "Branch 1.2.1",
          },
        ]
      },
    ],
  },
  {
    title: "Branch 2",
    key: "Branch 2",
    parentKey: 0,
    checkable: false,
    children: [
      {
        title: "Branch 2.1",
        key: "Branch 2.1",
      },
      {
        title: "我是类目2第二",
        key: "Branch 2.2",
      },
      {
        title: "我是类目2第三",
        key: "Branch 2.3",
      },
    ],
  },
  {
    title: "类目3是我",
    parentKey: 0,
    checkable: false,
    key: "Branch 3",
    children: [],
  },
];
const treeData2 = [
  {
    title: "Branch xxxx1",
    key: "Branch 1",
    children: [
      {
        title: "Branch 1.1",
        key: "Branch 1.1",
      },
      {
        title: "Branch 1.2",
        key: "Branch 1.2",
      },
    ],
  },
  {
    title: "Branch xxxx2",
    key: "Branch 2",
    children: [
      {
        title: "Branch 2.1",
        key: "Branch 2.1",
      },
      {
        title: "Branch 2.2",
        key: "Branch 2.2",
      },
      {
        title: "Branch 2.3",
        key: "Branch 2.3",
      },
    ],
  },
  {
    title: "Branch xxxx3",
    key: "类目3是我",
    children: [],
  },
];
export default function Category() {
  const [mode, setMode] = useState("a");
  const [visible, setVisible] = useState(false);
  //   const {data} = useRequest()
  const [resourceCategoryTree, setResourceCategoryTree] = useState(treeData);
  const [organizationTree, setOrganizationTree] = useState(treeData2);
  const [secondCategoryVisible, setSecondCategoryVisible] = useState(false);
  const exportCategory = useCallback(() => {
    Modal.confirm({
      //   icon: <span>123</span>,
      content:
        "确定导入吗？该操作会导入类目管理中的一级、二级类目，且会将当前的添加的类目覆盖。",
      okText: "确认",
      cancelText: "取消",
      onOk: () => {
        alert(123);
      },
    });
  }, []);
  const oneLevelCategoryModalProps: AddIndicatorsAndCategory = {
    visible: visible,
    onCancel: () => setVisible(false),
    title: "添加一级类目",
    // defaultSelectedKeys: items.map((item) => item.id),
    cancelText: "取消",
    okText: "确定",
    placeholder: "搜索一级类目",
  };
  return (
    <div className="common">
      <PageTitle title="类目" />
      <div className="content">
        123
        <TitleContainer
          title="展示指标配置："
          extraContent={
            <span>
              <Radio.Group
                onChange={(e) => setMode(e.target.value)}
                value={mode}
                size="small"
              >
                <Radio.Button value="a">资源类目</Radio.Button>
                <Radio.Button value="b">组织机构</Radio.Button>
              </Radio.Group>
            </span>
          }
        ></TitleContainer>
        <div className="treeContent">
          <div className="top">
            <div className="name">资源类目</div>
            <div className="cateOp">
              <span className="btn" onClick={exportCategory}>
                导入类目
              </span>
              {/* 创建 */}
              <span className="btn" onClick={() => setVisible(true)}>
                添加
              </span>
            </div>
          </div>
          <div>
            {!!treeData.length ? (
              <>
                {mode === "a" ? (
                  <BaseTree
                    data={resourceCategoryTree}
                    onData={(value) => setResourceCategoryTree(value)}
                    onAddClick={(value) => {
                      console.log(value);
                      setSecondCategoryVisible(true);
                    }}
                  />
                ) : (
                  <BaseTree
                    data={organizationTree}
                    onData={(value) => setOrganizationTree(value)}
                    onAddClick={() => setSecondCategoryVisible(true)}
                  />
                )}
              </>
            ) : (
              <NoContent style={{ marginTop: 100 }} />
            )}
          </div>
        </div>
        {visible && <CategoryModal {...oneLevelCategoryModalProps} />}
        {secondCategoryVisible && (
          <SecondCategoryModal
            visible={secondCategoryVisible}
            treeData={treeData}
            title="添加二级类目"
            bodyStyle={{ minHeight: 500, overflowY: "auto" }}
            onCancel={() => setSecondCategoryVisible(false)}
            onOk={() => {}}
          />
        )}
      </div>
    </div>
  );
}
