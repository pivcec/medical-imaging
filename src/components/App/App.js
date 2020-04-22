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
  const [planePosition, setPlanePosition] = useState({
    x: 0,
    y: 0,
    z: 0,
  });
  const [orientation, setOrientation] = useState(0);
  const [orientationMaxIndex, setOrientationMaxIndex] = useState(null);

  const updatePlanePosition = (propertyToUpdate, plusOrMinus) => {
    const newValue =
      plusOrMinus === "plus"
        ? planePosition[propertyToUpdate] + 1
        : planePosition[propertyToUpdate] - 1;

    if (newValue >= 0 && newValue <= orientationMaxIndex) {
      setPlanePosition({
        ...planePosition,
        [propertyToUpdate]: newValue,
      });
    }
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
        planePosition={planePosition}
        orientation={orientation}
        view={view}
        setOrientationMaxIndex={setOrientationMaxIndex}
      />
      <ControlPanel
        planePosition={planePosition}
        orientation={orientation}
        view={view}
        updatePlanePosition={updatePlanePosition}
        updateOrientation={updateOrientation}
        updateView={updateView}
      />
    </Container>
  );
};

export default App;
