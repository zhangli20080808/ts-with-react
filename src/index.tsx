// @ts-nocheck
import React from "react";
import ReactDOM from "react-dom";
import "./styles/index.scss";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

// import { DndProvider } from 'react-dnd';
// import { HTML5Backend } from 'react-dnd-html5-backend'
// ReactDOM.render(
//   <DndProvider backend={HTML5Backend}>
//     <App />
//   </DndProvider>,
//   document.getElementById('root'))


ReactDOM.render(<App />, document.getElementById("root"));

serviceWorker.unregister();
