import React, { useRef } from 'react'
import { useFrame } from '@react-three/fiber';
import { easing } from 'maath';
import { useSnapshot } from 'valtio';
import state from '../store';


const CameraRig = ({children}) => {
    const snap = useSnapshot(state);
    const group = useRef();


    useFrame((state, delta) => {

        const isBreakpoint = window.innerHeight <= 1260;
        const isMobile = window.innerWidth <= 600;

        // init model pos
        let targetPos = [-0.4, 0, 2];
        if(snap.intro){
            if(isBreakpoint) targetPos = [0, 0, 2];
            if(isMobile) targetPos = [0, 0.2, 0.5];
        }
        else{
            if(isMobile) targetPos = [0, 0, 2.5];
            else targetPos = [0, 0, 2];
        }

        // set camera position
        easing.damp3(state.camera.position, targetPos, 0.25, delta);


        // model rotation
        easing.dampE(group.current.rotation, 
            [state.pointer.y / 10, -state.pointer.x / 5, 0],
            0.25, delta)
    });

    return (
    <group ref={group}>{children}</group>
  )
}

export default CameraRig