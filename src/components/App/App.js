import React, { useState, useRef } from "react";
import Animation from "./Animation/Animation";
import ControlPanel from "./ControlPanel/ControlPanel";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: row;
`;

const App = () => {
  const [view, setView] = useState(0);
  const [planePositions, setPlanePositions] = useState({
    x: 0,
    y: 0,
    z: 0,
  });
  const [orientation, setOrientation] = useState(0);
  const [orientationMaxIndex, setOrientationMaxIndex] = useState(null);

  const updatePlanePositions = (newPlanePositions) => {
    setPlanePositions(newPlanePositions);
  };

  const updateOrientation = (newValue) => {
    setOrientation(newValue);
  };

  const updateView = (newView) => {
    setView(newView);
  };

  return (
    <Container>
      <Animation
        planePositions={planePositions}
        orientation={orientation}
        view={view}
        setOrientationMaxIndex={setOrientationMaxIndex}
      />
      <ControlPanel
        planePositions={planePositions}
        orientation={orientation}
        orientationMaxIndex={orientationMaxIndex}
        view={view}
        updatePlanePositions={updatePlanePositions}
        updateOrientation={updateOrientation}
        updateView={updateView}
      />
    </Container>
  );
};

export default App;
