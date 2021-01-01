// 1. 完全可控(可以用任何的css属性来控制他) fontIcon呢 是字符
// 2. svg 即取即用 fontIcon要 下载全部字体才能使用
// 3. fontIcon 会遇到各种奇怪的bug

// 安装 https://www.npmjs.com/package/react-fontawesome
import React from "react";
import classNames from "classnames";
import {
  FontAwesomeIcon,
  FontAwesomeIconProps
} from "@fortawesome/react-fontawesome";

export type ThemeProps =
  | "primary"
  | "secondary"
  | "success"
  | "info"
  | "warning"
  | "danger"
  | "light"
  | "dark";

export interface IconProps extends FontAwesomeIconProps {
  theme?: ThemeProps;
}

const Icon: React.FC<IconProps> = props => {
  const { className, theme, ...restProps } = props;

  // 根据 theme 的不同，添加不同的 className   icon-primary
  const classes = classNames("viking-icon", className, {
    [`icon-${theme}`]: theme
  });

  return <FontAwesomeIcon className={classes} {...restProps} />;
};

export default Icon;
