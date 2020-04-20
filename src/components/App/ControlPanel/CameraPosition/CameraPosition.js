import React from "react";
import PropTypes from "prop-types";
import Toggler from "../Toggler/Toggler";
import styled from "styled-components";

const Container = styled.div`
  padding: 1em;
`;

const Title = styled.div`
  margin-bottom: 1em;
`;

const CameraPosition = ({ handleUpdate, cameraPosition: { x, y, z } }) => {
  return (
    <Container>
      <Title>Camera Position</Title>
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

CameraPosition.propTypes = {
  handleUpdate: PropTypes.func.isRequired,
  cameraPosition: PropTypes.object.isRequired,
};

export default CameraPosition;
