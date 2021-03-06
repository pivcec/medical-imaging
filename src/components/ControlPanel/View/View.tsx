import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { DimensionLabels } from "../../../@types/types";

const Container = styled.div`
  padding: 1em;
`;

const Title = styled.div`
  margin-bottom: 1em;
`;

const Toggler = styled.div`
  display: flex;
`;

const Button = styled.button<{ isSelected: boolean }>`
  background-color: ${(props) => (props.isSelected ? "yellow" : "white")};
  padding: 1em;
  margin: 0.5em;
  width: 50px;
  height: 50px;
`;

type ViewProptypes = {
  setSelectedView: (newVal: DimensionLabels) => void;
  selectedView: DimensionLabels;
};

const View = ({ setSelectedView, selectedView }: ViewProptypes) => {
  const getIsSelected = (view: DimensionLabels) => selectedView === view;

  return (
    <Container>
      <Title>View Axis</Title>
      <Toggler>
        <Button
          isSelected={getIsSelected("x")}
          onClick={() => setSelectedView("x")}
        >
          X
        </Button>
        <Button
          isSelected={getIsSelected("y")}
          onClick={() => setSelectedView("y")}
        >
          Y
        </Button>
        <Button
          isSelected={getIsSelected("z")}
          onClick={() => setSelectedView("z")}
        >
          Z
        </Button>
      </Toggler>
    </Container>
  );
};

export default View;
