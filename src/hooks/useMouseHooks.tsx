import {useState, useEffect} from 'react';

const useMouseHooks = () => {
    const [position, setPosition] = useState({x: 0, y: 0});
    useEffect(() => {
        const updateMoves = (e: MouseEvent) => {
            setPosition({x: e.clientX, y: e.clientY});
        };
        document.addEventListener('mousemove', updateMoves);
        return () => {
            document.removeEventListener('mousemove', updateMoves);
        };
    }, []);

    return position;
};

export default useMouseHooks;
