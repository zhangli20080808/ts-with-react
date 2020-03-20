import React, { useState, useEffect, useRef, useContext } from 'react';
import { ThemeContent } from '../App'

const LikeButton: React.FC = () => {
  const [count, setCount] = useState(0);
  const likeRef = useRef(0) //useRef 和 我们普通 创建对象 的区别是 再render的时候保留着唯一的引用
  // 修改 ref 的值是不会引起组件的重新渲染的

  const didMount = useRef(false)
  //拿到html input夜店
  const inputRef = useRef<HTMLInputElement>(null)

  const theme = useContext(ThemeContent)
  console.log(theme);
  const style = {
    width: 200,
    height:200,
    background: theme.background,
    color: theme.color
  }

  useEffect(() => {
    document.title = `点击了${count}次`
  }, [count])
  function handleClick() {
    setTimeout(() => {
      console.log('likeRef', likeRef.current);

    }, 3000);
  }
  function likes() {
    setCount(count + 1)
    likeRef.current++
  }
  useEffect(() => {
    if (didMount.current) {
      console.log('this is update');
    } else {
      didMount.current = true
    }
  })
  useEffect(() => {
    if (inputRef && inputRef.current) {
      // console.log(inputRef.current);
      inputRef.current.focus()
    }
  })
  return (
    <React.Fragment>
      <div style={style}>
        <button onClick={() => likes()}>{count}</button>
        <button onClick={() => handleClick()}>alert</button>
        <input type="text" ref={inputRef} />
      </div>

    </React.Fragment>
  );
}

export default LikeButton