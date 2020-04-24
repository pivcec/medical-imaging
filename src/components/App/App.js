import React, { useState } from "react";
import Animation from "./Animation/Animation";
import ControlPanel from "./ControlPanel/ControlPanel";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: row;
`;

const App = () => {
  const [cameraPosition, setCameraPosition] = useState({});
  const [view, setView] = useState(0);
  const [planePositions, setPlanePositions] = useState({
    x: 0,
    y: 0,
    z: 0,
  });
  const [zoomLevels, setZoomLevels] = useState({
    x: 0,
    y: 0,
    z: 0,
  });
  const [orientation, setOrientation] = useState(0);
  const [orientationMaxIndex, setOrientationMaxIndex] = useState(null);

  return (
    <Container>
      <Animation
        cameraPosition={cameraPosition}
        planePositions={planePositions}
        orientation={orientation}
        view={view}
        setCameraPosition={setCameraPosition}
        setOrientationMaxIndex={setOrientationMaxIndex}
      />
      <ControlPanel
        planePositions={planePositions}
        zoomLevels={zoomLevels}
        orientation={orientation}
        orientationMaxIndex={orientationMaxIndex}
        view={view}
        setPlanePositions={setPlanePositions}
        setOrientation={setOrientation}
        setView={setView}
        setZoomLevels={setZoomLevels}
        setCameraPosition={setCameraPosition}
      />
    </Container>
  );
};

export default App;
