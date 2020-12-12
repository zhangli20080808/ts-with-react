import React, { useContext } from 'react';

import classnames from 'classnames';
import { MenuContext } from './menu';

export interface MenuItemProps {
  index: number;
  className?: string;
  style?: React.CSSProperties;
  disabled?: boolean;
}

const MenuItem: React.FC<MenuItemProps> = (props) => {
  const { index, className, style, children, disabled } = props;
  const context = useContext(MenuContext);
  const classes = classnames('menu-item', className, {
    'is-disabled': disabled,
    'is-active': context.index === index,
  });
  const handleClick = () => {
    if (context.onSelect && !disabled) {
      context.onSelect(index);
    }
  };
  return (
    <li className={classes} style={style} onClick={handleClick}>
      {children}
    </li>
  );
};

export default MenuItem;
