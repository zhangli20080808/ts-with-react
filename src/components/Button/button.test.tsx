import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import Button, { ButtonProps } from './button';

// test('first react test case', () => {
//   const wrapper = render(<Button>Test</Button>);
//   const element = wrapper.queryByText('Test');
//   expect(element).toBeTruthy();
//   // 判断组件是否在文档中
//   expect(element).toBeInTheDocument()
// });

const defaultProps: ButtonProps = {
  onClick: jest.fn(), // 创建一个被监控的模拟函数
};

const testProps: ButtonProps = {
  size: 'lg',
  btnType: 'primary',
  className: 'klass',
};

const disableProps: ButtonProps = {
  disabled: true,
  onClick: jest.fn(),
};

describe('test Button component', () => {
  it('should render the current default button', () => {
    const wrapper = render(<Button {...defaultProps}>Test</Button>);
    const element = wrapper.getByText('Test');
    expect(element).toBeInTheDocument();
    expect(element.tagName).toEqual('BUTTON'); //注意 tagname 大写
    expect(element).toHaveClass('btn btn-default');
    fireEvent.click(element);
    expect(defaultProps.onClick).toHaveBeenCalled();
  });

  it('should render the current component base on different props', () => {
    // 组件和用户交互的逻辑 点击事件 模拟用户行为 mock function
    const wrapper = render(<Button {...testProps}>Test</Button>);
    const element = wrapper.getByText('Test');
    expect(element).toBeInTheDocument();
    expect(element).toHaveClass('btn btn-primary klass btn-lg');
  });

  it('should render a link when btnType equals link and href is provided', () => {
    const wrapper = render(<Button btnType='link' href='www.baidu.com'>Test</Button>);
    const element = wrapper.getByText('Test');
    expect(element).toBeInTheDocument();
    expect(element.tagName).toEqual('A')
    expect(element).toHaveClass('btn btn-link')

  })


  it('should render disabled button when disabled set to true', () => {
    const wrapper = render(<Button {...disableProps}>Disable</Button>);
    const element = wrapper.getByText('Disable') as HTMLButtonElement;
    expect(element).toBeInTheDocument();
    expect(element.disabled).toBeTruthy();
    fireEvent.click(element);
    expect(disableProps.onClick).not.toHaveBeenCalled();
  });
});
