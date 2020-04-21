import React from "react";
import PropTypes from "prop-types";
import CameraPosition from "./CameraPosition/CameraPosition";
import CenterPosition from "./CenterPosition/CenterPosition";
import PlanePosition from "./PlanePosition/PlanePosition";
import Orientation from "./Orientation/Orientation";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1em;
  flex: 1;
`;

const ControlPanel = ({
  planePosition,
  cameraPosition,
  centerPosition,
  orientation,
  updateCameraPosition,
  updateCenterPosition,
  updatePlanePosition,
  updateOrientation,
}) => {
  return (
    <Container>
      <CameraPosition
        cameraPosition={cameraPosition}
        handleUpdate={updateCameraPosition}
      />
      <CenterPosition
        centerPosition={centerPosition}
        handleUpdate={updateCenterPosition}
      />
      <PlanePosition
        planePosition={planePosition}
        handleUpdate={updatePlanePosition}
        orientation={orientation}
      />
      <Orientation
        orientation={orientation}
        planePosition={planePosition}
        handleUpdate={updateOrientation}
      />
    </Container>
  );
};

ControlPanel.propTypes = {
  planePosition: PropTypes.object.isRequired,
  cameraPosition: PropTypes.object.isRequired,
  centerPosition: PropTypes.object.isRequired,
  orientation: PropTypes.number.isRequired,
  updateCameraPosition: PropTypes.func.isRequired,
  updateCenterPosition: PropTypes.func.isRequired,
  updatePlanePosition: PropTypes.func.isRequired,
  updateOrientation: PropTypes.func.isRequired,
};

export default ControlPanel;
