import React, { useState } from "react";
import RacingBarChart from "./RacingBarChart";
import useKeyframes from "./useKeyframes";
import useWindowSize from "./useWindowSize";

const dataUrl = "/data/covid2.csv";
const numOfBars = 12;
const numOfSlice = 10;
const chartMargin = {
  top: 30,
  right: 10,
  bottom: 30,
  left: 10,
};

function App() {
  const { width: windowWidth } = useWindowSize();
  const chartWidth = windowWidth - 64;
  const chartHeight = 600;
  const keyframes = useKeyframes(dataUrl, numOfSlice);
  const chartRef = React.useRef();
  const handleReplay = () => {
    chartRef.current.replay();
  }
  const handleStart = () => {
    chartRef.current.start();
  }
  const handleStop = () => {
    chartRef.current.stop();
  }
  const playing = chartRef.current ? chartRef.current.playing : false;
  const [_, forceUpdate] = useState();
  return (
    <div style={{ margin: "0 2em" }}>
      <h1>Covid Global Cases by SGN</h1>
      <section>
        {/* <br/>
        It's inspired by <a target="_blank" rel="noopener noreferrer" href="https://observablehq.com/@d3/bar-chart-race">the work of Mike Bostock</a>, which is based on pure d3.
        I tried to make a similar one, but using React, <a target="_blank" rel="noopener noreferrer" href="https://www.react-spring.io/">react-spring</a> and <a href="https://vx-demo.now.sh/" rel="noopener noreferrer" target="_blank">vx</a>.
        <br/>
        source: <a rel="noopener noreferrer" href="https://github.com/chenesan/bar-chart-race" target="_blank">https://github.com/chenesan/bar-chart-race</a>
        <br/> */}
      </section>
      <div style={{ paddingTop: "1em"}}>
        <button onClick={handleReplay}>replay</button>
        <button onClick={playing ? handleStop : handleStart}>
          { playing ? 'stop' : 'start' }
        </button>
        {keyframes.length > 0 && (
          <RacingBarChart
            keyframes={keyframes}
            numOfBars={numOfBars}
            width={chartWidth}
            height={chartHeight}
            margin={chartMargin}
            onStart={() => forceUpdate(true)}
            onStop={() => forceUpdate(false)}
            ref={chartRef}
          />
        )}
      </div>
    </div>
  );
}

export default App;
