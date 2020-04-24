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
  planePositions,
  orientation,
  orientationMaxIndex,
  selectedView,
  zoomLevels,
  setPlanePositions,
  setOrientation,
  setView,
  setZoomLevels,
  setCameraPosition,
}) => {
  return (
    <Container>
      <PlanePosition
        planePositions={planePositions}
        setPlanePositions={setPlanePositions}
        orientation={orientation}
        orientationMaxIndex={orientationMaxIndex}
      />
      <Orientation
        selectedOrientation={orientation}
        setOrientation={setOrientation}
      />
      <Zoom
        selectedView={selectedView}
        zoomLevels={zoomLevels}
        setZoomLevels={setZoomLevels}
        setCameraPosition={setCameraPosition}
      />
      <View selectedView={selectedView} setView={setView} />
    </Container>
  );
};

ControlPanel.propTypes = {
  planePositions: PropTypes.object.isRequired,
  orientation: PropTypes.number.isRequired,
  orientationMaxIndex: PropTypes.number,
  selectedView: PropTypes.number.isRequired,
  zoomLevels: PropTypes.object.isRequired,
  setPlanePositions: PropTypes.func.isRequired,
  setOrientation: PropTypes.func.isRequired,
  setView: PropTypes.func.isRequired,
  setZoomLevels: PropTypes.func.isRequired,
  setCameraPosition: PropTypes.func.isRequired,
};

export default ControlPanel;
