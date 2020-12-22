import React from 'react';

import Button from './components/Button/button';
import Menu from './components/Menu/menu';
import MenuItem from './components/Menu/menuItem';

const App: React.FC = () => {
    return (
        <div style={{padding: 30}}>
            <Menu defaultIndex={"0"} onSelect={(index) => alert(index)} mode='vertical'>
                <MenuItem>1</MenuItem>
                <MenuItem disabled>2</MenuItem>
                <MenuItem>3</MenuItem>
                <MenuItem>4</MenuItem>
                <li>123123</li>
            </Menu>
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
            <div>learn react</div>
        </div>
    );
};

export default App;
