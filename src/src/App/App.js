import React, { useState, useRef } from "react";
import Animation from "./Animation/Animation";
import ControlPanel from "./ControlPanel/ControlPanel";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: row;
`;

const App = () => {
  const [cameraPosition, setCameraPosition] = useState({
    x: -30,
    y: 10,
    z: 310,
  });
  const [centerPosition, setCenterPosition] = useState({
    x: 0,
    y: 0,
    z: 0,
  });
  const [planePosition, setPlanePosition] = useState({
    x: 0,
    y: 0,
    z: 0,
  });
  const [orientation, setOrientation] = useState(0);

  const cameraPositionRef = useRef();
  const centerPositionRef = useRef();

  const updateCameraPosition = (propertyToUpdate, plusOrMinus) => {
    cameraPositionRef.current = cameraPosition;

    const newValue =
      plusOrMinus === "plus"
        ? cameraPositionRef.current[propertyToUpdate] + 1
        : cameraPositionRef.current[propertyToUpdate] - 1;

    setCameraPosition({
      ...cameraPosition,
      [propertyToUpdate]: newValue,
    });
  };

  const updateCenterPosition = (propertyToUpdate, plusOrMinus) => {
    centerPositionRef.current = centerPosition;

    const newValue =
      plusOrMinus === "plus"
        ? centerPositionRef.current[propertyToUpdate] + 1
        : centerPositionRef.current[propertyToUpdate] - 1;

    setCenterPosition({
      ...centerPosition,
      [propertyToUpdate]: newValue,
    });
  };

  const updatePlanePosition = (propertyToUpdate, plusOrMinus) => {
    const newValue =
      plusOrMinus === "plus"
        ? planePosition[propertyToUpdate] + 1
        : planePosition[propertyToUpdate] - 1;

    if (newValue >= 0) {
      setPlanePosition({
        ...planePosition,
        [propertyToUpdate]: newValue,
      });
    }
  };

  const updateOrientation = (plusOrMinus) => {
    const newValue = plusOrMinus === "plus" ? orientation + 1 : orientation - 1;

    if (newValue >= 0 && newValue <= 2) {
      setOrientation(newValue);
    }
  };

  const handleCentering = (centered) => {
    setCenterPosition(centered);
  };

  return (
    <Container>
      <Animation
        planePosition={planePosition}
        cameraPosition={cameraPosition}
        centerPosition={centerPosition}
        orientation={orientation}
        handleCentering={handleCentering}
      />
      <ControlPanel
        planePosition={planePosition}
        cameraPosition={cameraPosition}
        centerPosition={centerPosition}
        orientation={orientation}
        updateCameraPosition={updateCameraPosition}
        updateCenterPosition={updateCenterPosition}
        updatePlanePosition={updatePlanePosition}
        updateOrientation={updateOrientation}
      />
    </Container>
  );
};

export default App;
