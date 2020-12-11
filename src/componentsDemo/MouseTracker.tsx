import React from 'react';
import useMouseHooks from '../hooks/useMouseHooks';
const propTypes = {};

//泛型
const MouseTracker: React.FC = () => {
  // props children props.message
  const position = useMouseHooks();
  return (
    <React.Fragment>
      x:{position.x}, y:{position.y}
    </React.Fragment>
  );
};

export default MouseTracker;

MouseTracker.propTypes = propTypes;
