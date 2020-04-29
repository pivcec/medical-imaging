import React, { useEffect, useCallback, useState, useRef } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import widthAndHeightDetectorPropTypes from "../WidthAndHeightDetector";
import THREE from "../../../libs/three";
import AMI from "../../../libs/ami";
import throttle from "lodash.throttle";
import { colors, files } from "../../../helpers/utils";
import { orientationKeys, defaultCameraPositions } from "../../../constants";

const Scene = styled.div`
  cursor: ${(props) => (props.grabbing ? "grabbing" : "grab")};
`;

let camera, scene, renderer, stackHelper;

const Animation = ({
  planePositions,
  selectedOrientation,
  selectedView,
  zoomLevel,
  setOrientationMaxIndex,
  smallerAnimationDimension,
}) => {
  const halfOfSmallerAnimationDimension = smallerAnimationDimension / 2;

  const [centerOffset, setCenterOffset] = useState({
    x: 0,
    y: 0,
    z: 0,
  });

  const [isDragging, setIsDragging] = useState(false);

  const [startDragCoords, setStartDragCoords] = useState(null);

  const [zoomTo, setZoomTo] = useState({
    x: halfOfSmallerAnimationDimension,
    y: halfOfSmallerAnimationDimension,
  });

  const startDragCoordsRef = useRef(startDragCoords);
  startDragCoordsRef.current = startDragCoords;

  const selectedViewRef = useRef(selectedView);
  selectedViewRef.current = selectedView;

  const zoomLevelRef = useRef(zoomLevel);
  zoomLevelRef.current = zoomLevel;

  const centerOffsetRef = useRef(centerOffset);
  centerOffsetRef.current = centerOffset;

  const setCenterOffsetThrottled = throttle(setCenterOffset, 50);

  const handleMouseDown = (e) => {
    const bounds = e.target.getBoundingClientRect();

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    setIsDragging(true);

    setStartDragCoords({
      x: e.clientX - bounds.left,
      y: e.clientY - bounds.top,
    });
  };

  const handleMouseMove = (e) => {
    const bounds = e.target.getBoundingClientRect();

    const distanceFromDragStartX =
      startDragCoordsRef.current.x - (e.clientX - bounds.left);
    const distanceFromDragStartY =
      startDragCoordsRef.current.y - (e.clientY - bounds.top);

    setZoomTo({
      x: zoomTo.x + distanceFromDragStartX,
      y: zoomTo.y + distanceFromDragStartY,
    });
  };

  const handleMouseUp = () => {
    window.removeEventListener("mousemove", handleMouseMove);
    window.removeEventListener("mouseup", handleMouseUp);

    setIsDragging(false);
  };

  const updateCameraPosition = useCallback(() => {
    const cameraPosition = defaultCameraPositions[selectedViewRef.current];
    const originalZoomDistance = cameraPosition[selectedViewRef.current];
    const newZoomDistance = originalZoomDistance - zoomLevelRef.current;
    const cameraPositionWithZoom = {
      ...cameraPosition,
      [selectedViewRef.current]: newZoomDistance,
    };

    camera.position.x = cameraPositionWithZoom.x + centerOffsetRef.current.x;
    camera.position.y = cameraPositionWithZoom.y + centerOffsetRef.current.y;
    camera.position.z = cameraPositionWithZoom.z + centerOffsetRef.current.z;
  }, []);

  const updateCameraCenter = useCallback(() => {
    const centerLPS = stackHelper.stack.worldCenter();
    camera.lookAt(
      centerLPS.x + centerOffsetRef.current.x,
      centerLPS.y + centerOffsetRef.current.y,
      centerLPS.z + centerOffsetRef.current.z
    );
    camera.updateProjectionMatrix();
  }, []);

  const setMaxIndex = useCallback(() => {
    stackHelper.orientation = orientationKeys[selectedOrientation];
    stackHelper.index = planePositions[selectedOrientation];
    setOrientationMaxIndex(stackHelper.orientationMaxIndex);
  }, [selectedOrientation, planePositions, setOrientationMaxIndex]);

  useEffect(() => {
    const init = () => {
      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(90, 1, 1, 500);
      updateCameraPosition();
      renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setSize(smallerAnimationDimension, smallerAnimationDimension);
      const container = document.getElementsByClassName("scene")[0];
      container.appendChild(renderer.domElement);
      const loader = new AMI.VolumeLoader(container);
      loader
        .load(files)
        .then(() => {
          const series = loader.data[0].mergeSeries(loader.data)[0];
          const stack = series.stack[0];
          loader.free();

          stackHelper = new AMI.StackHelper(stack);
          stackHelper.bbox.color = colors.red;
          stackHelper.border.color = colors.blue;
          scene.add(stackHelper);

          setMaxIndex();
          updateCameraCenter();
        })
        .catch((error) => {
          console.log("error loading", error);
        });
    };

    const animate = () => {
      renderer.render(scene, camera);
      requestAnimationFrame(trottledAnimate);
    };

    const trottledAnimate = throttle(animate, 50);

    init();
    animate();
  }, []);

  useEffect(() => {
    if (!stackHelper) return;

    setMaxIndex();
  }, [planePositions, selectedOrientation, setMaxIndex]);

  useEffect(() => {
    if (!stackHelper) return;

    setCenterOffset({ x: 0, y: 0, z: 0 });
    updateCameraPosition();
    updateCameraCenter();
  }, [selectedView, updateCameraPosition, updateCameraCenter, setCenterOffset]);

  useEffect(() => {
    if (!stackHelper) return;

    updateCameraPosition();
    updateCameraCenter();
  }, [zoomLevel]);

  useEffect(() => {
    if (!stackHelper || !zoomTo) return;

    const getCenterOffsetForViewX = ({ left, right, up, down }) => {
      return {
        x: 0,
        y: down ? down : up ? -up : 0, // pos down, neg up
        z: right ? right : left ? -left : 0, // pos right, neg left
      };
    };

    const getCenterOffsetForViewY = ({ left, right, up, down }) => {
      return {
        x: left ? left : right ? -right : 0, // pos left, neg right
        y: 0,
        z: up ? up : down ? -down : 0, // pos up, neg down
      };
    };

    const getCenterOffsetForViewZ = ({ left, right, up, down }) => {
      return {
        x: left ? left : right ? -right : 0, // pos left, neg right
        y: down ? down : up ? -up : 0, // pos down, neg up
        z: 0,
      };
    };

    const getCenterOffset = (distanceToMove) => {
      if (selectedView === "x") return getCenterOffsetForViewX(distanceToMove);
      if (selectedView === "y") return getCenterOffsetForViewY(distanceToMove);
      if (selectedView === "z") return getCenterOffsetForViewZ(distanceToMove);
    };

    const distanceToMoveX = halfOfSmallerAnimationDimension - zoomTo.x;
    const distanceToMoveY = halfOfSmallerAnimationDimension - zoomTo.y;

    const distanceToMove = {
      left: distanceToMoveX < 0 ? Math.abs(distanceToMoveX) : 0,
      right: distanceToMoveX > 0 ? distanceToMoveX : 0,
      up: distanceToMoveY < 0 ? Math.abs(distanceToMoveY) : 0,
      down: distanceToMoveY > 0 ? distanceToMoveY : 0,
    };

    const centerOffset = getCenterOffset(distanceToMove);

    setCenterOffsetThrottled(centerOffset);
  }, [zoomTo]);

  useEffect(() => {
    if (!stackHelper || !centerOffset) return;

    updateCameraPosition();
    updateCameraCenter();
  }, [centerOffset]);

  return (
    <Scene
      onMouseDown={handleMouseDown}
      grabbing={isDragging}
      className="scene"
    />
  );
};

Animation.propTypes = {
  ...widthAndHeightDetectorPropTypes,
  smallerAnimationDimension: PropTypes.number.isRequired,
};

export default Animation;
