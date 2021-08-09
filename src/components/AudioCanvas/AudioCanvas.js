import react, { useRef, useState, useEffect, forwardRef } from 'react';

export const AudioCanvas = forwardRef(
  ({ height, maxWidth = 3840, className, ...props }, ref) => {
    const [canvasWidth, setCanvasWidth] = useState(maxWidth);

    return <canvas width={canvasWidth} height={height} ref={ref} {...props} />;
  },
);

export default AudioCanvas;
