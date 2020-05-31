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

type OrientationProps = {
  setSelectedOrientation: (newVal: DimensionLabels) => void;
  selectedOrientation: string;
};

const Orientation = ({
  setSelectedOrientation,
  selectedOrientation,
}: OrientationProps) => {
  const getIsSelected = (orientation: DimensionLabels) =>
    selectedOrientation === orientation;

  return (
    <Container>
      <Title>Slice Axis</Title>
      <Toggler>
        <Button
          isSelected={getIsSelected("x")}
          onClick={() => setSelectedOrientation("x")}
        >
          X
        </Button>
        <Button
          isSelected={getIsSelected("y")}
          onClick={() => setSelectedOrientation("y")}
        >
          Y
        </Button>
        <Button
          isSelected={getIsSelected("z")}
          onClick={() => setSelectedOrientation("z")}
        >
          Z
        </Button>
      </Toggler>
    </Container>
  );
};

Orientation.propTypes = {
  setSelectedOrientation: PropTypes.func.isRequired,
  selectedOrientation: PropTypes.string.isRequired,
};

export default Orientation;
