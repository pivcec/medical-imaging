import React from "react";
import styled from "styled-components";
import { defaultCameraPositions } from "../../constants";
import { DimensionLabels } from "../../types/index";

const Container = styled.div`
  padding: 1em;
  background-color: #000;
  color: #fff;
  font-weight: bold;
  display: flex;
`;

const InfoContainer = styled.div<{ align: string }>`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: ${(props) => props.align};
`;

const labels = { x: "SIDE", y: "FRONT", z: "TOP" };

type InfoLegendProps = {
  selectedOrientation: DimensionLabels;
  selectedView: DimensionLabels;
  zoomLevel: number;
  planePosition: number;
  orientationMaxIndex: number | null;
};

const getViewLabel = (selected: DimensionLabels) => `${labels[selected]} VIEW`;
const getOrientationLabel = (selected: DimensionLabels) =>
  `${labels[selected]} SLICE`;

const InfoLegend = ({
  selectedOrientation,
  selectedView,
  zoomLevel,
  planePosition,
  orientationMaxIndex,
}: InfoLegendProps) => {
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

export default InfoLegend;
