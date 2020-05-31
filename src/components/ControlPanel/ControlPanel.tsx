import React from "react";
import Zoom from "./Zoom/Zoom";
import PlanePosition from "./PlanePosition/PlanePosition";
import Orientation from "./Orientation/Orientation";
import View from "./View/View";
import styled from "styled-components";
import { Dimensions, DimensionLabels } from "../../@types/types";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1em;
  flex: 1;
`;

type ControlPanelProps = {
  planePosition: number;
  selectedOrientation: string;
  orientationMaxIndex: number;
  selectedView: DimensionLabels;
  zoomLevel: number;
  setPlanePositions: (
    newVal: Dimensions | ((oldVal: Dimensions) => Dimensions)
  ) => void;
  setSelectedOrientation: (newVal: DimensionLabels) => void;
  setSelectedView: (newVal: DimensionLabels) => void;
  setZoomLevels: (
    newVal: Dimensions | ((oldVal: Dimensions) => Dimensions)
  ) => void;
};

const ControlPanel = ({
  planePosition,
  selectedOrientation,
  orientationMaxIndex,
  selectedView,
  zoomLevel,
  setPlanePositions,
  setSelectedOrientation,
  setSelectedView,
  setZoomLevels,
}: // setCameraPosition,
ControlPanelProps) => {
  return (
    <Container>
      <PlanePosition
        planePosition={planePosition}
        setPlanePositions={setPlanePositions}
        orientationMaxIndex={orientationMaxIndex}
        selectedOrientation={selectedOrientation}
      />
      <Zoom
        selectedView={selectedView}
        zoomLevel={zoomLevel}
        setZoomLevels={setZoomLevels}
        // setCameraPosition={setCameraPosition}
      />
      <Orientation
        selectedOrientation={selectedOrientation}
        setSelectedOrientation={setSelectedOrientation}
      />
      <View selectedView={selectedView} setSelectedView={setSelectedView} />
    </Container>
  );
};

export default ControlPanel;
