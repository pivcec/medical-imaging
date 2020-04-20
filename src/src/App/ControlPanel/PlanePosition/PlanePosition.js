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

const PlanePosition = ({ handleUpdate, planePosition: { x, y, z } }) => {
  return (
    <Container>
      <TogglerTitle>Plane Position</TogglerTitle>
      <Toggler
        label={"X"}
        propertyToUpdate={"x"}
        handleUpdate={handleUpdate}
        value={x}
      />
      <Toggler
        label={"Y"}
        propertyToUpdate={"y"}
        handleUpdate={handleUpdate}
        value={y}
      />
      <Toggler
        label={"Z"}
        propertyToUpdate={"z"}
        handleUpdate={handleUpdate}
        value={z}
      />
    </Container>
  );
};

PlanePosition.propTypes = {
  handleUpdate: PropTypes.func.isRequired,
  planePosition: PropTypes.object.isRequired,
};

export default PlanePosition;
