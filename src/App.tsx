import React from 'react';
import Button, {ButtonSize, ButtonType} from './components/Button/button';

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <Button disabled>普通按钮</Button>
                <Button btnType={ButtonType.Primary} size={ButtonSize.Large}>
                    Primary
                </Button>
                <Button btnType={ButtonType.Link} href="www.baidu.com" disabled>
                    baidu
                </Button>
            </header>
        </div>
    );
}

export default App;
