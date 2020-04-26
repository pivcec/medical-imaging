import React, { useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import widthAndHeightDetectorPropTypes from "../WidthAndHeightDetector";
import THREE from "../../../libs/three";
import AMI from "../../../libs/ami";
import throttle from "lodash.throttle";
import { colors, files } from "../../../helpers/utils";
import { orientationKeys, defaultViews } from "../../../constants";

let camera, scene, renderer, stackHelper;

const Animation = ({
  cameraPosition,
  planePositions,
  selectedOrientation,
  selectedView,
  zoomLevels,
  setOrientationMaxIndex,
  setCameraPosition,
  animationWidth,
  animationHeight,
}) => {
  const updateCameraPosition = useCallback((cameraPosition) => {
    camera.position.x = cameraPosition.x;
    camera.position.y = cameraPosition.y;
    camera.position.z = cameraPosition.z;
  }, []);

  const setMaxIndex = useCallback(() => {
    stackHelper.orientation = orientationKeys[selectedOrientation];
    stackHelper.index = planePositions[selectedOrientation];
    setOrientationMaxIndex(stackHelper.orientationMaxIndex);
  }, [selectedOrientation, planePositions, setOrientationMaxIndex]);

  const setCenter = useCallback(() => {
    const centerLPS = stackHelper.stack.worldCenter();
    camera.lookAt(centerLPS.x, centerLPS.y, centerLPS.z);
    camera.updateProjectionMatrix();
  }, []);

  useEffect(() => {
    const init = () => {
      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(90, 1, 1, 500);
      updateCameraPosition(cameraPosition);

      renderer = new THREE.WebGLRenderer({ antialias: true });

      renderer.setSize(animationWidth, animationHeight);

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
          setCenter();
        })
        .catch((error) => {
          console.log("error loading", error);
        });
    };

    const animate = () => {
      renderer.render(scene, camera);
      requestAnimationFrame(trottledAnimate);
    };

    const trottledAnimate = throttle(animate, 500);

    init();
    animate();
  }, []);

  useEffect(() => {
    if (!stackHelper) return;

    setMaxIndex();
  }, [planePositions, selectedOrientation, setMaxIndex]);

  useEffect(() => {
    const newView = defaultViews[selectedView];
    const originalZoomDistance = newView[selectedView];
    const newZoomDistance = originalZoomDistance - zoomLevels[selectedView];

    setCameraPosition({
      ...newView,
      [selectedView]: newZoomDistance,
    });
  }, [selectedView]);

  useEffect(() => {
    if (!stackHelper) return;

    updateCameraPosition(cameraPosition);
    setCenter();
  }, [cameraPosition]);

  return <div className="scene" />;
};

Animation.propTypes = {
  ...widthAndHeightDetectorPropTypes,
  animationWidth: PropTypes.number.isRequired,
  animationHeight: PropTypes.number.isRequired,
};

export default Animation;
