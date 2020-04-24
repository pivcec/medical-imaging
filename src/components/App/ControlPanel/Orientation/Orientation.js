import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Container = styled.div`
  padding: 1em;
`;

const Title = styled.div`
  margin-bottom: 1em;
`;

const Toggler = styled.div`
  display: flex;
`;

const Button = styled.button`
  background-color: ${(props) => (props.isSelected ? "yellow" : "white")};
  padding: 1em;
  margin: 0.5em;
  width: 50px;
  height: 50px;
`;

const Orientation = ({ setOrientation, selectedOrientation }) => {
  const getIsSelected = (orientation) => selectedOrientation === orientation;

  return (
    <Container>
      <Title>Slice Orientation</Title>
      <Toggler>
        <Button isSelected={getIsSelected(1)} onClick={() => setOrientation(1)}>
          X
        </Button>
        <Button isSelected={getIsSelected(2)} onClick={() => setOrientation(2)}>
          Y
        </Button>
        <Button isSelected={getIsSelected(0)} onClick={() => setOrientation(0)}>
          Z
        </Button>
      </Toggler>
    </Container>
  );
};

Orientation.propTypes = {
  setOrientation: PropTypes.func.isRequired,
  selectedOrientation: PropTypes.number.isRequired,
};

export default Orientation;
