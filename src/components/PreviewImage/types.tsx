export interface PreviewImage {
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
export interface PreviewImagesProps {
  // 工具栏
  tool: IToolProps;
  // 当前图片索引
  imgIndex?: number;
  imgGroup: Array<string | object> | string | object;
  bigUrl?: string;
  url: string;
  alt?: string;
}

export interface ImgAttrProps {
  src: string;
  alt?: string;
  imgOriginalHeight?: number;
  imgOriginalWidth?: number;
}

export interface StyleObj {
  [key: string]: string;
}
