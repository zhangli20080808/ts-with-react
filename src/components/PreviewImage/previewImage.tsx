import React, { FC, useEffect, useState } from "react";
import PhotoPreview from "./index";

interface PreviewImage {
  imgGroup: Array<string | object> | string | object;
  index?: string | number;
  tool?: IToolProps;
}

export interface IToolProps {
  toSmall: boolean; // 缩小按钮
  toBig: boolean; // 放大按钮
  turnLeft: boolean; // 左转按钮
  turnRight: boolean; // 右转按钮
  close: boolean; // 关闭按钮
  esc: boolean; // esc键触发
}

const PreviewImage: FC<PreviewImage> = props => {
  const { imgGroup, index, tool } = props;

  const [toolBar, setToolBar] = useState<IToolProps>({
    toSmall: true, // 缩小按钮
    toBig: true, // 放大按钮
    turnLeft: true, // 左转按钮
    turnRight: true, // 右转按钮
    close: true, // 关闭按钮
    esc: true // esc键触发
  });

  const passIndex = (index !== null || true) && Number(index);

  useEffect(() => {
    setToolBar({ ...toolBar, ...tool });
  }, []);
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

PreviewImage.defaultProps = {
  index: 0
};

export default PreviewImage;
