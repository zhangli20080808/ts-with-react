import React, { Component } from 'react';

import Button from './components/Button/button';
const App: React.FC = () => {
  return (
    <div>
      <Button className="customer">普通按钮</Button>
      <Button disabled>disabled</Button>
      <Button btnType="primary" size="lg">
        Primary
      </Button>
      <Button btnType="primary" size="sm">
        Primary
      </Button>
      <Button btnType="danger" size="sm">
        Danger
      </Button>
      <Button btnType="link" href="www.baidu.com" target="_black">
        Link
      </Button>
      <Button btnType="link" href="www.baidu.com" disabled>
        Link
      </Button>
    </div>
  );
};
 
export default App;
