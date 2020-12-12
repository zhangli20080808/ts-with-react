import React from 'react';
import { render, fireEvent, RenderResult, cleanup } from '@testing-library/react';

import Menu, { MenuProps } from './menu';

import MenuItem from './menuItem';

// 1. 提供默认属性 显示正常行为
// 2. 测试行为 点击事件切换 还是属性的回调触发
// 3. 渲染对应的class

const testProps: MenuProps = {
  defaultIndex: '0',
  onSelect: jest.fn(),
  className: 'test',
};

const testVerProps: MenuProps = {
  defaultIndex: '0',
  mode: 'vertical',
};

// 用来渲染不同类型的组件
const generateMenu = (props: MenuProps) => {
  return (
    <Menu {...props}>
      <MenuItem index="0">active</MenuItem>
      <MenuItem disabled index="1">
        disabled
      </MenuItem>
      <MenuItem index="2">xyz</MenuItem>
    </Menu>
  );
};
// 由于几个case都要操作相同的元素，
let wrapper: RenderResult,
  menuElement: HTMLElement,
  activeElement: HTMLElement,
  disableElement: HTMLElement;
describe('test Menu and MenuItem component', () => {
  beforeEach(() => {
    wrapper = render(generateMenu(testProps));
    // 一般都是通过渲染元素的内容 而不是通过id class 推荐给外层的元素加上一个id
    menuElement = wrapper.getByTestId('test-menu');
    activeElement = wrapper.getByText('active');
    disableElement = wrapper.getByText('disabled');
  });
  it('should render current Menu and MenuItem based on default props', () => {
    expect(menuElement).toBeInTheDocument();
    expect(menuElement).toHaveClass('viking-menu test');
    expect(menuElement.getElementsByTagName('li').length).toEqual(3);
    expect(activeElement).toHaveClass('menu-item is-active');
    expect(disableElement).toHaveClass('menu-item is-disabled');
  });
  it('click item should change active and call the right callback', () => {
    const thirdItem = wrapper.getByText('xyz');
    fireEvent.click(thirdItem);
    expect(thirdItem).toHaveClass('is-active');
    expect(activeElement).not.toHaveClass('is-active');
    expect(testProps.onSelect).toHaveBeenCalledWith('2');
    fireEvent.click(disableElement);
    expect(disableElement).not.toHaveClass('is-active');
    expect(testProps.onSelect).not.toHaveBeenCalledWith('1');
  });
  it('should render vertical class when mode is vertical', () => {
    cleanup()
    const wrapper = render(generateMenu(testVerProps));
    const menuElement = wrapper.getByTestId('test-menu');
    expect(menuElement).toHaveClass('menu-vertical');
  });
});
