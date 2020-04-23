import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Stage, Layer } from "react-konva";
import Handle from "./Handle/Handle";
import styled from "styled-components";
import { orientationKeys, sliderWidth } from "../../../../constants/";

const Container = styled.div`
  padding: 1em;
`;

const TogglerTitle = styled.div`
  margin-bottom: 1em;
`;

const StageAndButtonContainer = styled.div`
  display: flex;
  height: 50px;
  top: 0;
`;

const Button = styled.button`
  width: 50px;
  padding: 1em;
`;

const StageContainer = styled.div`
  width: 200px;
  border-top: 1px solid grey;
  border-bottom: 1px solid grey;
`;

const PlanePosition = ({
  updatePlanePosition,
  orientation,
  orientationMaxIndex,
  planePositions,
}) => {
  const [handlePosition, setHandlePosition] = useState(0);
  const orientationKey = orientationKeys[orientation];
  const planePosition = planePositions[orientationKey];

  const handleClick = (plusOrMinus) => {
    const newValue =
      plusOrMinus === "plus"
        ? planePositions[orientationKey] + 1
        : planePositions[orientationKey] - 1;

    if (newValue >= 0 && newValue <= orientationMaxIndex) {
      updatePlanePosition({
        ...planePositions,
        [orientationKey]: newValue,
      });
    }
  };

  useEffect(() => {
    updatePlanePosition({
      ...planePositions,
      [orientationKey]: handlePosition,
    });
  }, [handlePosition]);

  return (
    <Container>
      <TogglerTitle>Slice</TogglerTitle>
      {orientationMaxIndex && `${planePosition} / ${orientationMaxIndex}`}
      <StageAndButtonContainer>
        <Button onClick={() => handleClick("minus")}>-</Button>
        <StageContainer>
          <Stage width={sliderWidth} height={50}>
            <Layer>
              <Handle
                handlePosition={handlePosition}
                setHandlePosition={setHandlePosition}
                orientation={orientation}
                orientationMaxIndex={orientationMaxIndex}
                planePositions={planePositions}
                updatePlanePosition={updatePlanePosition}
              />
            </Layer>
          </Stage>
        </StageContainer>
        <Button onClick={() => handleClick("plus")}>+</Button>
      </StageAndButtonContainer>
    </Container>
  );
};

PlanePosition.propTypes = {
  updatePlanePosition: PropTypes.func.isRequired,
  planePositions: PropTypes.object.isRequired,
  orientation: PropTypes.number.isRequired,
  orientationMaxIndex: PropTypes.number,
};

export default PlanePosition;
