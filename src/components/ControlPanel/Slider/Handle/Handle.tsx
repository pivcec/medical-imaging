import React, { useEffect, useState, useCallback, useRef } from "react";
import debounce from "lodash.debounce";
import { Rect } from "react-konva";
import { sliderWidth, handleWidth } from "../../../../constants";

type HandleProps = {
  setHandlePosition: (newValue: number) => void;
  maxHandlePosition: number;
  handlePosition: number;
};

type DragBoundPosition = {
  x: number;
  y: number;
};

type NodeRef = {
  to: Function;
};

const Handle = ({
  setHandlePosition,
  maxHandlePosition,
  handlePosition,
}: HandleProps) => {
  const [pixelsFromLeft, setPixelsFromLeft] = useState(0);

  const nodeRef = useRef<NodeRef | null>(null);

  const debouncedSetHandlePosition = useCallback(
    debounce(setHandlePosition, 500),
    []
  );

  const getNewHandlePosition = (newPositionX: number) => {
    const percentageOfSlider =
      (newPositionX / (sliderWidth - handleWidth)) * 100;
    return Math.round((percentageOfSlider / 100) * maxHandlePosition);
  };

  const getNewPixelsFromLeft = (position: number) => {
    const limit = sliderWidth - handleWidth;

    if (position <= 0) {
      return 0;
    }

    if (position >= limit) {
      return limit;
    }

    return position;
  };

  const dragBoundFunc = (position: DragBoundPosition) => {
    const newPixelsFromLeft = getNewPixelsFromLeft(position.x);

    if (maxHandlePosition) {
      const newHandlePosition = getNewHandlePosition(newPixelsFromLeft);
      debouncedSetHandlePosition(newHandlePosition);
    }

    return {
      x: newPixelsFromLeft,
      y: 0,
    };
  };

  useEffect(() => {
    if (!maxHandlePosition) return;

    const percentageOfMax = (handlePosition / maxHandlePosition) * 100;
    const pixelsFromLeft =
      (percentageOfMax / 100) * (sliderWidth - handleWidth);

    setPixelsFromLeft(pixelsFromLeft);
  }, [handlePosition, maxHandlePosition]);

  useEffect(() => {
    animatePosition();
  }, [pixelsFromLeft]);

  const animatePosition = () => {
    if (!nodeRef.current) throw new Error("expected to have a ref");

    nodeRef.current.to({
      x: pixelsFromLeft,
      duration: 0.2,
    });
  };

  return (
    <Rect
      ref={(node) => {
        nodeRef.current = node;
      }}
      x={0}
      y={0}
      draggable={true}
      width={handleWidth}
      height={50}
      dragBoundFunc={dragBoundFunc}
      strokeWidth={1}
      fill={"grey"}
    />
  );
};

export default Handle;
