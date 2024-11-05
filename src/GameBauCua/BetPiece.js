import React from 'react';
import { useDispatch } from 'react-redux';
import { DAT_CUOC_BAU_CUA } from '../redux/constants/GameBauCuaActions';
import { useSpring, animated } from 'react-spring';

export default function BetPiece(props) {
    const dispatch = useDispatch();
    let { qc } = props;

    const [propsUseSpringInCrease, setInCrease] = useSpring(() => {
        return {
            reset: true,
            to: { scale: 1 },
            from: { scale: 0 },
           
        }
    })
    const [propsUseSpringDeCrease, setDeCrease] = useSpring(() => {
        return {
            reset: true,
            to: { scale: 1 },
            from: { scale: 0 },
            
        }
    })
    setInCrease.start({ scale: 0.9 });
    setInCrease.start({ scale: 1 })
    return (
        <div className="d-flex flex-column py-2">
            <img src={qc.hinhAnh} alt={qc.hinhAnh} className="img-fluid" />

            <div className="text-center mt-2 p-1 rounded datCuoc" style={{backgroundColor:'#9aabbd'}}>
                <animated.button

                    style={{ transform: propsUseSpringInCrease.scale.to(scale => `scale(${scale})`) }}

                    className="btn btn-primary" onClick={() => {
                        setInCrease.start({ scale: 0.9 });
                        setInCrease.start({ scale: 1 })

                        dispatch({
                            type: DAT_CUOC_BAU_CUA,
                            qc,
                            tangGiam: true
                        })
                    }}>+</animated.button>

                <span style={{ color: 'white' }}>{qc.diemCuoc.toLocaleString()}</span>

                <animated.button
                    style={{ transform: propsUseSpringDeCrease.scale.to(scale => `scale(${scale})`) }}

                    className="btn btn-primary" onClick={() => {
                        setDeCrease.start({ scale: 0.9 });
                        setDeCrease.start({ scale: 1 })


                        dispatch({
                            type: DAT_CUOC_BAU_CUA,
                            qc,
                            tangGiam: false
                        })
                    }}>-</animated.button>
            </div>
        </div>
    )
}
