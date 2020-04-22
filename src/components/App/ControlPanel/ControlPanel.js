import React from "react";
import PropTypes from "prop-types";
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
  orientation,
  view,
  updatePlanePosition,
  updateOrientation,
  updateView,
}) => {
  return (
    <Container>
      <PlanePosition
        planePosition={planePosition}
        handleUpdate={updatePlanePosition}
        orientation={orientation}
      />
      <Orientation
        selectedOrientation={orientation}
        handleUpdate={updateOrientation}
      />
      <View selectedView={view} handleUpdate={updateView} />
    </Container>
  );
};

ControlPanel.propTypes = {
  planePosition: PropTypes.object.isRequired,
  orientation: PropTypes.number.isRequired,
  view: PropTypes.number.isRequired,
  updatePlanePosition: PropTypes.func.isRequired,
  updateOrientation: PropTypes.func.isRequired,
  updateView: PropTypes.func.isRequired,
};

export default ControlPanel;
