import React, { FC } from "react";
import PhotoPreview from "./index";
import { PreviewImage } from "./types";

const toolBarOptions = {
  toSmall: true, // 缩小按钮
  toBig: true, // 放大按钮
  turnLeft: true, // 左转按钮
  turnRight: true, // 右转按钮
  close: true, // 关闭按钮
  esc: true // esc键触发
};

const Index: FC<PreviewImage> = props => {
  const { imgGroup, index, tool } = props;
  const passIndex = (index !== null || true) && Number(index);
  const toolBar = { ...toolBarOptions, ...tool };

  const renderContent = () => {
    if (Array.isArray(imgGroup)) {
      return (
        <>
          {imgGroup
            .filter((_: any, idx: number) => idx === index)
            .map((item: any) => {
              return (
                <PhotoPreview
                  key={index}
                  imgGroup={imgGroup}
                  url={item.url || item}
                  imgIndex={passIndex}
                  tool={toolBar}
                />
              );
            })}
        </>
      );
    } else if (typeof imgGroup === "string") {
      return (
        <PhotoPreview
          imgIndex={0}
          imgGroup={imgGroup}
          url={imgGroup}
          tool={toolBar}
        />
      );
    }
  };

  return <>{renderContent()}</>;
};

Index.defaultProps = {
  index: 0
};

export default Index;
