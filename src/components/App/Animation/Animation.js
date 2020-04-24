import React, { useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import THREE from "../../../libs/three";
import AMI from "../../../libs/ami";
import throttle from "lodash.throttle";
import { colors, files } from "../../../helpers/utils";
import { orientationKeys, views } from "../../../constants/";

let camera, scene, renderer, stackHelper;

const Scene = styled.div`
  width: 900px;
  text-align: center;
  margin: 1em;
`;

const Animation = ({
  cameraPosition,
  planePositions,
  orientation,
  view,
  setOrientationMaxIndex,
  setCameraPosition,
}) => {
  const updateCameraPosition = useCallback((cameraPosition) => {
    camera.position.x = cameraPosition.x;
    camera.position.y = cameraPosition.y;
    camera.position.z = cameraPosition.z;
  }, []);

  const setMaxIndex = useCallback(() => {
    const orientationKey = orientationKeys[orientation];
    stackHelper.orientation = orientation;
    stackHelper.index = planePositions[orientationKey];
    setOrientationMaxIndex(stackHelper.orientationMaxIndex);
  }, [orientation, planePositions, setOrientationMaxIndex]);

  const setCenter = useCallback(() => {
    const centerLPS = stackHelper.stack.worldCenter();
    camera.lookAt(centerLPS.x, centerLPS.y, centerLPS.z);
    camera.updateProjectionMatrix();
  }, []);

  useEffect(() => {
    const init = () => {
      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(90, 1, 1, 500);
      updateCameraPosition(views[view]);

      renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setSize(900, 900);

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
  }, [view, updateCameraPosition, setCenter]);

  useEffect(() => {
    if (!stackHelper) return;

    setMaxIndex();
  }, [planePositions, orientation, setMaxIndex]);

  useEffect(() => {
    setCameraPosition(views[view]);
  }, [view, setCameraPosition]);

  useEffect(() => {
    if (!stackHelper) return;

    updateCameraPosition(cameraPosition);
    setCenter();
  }, [cameraPosition, updateCameraPosition, setCenter]);

  return <Scene className="scene" />;
};

Animation.propTypes = {
  cameraPosition: PropTypes.object.isRequired,
  planePositions: PropTypes.object.isRequired,
  orientation: PropTypes.number.isRequired,
  view: PropTypes.number.isRequired,
  setCameraPosition: PropTypes.func.isRequired,
  setOrientationMaxIndex: PropTypes.func.isRequired,
};

export default Animation;
