import React, { useEffect, useCallback, useState, useRef } from "react";
import styled from "styled-components";
import THREE from "../../../libs/three";
import AMI from "../../../libs/ami";
import throttle from "lodash.throttle";
import { colors, files } from "../../../helpers/utils";
import { orientationKeys, defaultCameraPositions } from "../../../constants";
import { Dimensions, DimensionLabels } from "../../../@types/types";
import StackHelper from "../../../libs/ami";
import { Object3D } from "three/src/core/Object3D";

const Scene = styled.div<{ grabbing: boolean }>`
  cursor: ${(props) => (props.grabbing ? "grabbing" : "grab")};
`;

type DragCoords = {
  x: number;
  y: number;
};

type Directions = {
  left: number;
  right: number;
  up: number;
  down: number;
};

export type AnimationProps = {
  planePositions: Dimensions;
  selectedOrientation: DimensionLabels;
  selectedView: DimensionLabels;
  zoomLevel: number;
  setOrientationMaxIndex: (newVal: number) => void;
  smallerAnimationDimension: number;
};

let camera: THREE.PerspectiveCamera,
  scene: THREE.Scene,
  renderer: THREE.Renderer,
  stackHelper: typeof StackHelper;

const Animation = ({
  planePositions,
  selectedOrientation,
  selectedView,
  zoomLevel,
  setOrientationMaxIndex,
  smallerAnimationDimension,
}: AnimationProps) => {
  const halfOfSmallerAnimationDimension = smallerAnimationDimension / 2;

  const [centerOffset, setCenterOffset] = useState<Dimensions>({
    x: 0,
    y: 0,
    z: 0,
  });

  const [isDragging, setIsDragging] = useState(false);

  const [
    startDragCoords,
    setStartDragCoords,
  ] = React.useState<DragCoords | null>(null);

  const [zoomTo, setZoomTo] = useState<DragCoords | null>({
    x: halfOfSmallerAnimationDimension,
    y: halfOfSmallerAnimationDimension,
  });

  const startDragCoordsRef = useRef(startDragCoords);
  startDragCoordsRef.current = startDragCoords;

  const selectedViewRef = useRef<DimensionLabels>(selectedView);
  selectedViewRef.current = selectedView;

  const zoomLevelRef = useRef(zoomLevel);
  zoomLevelRef.current = zoomLevel;

  const centerOffsetRef = useRef(centerOffset);
  centerOffsetRef.current = centerOffset;

  const setCenterOffsetThrottled = throttle(setCenterOffset, 50);

  const handleMouseDown = (e: React.MouseEvent<HTMLElement>) => {
    // @ts-ignore
    const bounds = e.target.getBoundingClientRect();

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    setIsDragging(true);

    setStartDragCoords({
      x: e.clientX - bounds.left,
      y: e.clientY - bounds.top,
    });
  };

  const handleMouseMove = (e: MouseEvent) => {
    const bounds = (e.target as HTMLElement).getBoundingClientRect();

    const distanceFromDragStartX =
      (startDragCoordsRef?.current?.x ?? 0) - (e.clientX - bounds.left);
    const distanceFromDragStartY =
      (startDragCoordsRef?.current?.y ?? 0) - (e.clientY - bounds.top);

    setZoomTo({
      x: (zoomTo?.x ?? 0) + distanceFromDragStartX,
      y: (zoomTo?.y ?? 0) + distanceFromDragStartY,
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
        .catch((error: object) => {
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

    const getCenterOffsetForViewX = ({
      left,
      right,
      up,
      down,
    }: Directions): Dimensions => {
      return {
        x: 0,
        y: down ? down : up ? -up : 0, // pos down, neg up
        z: right ? right : left ? -left : 0, // pos right, neg left
      };
    };

    const getCenterOffsetForViewY = ({
      left,
      right,
      up,
      down,
    }: Directions): Dimensions => {
      return {
        x: left ? left : right ? -right : 0, // pos left, neg right
        y: 0,
        z: up ? up : down ? -down : 0, // pos up, neg down
      };
    };

    const getCenterOffsetForViewZ = ({
      left,
      right,
      up,
      down,
    }: Directions): Dimensions => {
      return {
        x: left ? left : right ? -right : 0, // pos left, neg right
        y: down ? down : up ? -up : 0, // pos down, neg up
        z: 0,
      };
    };

    const getCenterOffset = (distanceToMove: Directions) => {
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

    // @ts-ignore
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

export default Animation;
