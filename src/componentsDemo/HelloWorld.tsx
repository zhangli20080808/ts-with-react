import React, { useContext } from "react";
import { ThemeContent } from "../Demo";

const propTypes = {};

const defaultProps = {
  message: "zl"
};

interface IHelloProps {
  message?: String;
}

//泛型
const HelloWorld: React.FC<IHelloProps> = props => {
  // props children props.message

  const theme = useContext(ThemeContent);
  console.log(theme);
  const style = {
    background: theme.background,
    color: theme.color
  };
  return (
    <React.Fragment>
      <div style={style}>{props.message}</div>
    </React.Fragment>
  );
};

export default HelloWorld;

HelloWorld.propTypes = propTypes;
HelloWorld.defaultProps = defaultProps;
