import React from "react";
import { Stage, Layer } from "react-konva";
import styled from "styled-components";
import Handle from "./Handle/Handle";
import { sliderWidth } from "../../../constants";

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

type SliderProps = {
  title: string;
  setHandlePosition: (newVal: number) => void;
  maxHandlePosition: number;
  handlePosition: number;
  handleClick: (plusOrMinus: string) => void;
};

const Slider = ({
  title,
  setHandlePosition,
  maxHandlePosition,
  handlePosition,
  handleClick,
}: SliderProps) => {
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

export default Slider;
