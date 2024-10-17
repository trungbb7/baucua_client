import React, { Fragment, useEffect } from 'react';
import { useSpring, animated } from 'react-spring';

export default function XucXac(props) {
    const { xucXac, isRolling } = props;
    const [propsDice, api] = useSpring(() => ({
        from: { xyz: [0, 0, 0] },
        config: { duration: 1000 },
        reset: true,
    }));

    useEffect(() => {
        if (isRolling) {
            api.start({ xyz: [1800, 1800, 1800] });
        } else {
            api.start({ xyz: [0, 0, 0] });
        }
    }, [isRolling, api]);

    return (
        <Fragment>
            <div className="scene">
                <animated.div className="cube" style={{
                    transform: propsDice.xyz.to((x, y, z) => `translateZ(-25px) rotateX(${x}deg) rotateY(${y}deg) rotateZ(${z}deg)`)
                }}>
                    <div className="cube__face front">
                        <img src={xucXac.hinhAnh} alt="front" style={{ width: '100%' }} />
                    </div>
                    <div className="cube__face back">
                        <img src="./img/gamebaucua/nai.png" alt="back" style={{ width: '100%' }} />
                    </div>
                    <div className="cube__face left">
                        <img src="./img/gamebaucua/bau.png" alt="left" style={{ width: '100%' }} />
                    </div>
                    <div className="cube__face right">
                        <img src="./img/gamebaucua/cua.png" alt="right" style={{ width: '100%' }} />
                    </div>
                    <div className="cube__face top">
                        <img src="./img/gamebaucua/ga.png" alt="top" style={{ width: '100%' }} />
                    </div>
                    <div className="cube__face bottom">
                        <img src="./img/gamebaucua/tom.png" alt="bottom" style={{ width: '100%' }} />
                    </div>
                </animated.div>
            </div>
        </Fragment>
    );
}
