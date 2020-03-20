import React, { useState, useContext } from 'react';
import logo from './logo.svg';
// import HelloWorld from './components/HelloWorld'
import MouseTracker from './components/MouseTracker'
import useMouseHooks from './hooks/useMouseHooks'
import useLoaders from './hooks/useLoaderhooks'
import LikeButton from './components/LikeButton'
import './App.css';
import HelloWorld from './components/HelloWorld';

interface IShowResult {
  message: string,
  status: string
}

const DogShow: React.FC<{ data: IShowResult }> = ({ data }) => {
  return (
    <div>
      <h1> {data.status}</h1>
      <img src={data.message} alt="" />
    </div>
  )
}

// 全局的主题
interface IThemeProps {
  [key: string]: { color: string, background: string }
}
const theme: IThemeProps = {
  'light': {
    color: 'blue',
    background: 'red'
  },
  'dark': {
    color: '#fff',
    background: 'black'
  }
}
export const ThemeContent = React.createContext(theme.light)

function App() {
  //  hooks 只在最顶层调用hooks 只在函数中调用hook 或者在定义的hook中调用其他的hook

  const [show, setShow] = useState(false)
  // const position = useMouseHooks()
  const [toggle, setToggle] = useState(false)
  const [data, loading] = useLoaders('https://dog.ceo/api/breeds/image/random', [show])

  const dogResult = data as IShowResult

  return (
    <div className="App">
      <ThemeContent.Provider value={toggle ? theme.dark : theme.light}>
        <HelloWorld />
        <button onClick={() => setToggle(!toggle)}>切换主题</button>
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.tsx</code> and save to reload.
        </p>
          <button onClick={() => setShow(!show)}>toggle images</button>
          <MouseTracker />
          <LikeButton />
          {/* <div>{position.x}{position.y}</div> */}
          {
            loading ? <div>🐶 读取中 </div> : <img width='100px' height='100px' src={dogResult && data.message} alt="" />
          }
        </header>
      </ThemeContent.Provider>

    </div>
  );
}

export default App;
