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

const Cell = styled.div`
  background-color: ${(props) => (props.isSelected ? "yellow" : "white")};
  border: 1px solid black;
  padding: 1em;
  margin: 0.5em;
`;

const View = ({ handleUpdate, selectedView }) => {
  const getIsSelected = (view) => selectedView === view;

  return (
    <Container>
      <Title>View</Title>
      <Toggler>
        <Cell isSelected={getIsSelected(1)} onClick={() => handleUpdate(1)}>
          X
        </Cell>
        <Cell isSelected={getIsSelected(2)} onClick={() => handleUpdate(2)}>
          Y
        </Cell>
        <Cell isSelected={getIsSelected(0)} onClick={() => handleUpdate(0)}>
          Z
        </Cell>
      </Toggler>
    </Container>
  );
};

View.propTypes = {
  handleUpdate: PropTypes.func.isRequired,
  selectedView: PropTypes.number.isRequired,
};

export default View;
