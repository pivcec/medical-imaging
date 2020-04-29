import React from "react";
import PropTypes from "prop-types";
import Zoom from "./Zoom/Zoom";
import PlanePosition from "./PlanePosition/PlanePosition";
import Orientation from "./Orientation/Orientation";
import View from "./View/View";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1em;
  flex: 1;
`;

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
  // setCameraPosition,
}) => {
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

ControlPanel.propTypes = {
  planePosition: PropTypes.number.isRequired,
  selectedOrientation: PropTypes.string.isRequired,
  orientationMaxIndex: PropTypes.number,
  selectedView: PropTypes.string.isRequired,
  zoomLevel: PropTypes.number.isRequired,
  setPlanePositions: PropTypes.func.isRequired,
  setSelectedOrientation: PropTypes.func.isRequired,
  setSelectedView: PropTypes.func.isRequired,
  setZoomLevels: PropTypes.func.isRequired,
  // setCameraPosition: PropTypes.func.isRequired,
};

export default ControlPanel;
