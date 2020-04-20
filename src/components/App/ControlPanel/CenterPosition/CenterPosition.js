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

const CenterPosition = ({ handleUpdate, centerPosition: { x, y, z } }) => {
  return (
    <Container>
      <TogglerTitle>Center Position</TogglerTitle>
      <Toggler
        label={"X"}
        handleUpdate={handleUpdate}
        propertyToUpdate={"x"}
        value={x}
      />
      <Toggler
        label={"Y"}
        handleUpdate={handleUpdate}
        propertyToUpdate={"y"}
        value={y}
      />
      <Toggler
        label={"Z"}
        handleUpdate={handleUpdate}
        propertyToUpdate={"z"}
        value={z}
      />
    </Container>
  );
};

CenterPosition.propTypes = {
  handleUpdate: PropTypes.func.isRequired,
  centerPosition: PropTypes.object.isRequired,
};

export default CenterPosition;
