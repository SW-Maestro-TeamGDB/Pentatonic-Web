import react, { useRef, useState, useEffect } from 'react';
import AudioCanvas from '../AudioCanvas';

// class AudioVisualizer {
//   constructor(audioContext, processFrame, processError) {
//     this.audioContext = audioContext;
//     this.processFrame = processFrame;
//     this.connectStream = this.connectStream.bind(this);
//     navigator.mediaDevices
//       .getUserMedia({ audio: true, video: false })
//       .then(this.connectStream)
//       .catch((error) => {
//         if (processError) {
//           processError(error);
//         }
//       });
//   }

//   connectStream(stream) {
//     this.analyser = this.audioContext.createAnalyser();
//     const source = this.audioContext.createMediaStreamSource(stream);
//     source.connect(this.analyser);
//     this.analyser.smoothingTimeConstant = 0.5;
//     this.analyser.fftSize = 32;

//     this.initRenderLoop(this.analyser);
//   }

//   initRenderLoop() {
//     const frequencyData = new Uint8Array(this.analyser.frequencyBinCount);
//     const processFrame = this.processFrame || (() => {});

//     const renderFrame = () => {
//       this.analyser.getByteFrequencyData(frequencyData);
//       processFrame(frequencyData);

//       requestAnimationFrame(renderFrame);
//     };
//     requestAnimationFrame(renderFrame);
//   }
// }

// const visualMainElement = document.querySelector('main');
// const visualValueCount = 16;
// let visualElements;
// const createDOMElements = () => {
//   let i;
//   for (i = 0; i < visualValueCount; ++i) {
//     const elm = document.createElement('div');
//     visualMainElement.appendChild(elm);
//   }

//   visualElements = document.querySelectorAll('main div');
// };
// createDOMElements();

// const init = () => {
//   // Creating initial DOM elements
//   const audioContext = new AudioContext();
//   const initDOM = () => {
//     visualMainElement.innerHTML = '';
//     createDOMElements();
//   };
//   initDOM();

//   // Swapping values around for a better visual effect
//   const dataMap = {
//     0: 15,
//     1: 10,
//     2: 8,
//     3: 9,
//     4: 6,
//     5: 5,
//     6: 2,
//     7: 1,
//     8: 0,
//     9: 4,
//     10: 3,
//     11: 7,
//     12: 11,
//     13: 12,
//     14: 13,
//     15: 14,
//   };
//   const processFrame = (data) => {
//     const values = Object.values(data);
//     let i;
//     for (i = 0; i < visualValueCount; ++i) {
//       const value = values[dataMap[i]] / 255;
//       const elmStyles = visualElements[i].style;
//       elmStyles.transform = `scaleY( ${value} )`;
//       elmStyles.opacity = Math.max(0.25, value);
//     }
//   };

//   const processError = () => {
//     visualMainElement.classList.add('error');
//     visualMainElement.innerText =
//       'Please allow access to your microphone in order to see this demo.\nNothing bad is going to happen... hopefully :P';
//   };

//   const a = new AudioVisualizer(audioContext, processFrame, processError);
// };

const defaultOptions = {
  canvasColor: '#ffffff',
  lineColor: '#000000',
  lineAmount: 1,
  strokeWidth: 2,
  strokeTightness: 10,
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

  // useEffect(() => {
  //   if (audioCtx) {
  //     setAudioSource(audioCtx.createBufferSource());
  //   }
  // }, [audioCtx]);

  // useEffect(() => {
  //   if (audioSource) {
  //     let gainNode = audioCtx.createGain();

  //     gainNode.gain.value = 0;

  //     audioSource.connect(gainNode);
  //     gainNode.connect(audioCtx.destination);

  //     source.connect(audioAnalyser.current);

  //     audioSource.buffer = audioBuffer;
  //     audioSource.connect(audioAnalyser.current);
  //     audioSource.loop = true;
  //     audioSource.start(0);
  //     audioCtx.resume();

  //     drawAudioData();
  //   }
  // }, [audioSource]);

  useEffect(() => {
    if (source) {
      // let gainNode = audioCtx.createGain();

      // gainNode.gain.value = 1;

      // source.connect(gainNode);
      // gainNode.connect(audioCtx.destination);

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
      let filteredData = dataArray.current.filter((x) => x > 0);

      canvasContext.fillStyle = mergedOptions.canvasColor;
      canvasContext.fillRect(
        0,
        0,
        canvasRef.current.width,
        canvasRef.current.height,
      );
      canvasContext.lineWidth = mergedOptions.strokeWidth;
      canvasContext.strokeStyle = mergedOptions.lineColor;
      canvasContext.beginPath();

      let sliceWidth =
        canvasRef.current.width /
        filteredData.length /
        (mergedOptions.mirrored ? 2 : 1);
      let x = 0;

      const drawFrequency = (i, drawHeight, drawBottom) => {
        let frequencyPercent = filteredData[i] / 255;
        let y = frequencyPercent * drawHeight + drawBottom;

        i === 0 ? canvasContext.moveTo(x, y) : canvasContext.lineTo(x, y);

        x += sliceWidth;
      };

      const drawWholeFrequency = (heightMultiplier) => {
        let drawHeight = canvasRef.current.height; //* heightMultiplier;
        let drawBottom =
          (canvasRef.current.height * (1 - heightMultiplier)) /
          mergedOptions.strokeTightness;

        for (let i = 0; i < filteredData.length; i++) {
          drawFrequency(i, drawHeight, drawBottom);
        }

        if (mergedOptions.mirrored) {
          for (let i = filteredData.length; i > 0; i--) {
            drawFrequency(i, drawHeight, drawBottom);
          }
        }

        x += sliceWidth;
        canvasContext.lineTo(x, drawHeight + drawBottom);
        x = 0;
      };

      const interval = (1.05 - 0.25) / mergedOptions.lineAmount;

      for (let i = 1.05; i > 0.25; i -= interval) {
        drawWholeFrequency(i);
      }

      canvasContext.stroke();
    }
  }

  return <AudioCanvas height={height} maxWidth={width} ref={canvasRef} />;
};

export default AudioVisualizer;
