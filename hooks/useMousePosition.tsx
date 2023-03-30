import React from 'react';

interface UseMousePositionProps {
  includeTouch?: boolean;
}
const useMousePosition = ({ includeTouch = true }: UseMousePositionProps) => {
  const [
    mousePosition,
    setMousePosition
  ] = React.useState({ x: 0, y: 0 });
  React.useEffect(() => {
    const element = document.getElementById('element')!;
    const updateMousePosition = (ev: any) => {
      let x, y;
      let rect = element.getBoundingClientRect()
      if (ev.touches) {
        const touch = ev.touches[0];
        [x, y] = [touch.clientX - rect.left, touch.clientY - rect.top];
      } else {
        [x, y] = [ev.clientX, ev.clientY];
      }
      setMousePosition({ x, y });
    };
    element.addEventListener('mousemove', updateMousePosition);
    if (includeTouch) {
      element.addEventListener('touchmove', updateMousePosition);
    }
    return () => {
      element.removeEventListener('mousemove', updateMousePosition);
      if (includeTouch) {
        element.removeEventListener('touchmove', updateMousePosition);
      }
    };
  }, [includeTouch]);
  return mousePosition;
};
export default useMousePosition;