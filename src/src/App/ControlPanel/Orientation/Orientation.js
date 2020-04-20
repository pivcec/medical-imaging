import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Title = styled.div`
  margin-bottom: 1em;
`;

const Container = styled.div`
  display: flex;
`;

const Orientation = ({ handleUpdate, orientation }) => {
  const handleClick = (plusOrMinus) => {
    handleUpdate(plusOrMinus);
  };

  return (
    <>
      <Title>Orientation</Title>
      <Container>
        <button onClick={() => handleClick("plus")}>+</button>
        <button onClick={() => handleClick("minus")}>-</button>
        {orientation}
      </Container>
    </>
  );
};

Orientation.propTypes = {
  handleUpdate: PropTypes.func.isRequired,
  orientation: PropTypes.number.isRequired,
};

export default Orientation;
