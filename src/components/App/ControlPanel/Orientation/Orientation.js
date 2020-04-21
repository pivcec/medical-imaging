import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { orientationKeys } from "../../../../constants/";

const Container = styled.div`
  padding: 1em;
`;

const Title = styled.div`
  margin-bottom: 1em;
`;

const Toggler = styled.div`
  display: flex;
`;

const Label = styled.div`
  margin-right: 1em;
`;

const Orientation = ({ handleUpdate, orientation }) => {
  const handleClick = (plusOrMinus) => {
    handleUpdate(plusOrMinus);
  };

  return (
    <Container>
      <Title>Orientation</Title>
      <Toggler>
        <Label>{orientationKeys[orientation].toUpperCase()}</Label>
        <button onClick={() => handleClick("plus")}>+</button>
        <button onClick={() => handleClick("minus")}>-</button>
        {orientation}
      </Toggler>
    </Container>
  );
};

Orientation.propTypes = {
  handleUpdate: PropTypes.func.isRequired,
  orientation: PropTypes.number.isRequired,
  planePosition: PropTypes.object.isRequired,
};

export default Orientation;
