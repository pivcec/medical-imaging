import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { defaultCameraPositions } from "../../constants";

const Container = styled.div`
  padding: 1em;
  background-color: #000;
  color: #fff;
  font-weight: bold;
  display: flex;
`;

const InfoContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: ${(props) => props.align};
`;

const getViewLabel = (selectedView) => {
  if (selectedView === "x") return "SIDE VIEW";
  if (selectedView === "y") return "FRONT VIEW";
  if (selectedView === "z") return "TOP VIEW";
};

const getOrientationLabel = (getOrientationLabel) => {
  if (getOrientationLabel === "x") return "SIDE SLICE";
  if (getOrientationLabel === "y") return "FRONT SLICE";
  if (getOrientationLabel === "z") return "TOP SLICE";
};

const InfoLegend = ({
  selectedOrientation,
  selectedView,
  zoomLevel,
  planePosition,
  orientationMaxIndex,
}) => {
  const viewInfo = getViewLabel(selectedView);
  const orientationInfo = getOrientationLabel(selectedOrientation);
  const originalZoomDistance =
    defaultCameraPositions[selectedView][selectedView];

  return (
    <Container>
      {orientationMaxIndex && (
        <>
          <InfoContainer align={"flex-start"}>
            <div>{orientationInfo}</div>
            <div>{viewInfo}</div>
          </InfoContainer>
          <InfoContainer align={"flex-end"}>
            <div>
              <div>{`Slice: ${planePosition}/${orientationMaxIndex}`}</div>
              <div>{`Zoom: ${((zoomLevel / originalZoomDistance) * 100).toFixed(
                1
              )}%`}</div>
            </div>
          </InfoContainer>
        </>
      )}
    </Container>
  );
};

InfoLegend.propTypes = {
  selectedOrientation: PropTypes.string.isRequired,
  selectedView: PropTypes.string.isRequired,
  zoomLevel: PropTypes.number.isRequired,
  planePosition: PropTypes.number.isRequired,
  orientationMaxIndex: PropTypes.number,
};

export default InfoLegend;
