import React, { Fragment } from 'react';
import { useSpring, animated } from 'react-spring';

export default function XucXac(props) {
    let { xucXac } = props;
    const [propsDice, set] = useSpring(() => ({
        to: {
            xyz: [1800, 1800, 1800],
        },
        from: {
            xyz: [0, 0, 0],
        },
        config: {
            duration: 1000,
        },
        reset: true,
    }))
    set.start({ xyz: [1800, 1800, 1800] });    
  
    return (
        <Fragment>
            <div className="scene" >
                <animated.div className="cube" style={{
                    transform: propsDice.xyz.to((x, y, z) => `translateZ(-25px) rotateX(${x}deg) rotateY(${y}deg) rotateZ(${z}deg)`)
                }}>
                    <div className="cube__face front">
                        <img src={xucXac.hinhAnh} alt={xucXac.hinhAnh} style={{ width: '100%' }}/>
                    </div>
                    <div className=" cube__face back">
                        <img src="./img/gamebaucua/nai.png" alt="./img/gamebaucua/nai.png" style={{ width: '100%' }} />
                    </div>
                    <div className=" cube__face left">
                        <img src="./img/gamebaucua/bau.png" alt="./img/gamebaucua/bau.png" style={{ width: '100%' }} />
                    </div>
                    <div className=" cube__face right">
                        <img src="./img/gamebaucua/cua.png" alt="./img/gamebaucua/cua.png" style={{ width: '100%' }} />
                    </div>
                    <div className=" cube__face top">
                        <img src="./img/gamebaucua/ga.png" alt="./img/gamebaucua/ga.png" style={{ width: '100%' }} />
                    </div>
                    <div className=" cube__face bottom">
                        <img src="./img/gamebaucua/tom.png" alt="./img/gamebaucua/tom.png" style={{ width: '100%' }} />
                    </div>
                </animated.div>
            </div>
        </Fragment>
    )
}
