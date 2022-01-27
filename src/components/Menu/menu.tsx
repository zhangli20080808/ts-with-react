import React, { createContext, useState } from "react";

import classnames from "classnames";
import { MenuItemProps } from "./menuItem";

type SelectCallback = (selectedIndex: string) => void;
type MenuMode = "horizontal" | "vertical";

export interface MenuProps {
  defaultIndex?: string;
  className?: string;
  mode?: MenuMode;
  style?: React.CSSProperties;
  onSelect?: SelectCallback;
  defaultOpenSubMenus?: string[];
}

interface IMenuContext {
  index: string;
  onSelect?: SelectCallback;
  mode?: MenuMode;
  defaultOpenSubMenus?: string[];
}

export const MenuContext = createContext<IMenuContext>({ index: "0" });

const Menu: React.FC<MenuProps> = (props) => {
  const {
    className,
    mode,
    style,
    children,
    defaultIndex,
    onSelect,
    defaultOpenSubMenus,
  } = props;
  const [currentActive, setActive] = useState(defaultIndex);

  const classes = classnames("viking-menu", className, {
    "menu-vertical": mode === "vertical",
    "menu-horizontal": mode !== "vertical",
  });

  const handleClick = (index: string) => {
    setActive(index);
    if (onSelect) {
      onSelect(index);
    }
  };

  const passedContext: IMenuContext = {
    index: currentActive ? currentActive : "0",
    onSelect: handleClick,
    mode,
    defaultOpenSubMenus,
  };
  const renderChildren = () => {
    return React.Children.map(children, (child, index) => {
      //  我们类型断言 将他转成 funcComp的实例
      const childElement = child as React.FunctionComponentElement<MenuItemProps>;
      // type 包含了 FunctionComponentElement 上面的各种属性
      const { displayName } = childElement.type;
      // 把某些属性混入进新的组件
      if (displayName === "MenuItem" || displayName === "SubMenu") {
        // return child
        return React.cloneElement(childElement, {
          index: index.toString(),
        });
      } else {
        console.error("Warning：Menu has a child which is not a MenuItem");
      }
    });
  };
  return (
    <ul className={classes} style={style} data-testid="test-menu">
      <MenuContext.Provider value={passedContext}>
        {renderChildren()}
      </MenuContext.Provider>
    </ul>
  );
};

Menu.defaultProps = {
  defaultIndex: "0",
  mode: "horizontal",
  defaultOpenSubMenus: [],
};
export default Menu;
