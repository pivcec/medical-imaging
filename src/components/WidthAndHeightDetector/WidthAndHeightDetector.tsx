import React, { useRef, useState, useLayoutEffect } from "react";
import styled from "styled-components";
import Animation, { AnimationProps } from "./Animation/Animation";

const Container = styled.div`
  display: flex;
  flex-grow: 1;
  justify-content: center;
  align-items: center;
  background-color: black;
`;

const useResize = (ref: React.RefObject<HTMLDivElement>) => {
  const [animationWidth, setAnimationWidth] = useState(0);
  const [animationHeight, setAnimationHeight] = useState(0);

  useLayoutEffect(() => {
    const handleResize = () => {
      if (!ref.current) return;

      const rect = ref.current.getBoundingClientRect();
      const { width, height } = rect;
      setAnimationWidth(width);
      setAnimationHeight(height);
    };

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [ref]);

  return { animationWidth, animationHeight };
};

const WidthAndHeightDetector = (
  props: Omit<AnimationProps, "smallerAnimationDimension">
) => {
  const ref = useRef(null);
  const { animationWidth, animationHeight } = useResize(ref);

  return (
    <Container ref={ref}>
      {animationWidth && animationHeight && (
        <Animation
          {...props}
          smallerAnimationDimension={
            animationWidth > animationHeight ? animationHeight : animationWidth
          }
        />
      )}
    </Container>
  );
};

export default WidthAndHeightDetector;
