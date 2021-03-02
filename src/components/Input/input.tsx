import React, { FC, InputHTMLAttributes, ReactElement } from 'react';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

type InputSize = 'lg' | 'sm';

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLElement>, 'size'> {
  disabled?: boolean;
  size?: InputSize;
  icon?: IconProp;
  prepand?: string | ReactElement;
  append?: string | ReactElement;
}

export const Input: FC<InputProps> = (props) => {
  const { disabled, size, icon, prepand, append } = props;
  // 取出各种属性
  // 根据属性计算不同的className
  // 根据属性判断是否要添加特定的节点
  return <React.Fragment></React.Fragment>;
};
