import React, { useRef, useState } from "react";
import ReactDOM from "react-dom";
import { IToolProps } from "./previewImage";

interface PreviewImagesProps {
  // 工具栏
  tool: IToolProps;
  // 当前图片索引
  imgIndex?: number;
  imgGroup: Array<string | object> | string | object;
  bigUrl?: string;
  url: string;
  alt?: string;
}

interface ImgAttrProps {
  src: string;
  alt?: string;
  imgOriginalHeight?: number;
  imgOriginalWidth?: number;
}

const Index: React.FC<PreviewImagesProps> = props => {
  // 合并工具栏
  console.log(props);
  const { tool, url } = props;
  const [imgGroup, setImgGroup] = useState(props.imgGroup);
  const [bigUrl, setBigUrl] = useState(props.bigUrl);
  const [imgIndex, setImgIndex] = useState(props.imgIndex);
  // loading元素显示隐藏
  const [loadEl, setLoadEl] = useState(false);
  // 生成图片预览元素
  const [figureEl, setFigureEl] = useState(false);
  // 当前大图默认宽高值
  const [imgOriginal, setImgOriginal] = useState({
    imgOriginalWidth: 0,
    imgOriginalHeight: 0
  });
  // 大图的地址及描述
  const [imgAttr, setImgAttr] = useState<ImgAttrProps>({
    src: "",
    alt: "",
    imgOriginalWidth: 0,
    imgOriginalHeight: 0
  });
  // 大图父级div元素样式
  const [imgParentStyle, setImgParentStyle] = useState<any>({});
  const [rotateDeg, setRotateDeg] = useState(0); // 图片旋转角度
  const ppiRef = useRef(null);
  const bigImgRef = useRef(null);

  const iParentStyle = { ...imgParentStyle };

  /**
   *  图片预览
   * @param url 传入的当前图片url
   * @param alt
   */
  const handlePhotoShow = (url: string, alt: string) => {
    setLoadEl(true);
    setFigureEl(true);
    const img = new Image();
    console.log(url, "url");
    img.src = url;
    img.onload = function() {
      setLoadEl(false);
      setImgOriginal({
        imgOriginalHeight: img.height,
        imgOriginalWidth: img.width
      });
      // 如果需要重置图片 需要记录图片原始的宽高 我们记录在图片属性中
      setImgAttr({
        src: `${url}`,
        alt,
        imgOriginalHeight: img.height,
        imgOriginalWidth: img.width
      });
      setImgParentStyle({
        width: `${img.width}px`,
        height: `${img.height}px`
      });
    };
  };

  /**
   * 图片放大事件，默认放大三倍,不能超过三倍
   */
  const handleToBigEvent = () => {
    if (!tool.toBig) return;
    let width = parseFloat(imgParentStyle.width) * 1.5;
    let height = parseFloat(imgParentStyle.height) * 1.5;
    if (width > imgOriginal.imgOriginalWidth * 3) {
      width = imgOriginal.imgOriginalWidth * 3;
      height = imgOriginal.imgOriginalHeight * 3;
    }
    setImgParentStyle({
      ...imgParentStyle,
      width: `${width}px`,
      height: `${height}px`
    });
  };

  /**
   * 图片缩小事件
   */
  const handleToSmallEvent = () => {
    if (!tool.toSmall) return;
    let width = parseFloat(imgParentStyle.width) / 1.5;
    let height = parseFloat(imgParentStyle.height) / 1.5;
    if (width < imgOriginal.imgOriginalWidth / 3) {
      width = imgOriginal.imgOriginalWidth / 3;
      height = imgOriginal.imgOriginalHeight / 3;
    }
    setImgParentStyle({
      ...imgParentStyle,
      width: `${width}px`,
      height: `${height}px`
    });
  };

  /**
   * 重置图片
   */
  const handleResetImg = () => {
    const { imgOriginalHeight, imgOriginalWidth } = imgAttr;
    setImgParentStyle({
      ...imgParentStyle,
      width: `${imgOriginalWidth}px`,
      height: `${imgOriginalHeight}px`,
      transform: `rotate(${0}deg)` // TODO
    });
  };

  /**
   * 左旋转事件
   */
  const handleToTurnLeftEvent = () => {
    if (!tool.turnLeft) return;
    const turnRotateDeg = rotateDeg - 90;
    setImgParentStyle({
      ...imgParentStyle,
      transform: `rotate(${turnRotateDeg}deg)`
    });
    setRotateDeg(turnRotateDeg);
  };

  /**
   * 右旋转事件
   */
  const handleToTurnRightEvent = () => {
    if (!tool.turnLeft) return;
    const turnRotateDeg = rotateDeg + 90;
    setRotateDeg(turnRotateDeg);
    setImgParentStyle({
      ...imgParentStyle,
      transform: `rotate(${turnRotateDeg}deg)`
    });
  };

  /**
   * 上、下一张图片
   */
  const handlePrevNextEvent = (type: string) => {
    if (loadEl) return;
    if (!Array.isArray(imgGroup)) return;
    const nowImgIndex =
      type === "next" ? (imgIndex as number) + 1 : (imgIndex as number) - 1;
    if (type === "next" && nowImgIndex > imgGroup.length - 1) {
      return;
    }
    if (type === "prev" && nowImgIndex < 0) {
      return;
    }
    let current;
    if (typeof imgGroup[nowImgIndex] === "object") {
      current = (imgGroup[nowImgIndex] as any).url;
    } else {
      current = imgGroup[nowImgIndex];
    }
    setImgIndex(nowImgIndex);
    setRotateDeg(0);
    setImgParentStyle({
      width: "0px",
      height: "0px"
    });
    handlePhotoShow(current, "");
  };

  return (
    <div className="photo-preview">
      {/*默认小的缩略图*/}
      <div>
        <img
          onClick={() => handlePhotoShow(url, "")}
          src={props.url}
          alt={props.alt}
          className="photo-preview__thumb-img"
        />
      </div>
      {/*弹窗预览具体图片*/}
      {figureEl &&
        ReactDOM.createPortal(
          <>
            <figure className="photo-preview">
              <div className="photo-preview__in" ref={ppiRef}>
                {loadEl ? (
                  <div className="photo-preview__loading" />
                ) : (
                  <div className="photo-preview__img-wrap" style={iParentStyle}>
                    <span
                      className="photo-preview__img-placeholder"
                      // style={{
                      //   ...iSpanStyle,
                      //   marginLeft: `-${increaseNum}px`,
                      //   marginTop: `-${increaseNum}px`
                      // }}
                    />
                    <img
                      src={imgAttr.src}
                      alt={imgAttr.alt}
                      // onMouseDown={this.bigImgMouseDown}
                      ref={bigImgRef}
                    />
                  </div>
                )}
                <div className="photo-preview__tool">
                  {tool.toSmall && (
                    <span
                      className="iconfont icon-to-small"
                      onClick={handleToSmallEvent}
                    >
                      缩小
                    </span>
                  )}
                  {tool.toBig && (
                    <span
                      className="iconfont icon-to-big"
                      onClick={handleToBigEvent}
                    >
                      放大
                    </span>
                  )}
                  {tool.turnLeft && (
                    <span
                      className="iconfont icon-turn-left"
                      onClick={handleToTurnLeftEvent}
                    >
                      左旋转
                    </span>
                  )}
                  {/*<span onClick={handleResetImg}>重置图片</span>*/}
                  {tool.turnRight && (
                    <span
                      className="iconfont icon-turn-right"
                      onClick={handleToTurnRightEvent}
                    >
                      右旋转
                    </span>
                  )}

                  {Array.isArray(imgGroup) && imgGroup.length > 1 ? (
                    <>
                      <span
                        className="iconfont icon-go-left"
                        onClick={() => handlePrevNextEvent("prev")}
                        data-disable={loadEl ? "true" : "false"}
                      >
                        左
                      </span>
                      <span
                        className="iconfont icon-go-right"
                        onClick={() => handlePrevNextEvent("next")}
                        data-disable={loadEl ? "true" : "false"}
                      >
                        右
                      </span>
                    </>
                  ) : null}
                  {tool.close && (
                    <span
                      onClick={() => {
                        setFigureEl(false);
                      }}
                    >
                      关闭
                    </span>
                  )}
                </div>
              </div>
            </figure>
          </>,
          document.body
        )}
    </div>
  );
};
Index.defaultProps = {
  imgGroup: [],
  imgIndex: 0
};
export default Index;
