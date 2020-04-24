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

const View = ({ setView, selectedView }) => {
  const getIsSelected = (view) => selectedView === view;

  return (
    <Container>
      <Title>View Axis</Title>
      <Toggler>
        <Button isSelected={getIsSelected(1)} onClick={() => setView(1)}>
          X
        </Button>
        <Button isSelected={getIsSelected(2)} onClick={() => setView(2)}>
          Y
        </Button>
        <Button isSelected={getIsSelected(0)} onClick={() => setView(0)}>
          Z
        </Button>
      </Toggler>
    </Container>
  );
};

View.propTypes = {
  setView: PropTypes.func.isRequired,
  selectedView: PropTypes.number.isRequired,
};

export default View;
