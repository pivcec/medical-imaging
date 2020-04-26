import React from "react";
import PropTypes from "prop-types";
import { Stage, Layer } from "react-konva";
import styled from "styled-components";
import Handle from "../Slider/Handle/Handle";
import { sliderWidth } from "../../../../constants/";

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

const Slider = ({
  title,
  setHandlePosition,
  maxHandlePosition,
  handlePosition,
  handleClick,
}) => {
  return (
    <Container>
      <TogglerTitle>{title}</TogglerTitle>
      <StageAndButtonContainer>
        <Button onClick={() => handleClick("minus")}>-</Button>
        <StageContainer>
          <Stage width={sliderWidth} height={50}>
            <Layer>
              <Handle
                setHandlePosition={setHandlePosition}
                maxHandlePosition={maxHandlePosition}
                handlePosition={handlePosition}
              />
            </Layer>
          </Stage>
        </StageContainer>
        <Button onClick={() => handleClick("plus")}>+</Button>
      </StageAndButtonContainer>
    </Container>
  );
};

Slider.propTypes = {
  title: PropTypes.string.isRequired,
  setHandlePosition: PropTypes.func.isRequired,
  maxHandlePosition: PropTypes.number,
  handlePosition: PropTypes.number.isRequired,
  handleClick: PropTypes.func.isRequired,
};

export default Slider;
