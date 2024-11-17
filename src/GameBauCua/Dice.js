import React, { Fragment, useEffect, useState } from "react";
import { useSpring, animated } from "react-spring";

export default function Dice(props) {
  const { xucXac, isRolling, nextFace } = props;
  const [currentFace, setCurrentFace] = useState(xucXac);

  // Update currentFace when xucXac prop changes
  useEffect(() => {
    setCurrentFace(xucXac);
  }, [xucXac]);

  const [propsxucXac, api] = useSpring(() => ({
    from: { xyz: [0, 0, 0] },
    config: { duration: 1000 },
    reset: true,
    onRest: () => {
      if (!isRolling && nextFace) {
        setCurrentFace(nextFace);
      }
    },
  }));

  useEffect(() => {
    if (isRolling) {
      api.start({ xyz: [1800, 1800, 1800] });
    } else {
      api.start({ xyz: [0, 0, 0] });
      if (nextFace) {
        setCurrentFace(nextFace);
      }
    }
  }, [isRolling, nextFace, api]);

  return (
    <Fragment>
      <div className="scene">
        <animated.div
          className="cube"
          style={{
            transform: propsxucXac.xyz.to(
              (x, y, z) =>
                `translateZ(-25px) rotateX(${x}deg) rotateY(${y}deg) rotateZ(${z}deg)`
            ),
          }}
        >
          <div className="cube__face front">
            <img
              src={currentFace.hinhAnh}
              alt="front"
              style={{ width: "100%" }}
            />
          </div>
          <div className="cube__face back">
            <img
              src={currentFace.hinhAnh}
              alt="back"
              style={{ width: "100%" }}
            />
          </div>
          <div className="cube__face right">
            <img
              src={currentFace.hinhAnh}
              alt="right"
              style={{ width: "100%" }}
            />
          </div>
          <div className="cube__face left">
            <img
              src={currentFace.hinhAnh}
              alt="left"
              style={{ width: "100%" }}
            />
          </div>
          <div className="cube__face top">
            <img
              src={currentFace.hinhAnh}
              alt="top"
              style={{ width: "100%" }}
            />
          </div>
          <div className="cube__face bottom">
            <img
              src={currentFace.hinhAnh}
              alt="bottom"
              style={{ width: "100%" }}
            />
          </div>
        </animated.div>
      </div>
    </Fragment>
  );
}
