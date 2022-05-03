/**
 * https://tiandisheng.top/dragdemo/dnd/nest
 * https://react-beautiful-dnd.netlify.app/?path=/story/board--long-lists-in-a-short-container
 * https://github.com/atlassian/react-beautiful-dnd
 * <DragDropContext />-包装您想要启用拖放的应用程序部分
 * <Droppable />-可以放入的区域。包含<Draggable />_
 * <Draggable />-可以拖动什么
 */
import React, { useCallback, useState } from "react";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DraggableProvidedDraggableProps,
} from "react-beautiful-dnd";
import { Input, Divider } from "antd";
import IndicatorsAndCategoryModal from "./components/modal/Indicators";
import TitleContainer from "./components/TitleContainer/index";
import { AddIndicatorsAndCategory } from "./types";
const OpBtn: React.FC<{
  onClick?: () => void;
  style?: React.CSSProperties;
}> = ({ style, onClick, children }) => {
  return (
    <div className="opBtn" onClick={onClick} style={style}>
      {children}
    </div>
  );
};

export const PageTitle: React.FC<{
  title: string;
}> = ({ title }) => {
  return (
    <>
      <div>
        <div className="pageTitle">{title}</div>
        <Divider style={{ margin: 0 }} />
      </div>
    </>
  );
};

const getItems = (count: number) =>
  Array.from({ length: count }, (v, k) => k).map((k, index) => ({
    id: index,
    content: `item ${k}`,
  }));
const reorder = (list: Array<any>, startIndex: number, endIndex: number) => {
  if (endIndex === 0) {
    return list;
  }
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};
export default function Card() {
  const [items, setItems] = useState(() => getItems(10));
  const [currentRow, setCurrentRow] = useState({} as any);
  const [indicatorsVisible, setIndicatorsVisible] = useState(false);
  const getItemStyle = (
    isDragging: boolean,
    draggableStyle: DraggableProvidedDraggableProps["style"]
  ) => ({
    // some basic styles to make the items look a bit nicer
    // userSelect: "none",
    padding: "7px 12px",
    margin: `8px 0 8px 0`,
    // change background colour if dragging
    background: isDragging ? "lightgreen" : "#F8F9FA",
    // styles we need to apply on draggables
    ...draggableStyle,
  });
  // 整个拖动区域内容的样式
  const getListStyle = (isDraggingOver: boolean) => ({
    background: isDraggingOver ? "lightyellow" : "#fff",
    width: '100%',
  });
  const onDragEnd = useCallback(
    (result) => {
      if (!result.destination) {
        return;
      }
      const resultItems = reorder(
        items,
        result.source.index,
        result.destination.index
      );
      setItems(resultItems);
    },
    [items]
  );
  const handleDelete = useCallback(() => {
    console.log(123);
  }, []);

  const handleSave = useCallback((isEditing, item) => {
    if (!isEditing) {
      setCurrentRow(item);
      return;
    }
    // api 保存传递redux中的数据
    // setCurrentRow(item);
    setCurrentRow({});
  }, []);
  const indicatorsModalProps: AddIndicatorsAndCategory = {
    visible: indicatorsVisible,
    onCancel: () => setIndicatorsVisible(false),
    title: "添加展示指标",
    defaultSelectedKeys: items.map((item) => item.id),
    cancelText: "取消",
    okText: "确定",
    placeholder: "搜索展示指标",
  };
  return (
    <div className="common">
      <PageTitle title="Banner" />
      <div className="content">
        12312
        <TitleContainer title="展示指标配置：" extraContent={<span>123</span>}>
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="droppable">
              {(provided, snapshot) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="list"
                  style={getListStyle(snapshot.isDraggingOver)}
                >
                  {items.map((item, index) => {
                    const isEditing = currentRow.id === item.id;
                    return (
                      <Draggable
                        key={item.id}
                        draggableId={String(item.id)}
                        index={index}
                        isDragDisabled={index <= 0}
                      >
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={getItemStyle(
                              snapshot.isDragging,
                              provided.draggableProps.style
                            )}
                            className="item"
                          >
                            <div className="left">
                              {isEditing ? (
                                <Input
                                  style={{ width: 160 }}
                                  defaultValue={item.content}
                                  value={item.content}
                                  onChange={(e) => {
                                    const newItem = [...items];
                                    const currentItem = newItem[index];
                                    currentItem.content = e.target.value;
                                    setItems(newItem);
                                  }}
                                />
                              ) : (
                                item.content
                              )}
                            </div>
                            <div className="right">
                              <span onClick={() => handleSave(isEditing, item)}>
                                {isEditing ? "保存" : "编辑"}
                              </span>
                              <span onClick={handleDelete}>删除</span>
                            </div>
                          </div>
                        )}
                      </Draggable>
                    );
                  })}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </TitleContainer>
        <OpBtn onClick={() => setIndicatorsVisible(true)}>添加展示指标</OpBtn>
        <TitleContainer title="通知公告配置：">
          <OpBtn
            onClick={() => setIndicatorsVisible(true)}
            style={{ marginBottom: 86 }}
          >
            通知公告配置
          </OpBtn>
        </TitleContainer>
        <OpBtn onClick={() => setIndicatorsVisible(true)}>模块恢复默认</OpBtn>
        {indicatorsVisible && (
          <IndicatorsAndCategoryModal {...indicatorsModalProps} />
        )}
      </div>
    </div>
  );
}
