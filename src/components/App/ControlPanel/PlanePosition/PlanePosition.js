import React from "react";
import PropTypes from "prop-types";
import Toggler from "../Toggler/Toggler";
import styled from "styled-components";

const Container = styled.div`
  padding: 1em;
`;

const TogglerTitle = styled.div`
  margin-bottom: 1em;
`;

const PlanePosition = ({
  handleUpdate,
  orientation,
  planePosition: { x, y, z },
}) => {
  return (
    <Container>
      <TogglerTitle>Plane Position</TogglerTitle>
      {orientation === 0 && (
        <Toggler
          label={"Z"}
          propertyToUpdate={"z"}
          handleUpdate={handleUpdate}
          value={z}
        />
      )}
      {orientation === 1 && (
        <Toggler
          label={"X"}
          propertyToUpdate={"x"}
          handleUpdate={handleUpdate}
          value={x}
        />
      )}
      {orientation === 2 && (
        <Toggler
          label={"Y"}
          propertyToUpdate={"y"}
          handleUpdate={handleUpdate}
          value={y}
        />
      )}
    </Container>
  );
};

PlanePosition.propTypes = {
  handleUpdate: PropTypes.func.isRequired,
  planePosition: PropTypes.object.isRequired,
  orientation: PropTypes.number.isRequired,
};

export default PlanePosition;
