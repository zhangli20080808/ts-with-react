import React, { useEffect, useRef } from "react";

interface CarouselProps {
  src: string[];
}

const Index: React.FC<CarouselProps> = props => {
  const { src } = props;
  let containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    // console.log(containerRef.current);
    // for (let child of containerRef.current) {
    //   child.style.transform = `translateX(-100%)`;
    // }

    setInterval(() => {
      console.log(containerRef.current);
      if (containerRef.current && containerRef.current.children) {
        let children = containerRef.current.children;
        for (let child of Array.from(children)) {
          console.log(child);
          // child["transform"] = `translateX(-100%)`;
        }
      }

      // if (containerRef.current) {
      //   containerRef.current.style.transform = `translateX(-100%)`;
      // }
    }, 1000);
  }, []);
  const renderContent = src.map(img => {
    return (
      <div
        className="curImg"
        key={img}
        style={{ backgroundImage: `url('${img}')` }}
      />
    );
  });
  return (
    <div className="carousel" ref={containerRef}>
      {renderContent}
    </div>
  );
};
export default Index;
