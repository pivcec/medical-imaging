import React, { useState } from "react";
import InfoLegend from "./InfoLegend/InfoLegend";
import WidthAndHeightDetector from "./WidthAndHeightDetector/WidthAndHeightDetector";
import ControlPanel from "./ControlPanel/ControlPanel";
import styled from "styled-components";
import { Dimensions, DimensionLabels } from "../types/index";
// import { defaultViews } from "../constants";

const Container = styled.div`
  display: flex;
  height: 100%;
  overflow: hidden;
`;

const AnimationContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  height: 100%;
`;

const ControlPanelContainer = styled.div`
  flex: 1;
`;

const App = () => {
  /*
  const [cameraPosition, setCameraPosition] = useState({
    ...defaultViews["z"],
  });
  */
  const [planePositions, setPlanePositions] = useState<Dimensions>({
    x: 0,
    y: 0,
    z: 0,
  });
  const [zoomLevels, setZoomLevels] = useState<Dimensions>({
    x: 0,
    y: 0,
    z: 0,
  });
  const [selectedOrientation, setSelectedOrientation] = useState<
    DimensionLabels
  >("z");
  const [selectedView, setSelectedView] = useState<DimensionLabels>("z");
  const [orientationMaxIndex, setOrientationMaxIndex] = useState<number | null>(
    null
  );

  const planePosition = planePositions[selectedOrientation];
  const zoomLevel = zoomLevels[selectedView];

  return (
    <Container>
      <AnimationContainer>
        <InfoLegend
          selectedOrientation={selectedOrientation}
          selectedView={selectedView}
          zoomLevel={zoomLevel}
          planePosition={planePosition}
          orientationMaxIndex={orientationMaxIndex}
        />
        <WidthAndHeightDetector
          // cameraPosition={cameraPosition}
          planePositions={planePositions}
          selectedOrientation={selectedOrientation}
          selectedView={selectedView}
          zoomLevel={zoomLevel}
          // setCameraPosition={setCameraPosition}
          setOrientationMaxIndex={setOrientationMaxIndex}
        />
      </AnimationContainer>
      <ControlPanelContainer>
        <ControlPanel
          planePosition={planePosition}
          zoomLevel={zoomLevel}
          selectedOrientation={selectedOrientation}
          orientationMaxIndex={orientationMaxIndex}
          selectedView={selectedView}
          setPlanePositions={setPlanePositions}
          setSelectedOrientation={setSelectedOrientation}
          setSelectedView={setSelectedView}
          setZoomLevels={setZoomLevels}
          // setCameraPosition={setCameraPosition}
        />
      </ControlPanelContainer>
    </Container>
  );
};

export default App;
