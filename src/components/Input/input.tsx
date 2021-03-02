import React, {
  CSSProperties,
  FC,
  InputHTMLAttributes,
  ReactElement,
} from 'react';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import classNames from 'classnames';
import Icon from '../Icon/icon';

type InputSize = 'lg' | 'sm';

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLElement>, 'size'> {
  disabled?: boolean;
  size?: InputSize;
  icon?: IconProp;
  style?: CSSProperties;
  prepend?: string | ReactElement;
  append?: string | ReactElement;
}

export const Input: FC<InputProps> = (props) => {
  const { disabled, size, icon, prepend, append, style, ...restProps } = props;
  // 取出各种属性
  // 根据属性计算不同的className
  const cNames = classNames('viking-input-wrapper', {
    [`input-size-${size}`]: size,
    'is-disabled': disabled,
    'input-group': prepend || append,
    'input-group-append': !!append,
    'input-group-prepend': !!prepend,
  });
  // 根据属性判断是否要添加特定的节点
  return (
    <div className={cNames} style={style}>
      {prepend && <div className="viking-input-group-prepend">{prepend}</div>}
      {icon && (
        <div className="icon-wrapper">
          <Icon icon={icon} title={`title-${icon}`} />
        </div>
      )}
      <input
        className="viking-input-inner"
        disabled={disabled}
        {...restProps}
      />
      {append && <div className="viking-input-group-append">{append}</div>}
    </div>
  );
};
