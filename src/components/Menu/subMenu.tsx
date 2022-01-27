import React, { useContext, useState } from "react";
import classNames from "classnames";

import { MenuContext } from "./menu";
import Icon from "../Icon/icon";
import Transition from "../Transition/transition";

export interface SubMenuProps {
  index?: string;
  className?: string;
  title: string;
}

const SubMenu: React.FC<SubMenuProps> = ({
  index,
  className,
  title,
  children,
}) => {
  const context = useContext(MenuContext);
  const openSubMenus = context.defaultOpenSubMenus as Array<string>;
  const isOpened =
    index && context.mode === "vertical" ? openSubMenus.includes(index) : false;
  const [menuOpen, setOpen] = useState(isOpened);
  const classes = classNames("menu-item submenu-item", className, {
    "is-active": context.index === index,
    "is-opened": menuOpen,
    "is-vertical": context.mode === "vertical",
  });
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setOpen(!menuOpen);
  };
  let timer: any;
  const handleMouse = (e: React.MouseEvent, toggle: boolean) => {
    clearTimeout(timer);
    e.preventDefault();
    setTimeout(() => {
      setOpen(toggle);
    }, 300);
  };
  const clickEvent =
    context.mode === "vertical" ? { onClick: handleClick } : {};

  const hoverEvent =
    context.mode !== "vertical"
      ? {
          onMouseEnter: (e: React.MouseEvent) => {
            handleMouse(e, true);
          },
          onMouseLeave: (e: React.MouseEvent) => {
            handleMouse(e, false);
          },
        }
      : {};
  const renderChildren = () => {
    const subMenuClass = classNames("viking-submenu", {
      "menu-opened": menuOpen,
    });
    const childrenComponent = React.Children.map(children, (child, index1) => {
      const childElement = child as React.FunctionComponentElement<SubMenuProps>;
      const { displayName } = childElement.type;
      if (displayName === "MenuItem") {
        return React.cloneElement(childElement, {
          index: `${index}-${index1}`,
        });
      } else {
        console.error("Warning：Menu has a child which is not a MenuItem");
      }
    });
    // appear 菜单一开始有可能是打开的
    return (
      <>
        <Transition in={menuOpen} timeout={300} animation="zoom-in-top">
          <ul className={subMenuClass}>{childrenComponent}</ul>
        </Transition>
      </>
    );
  };
  return (
    <li className={classes} key={index} {...hoverEvent}>
      <div className="submenu-title" {...clickEvent}>
        {title}
        <Icon icon="angle-down" className="arrow-icon" />
      </div>
      {renderChildren()}
    </li>
  );
};

SubMenu.displayName = "SubMenu";
export default SubMenu;
