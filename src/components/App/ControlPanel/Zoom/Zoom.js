import React, { useEffect, useState, useCallback } from "react";
import PropTypes from "prop-types";
import { Stage, Layer } from "react-konva";
import styled from "styled-components";
import Handle from "../Handle/Handle";
import { orientationKeys, sliderWidth, views } from "../../../../constants/";

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

const Zoom = ({
  zoomLevels,
  selectedView,
  setZoomLevels,
  setCameraPosition,
}) => {
  const [handlePosition, setHandlePosition] = useState(0);
  const orientationKey = orientationKeys[selectedView];
  const zoom = zoomLevels[orientationKey];
  const originalDistance = views[selectedView][orientationKey];

  const handleClick = (plusOrMinus) => {
    const newValue =
      plusOrMinus === "plus"
        ? zoomLevels[orientationKey] + 1
        : zoomLevels[orientationKey] - 1;

    if (newValue >= 0 && newValue <= originalDistance) {
      setZoomLevels({
        ...zoomLevels,
        [orientationKey]: newValue,
      });
    }
  };

  const updateZoomLevels = useCallback(() => {
    setZoomLevels((prev) => ({
      ...prev,
      [orientationKey]: handlePosition,
    }));
  }, [handlePosition, orientationKey, setZoomLevels]);

  useEffect(() => {
    updateZoomLevels(handlePosition);
  }, [handlePosition, updateZoomLevels]);

  const updateCameraPosition = useCallback(() => {
    const newDistance = originalDistance - zoomLevels[orientationKey];
    setCameraPosition((prev) => ({
      ...prev,
      [orientationKey]: newDistance,
    }));
  }, [orientationKey, setCameraPosition, originalDistance, zoomLevels]);

  useEffect(() => {
    updateCameraPosition();
  }, [updateCameraPosition]);

  return (
    <Container>
      <TogglerTitle>Zoom</TogglerTitle>
      {`${zoom} / ${originalDistance}`}
      <StageAndButtonContainer>
        <Button onClick={() => handleClick("minus")}>-</Button>
        <StageContainer>
          <Stage width={sliderWidth} height={50}>
            <Layer>
              <Handle
                setHandlePosition={setHandlePosition}
                axisIndex={selectedView}
                maxHandlePosition={originalDistance}
                handlePositions={zoomLevels}
              />
            </Layer>
          </Stage>
        </StageContainer>
        <Button onClick={() => handleClick("plus")}>+</Button>
      </StageAndButtonContainer>
    </Container>
  );
};

Zoom.propTypes = {
  zoomLevels: PropTypes.object.isRequired,
  selectedView: PropTypes.number.isRequired,
  setZoomLevels: PropTypes.func.isRequired,
  setCameraPosition: PropTypes.func.isRequired,
};

export default Zoom;
