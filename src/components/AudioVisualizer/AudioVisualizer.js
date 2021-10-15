import react, { useRef, useState, useEffect } from 'react';
import AudioCanvas from '../AudioCanvas';

const defaultOptions = {
  canvasColor: 'transparent',
  lineColor: '#000000',
  lineAmount: 1,
  strokeWidth: 2,
  strokeTightness: 1,
  mirrored: false,
};

const AudioVisualizer = (props) => {
  const {
    audioCtx,
    source,
    onRec,
    drawOptions = { defaultOptions },
    width,
    height,
  } = props;
  const [canvasContext, setCanvasContext] = useState();
  const [audioSource, setAudioSource] = useState();
  const [audioBuffer, setAudioBuffer] = useState();
  const [mergedOptions, setMergedOptions] = useState(defaultOptions);
  const fftSize = 1024;
  const dataArray = useRef();
  const audioAnalyser = useRef();
  const canvasRef = useRef();

  const powerOfTwo = (value) => {
    return (Math.log(parseInt(value)) / Math.log(2)) % 1 === 0;
  };

  useEffect(() => {
    setMergedOptions(Object.assign(mergedOptions, drawOptions));
  }, [drawOptions]);

  useEffect(() => {
    if (canvasRef.current) {
      setCanvasContext(canvasRef.current.getContext('2d'));
    }
  }, [canvasRef.current]);

  useEffect(() => {
    if (audioCtx && powerOfTwo(fftSize)) {
      audioAnalyser.current = audioCtx.createAnalyser();
      audioAnalyser.current.fftSize = fftSize;
      audioAnalyser.current.smoothingTimeConstant = 0.5;

      dataArray.current = new Uint8Array(
        audioAnalyser.current.frequencyBinCount,
      );
    }
  }, [audioCtx]);

  useEffect(() => {
    if (source) {
      source.connect(audioAnalyser.current);

      source.buffer = audioBuffer;
      source.connect(audioAnalyser.current);

      drawAudioData();
    }
  }, [source]);

  function drawAudioData() {
    requestAnimationFrame(drawAudioData);
    audioAnalyser.current.getByteFrequencyData(dataArray.current);

    if (canvasRef.current && canvasContext) {
      // remove any 0ed out data nodes
      // let filteredData = dataArray.current.filter((x) => x > 0);
      canvasContext.clearRect(
        0,
        0,
        canvasRef.current.width,
        canvasRef.current.height,
      );

      canvasContext.lineWidth = mergedOptions.strokeWidth;
      canvasContext.strokeStyle = mergedOptions.lineColor;
      canvasContext.beginPath();
      canvasContext.moveTo(0, canvasRef.current.height / 2);

      // number of bar
      const barCount = 16;
      const barWidth = (canvasRef.current.width * 1.0) / barCount;
      let x = 0;

      const drawWholeFrequency = (i) => {
        const y =
          (dataArray.current[i] / 255.0) * (canvasRef.current.height * 0.8);
        // canvasContext.lineTo(x, y);
        canvasContext.fillStyle = '#ffffff';
        canvasContext.fillRect(
          x,
          canvasRef.current.height / 2 - y,
          barWidth / 1.2,
          y * 2,
        );
        x += barWidth;
      };

      for (
        let i = 0;
        i < dataArray.current.length;
        i += parseInt(dataArray.current.length / barCount)
      ) {
        drawWholeFrequency(i);
      }

      canvasContext.stroke();
    }
  }

  return (
    <AudioCanvas
      height={height}
      maxWidth={width}
      ref={canvasRef}
      style={{ zIndex: 1 }}
    />
  );
};

export default AudioVisualizer;
