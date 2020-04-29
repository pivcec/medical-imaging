import React, { useRef, useState, useLayoutEffect } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Animation from "./Animation/Animation";

const Container = styled.div`
  display: flex;
  flex-grow: 1;
  justify-content: center;
  align-items: center;
  background-color: black;
`;

const useResize = (ref) => {
  const [animationWidth, setAnimationWidth] = useState(0);
  const [animationHeight, setAnimationHeight] = useState(0);

  useLayoutEffect(() => {
    const handleResize = () => {
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

const WidthAndHeightDetector = (props) => {
  const ref = useRef();
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

WidthAndHeightDetector.propTypes = {
  planePositions: PropTypes.object.isRequired,
  selectedOrientation: PropTypes.string.isRequired,
  selectedView: PropTypes.string.isRequired,
  zoomLevel: PropTypes.number.isRequired,
  setOrientationMaxIndex: PropTypes.func.isRequired,
};

export default WidthAndHeightDetector;
