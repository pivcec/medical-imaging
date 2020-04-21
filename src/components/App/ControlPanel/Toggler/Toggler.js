import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
`;

const Label = styled.div`
  margin-right: 1em;
`;

const Value = styled.div`
  margin-left: 1em;
`;

const Toggler = ({ handleUpdate, propertyToUpdate, label, value }) => {
  const handleClick = (plusOrMinus) => {
    handleUpdate(propertyToUpdate, plusOrMinus);
  };

  return (
    <Container>
      <Label>{label}</Label>
      <button onClick={() => handleClick("plus")}>+</button>
      <button onClick={() => handleClick("minus")}>-</button>
      <Value>{Math.round(value)}</Value>
    </Container>
  );
};

Toggler.propTypes = {
  handleUpdate: PropTypes.func.isRequired,
  propertyToUpdate: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
};

export default Toggler;
