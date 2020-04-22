import React, { useEffect } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import THREE from "../../../libs/three";
import AMI from "../../../libs/ami";
import { colors, files } from "../../../helpers/utils";
import { orientationKeys, views } from "../../../constants/";

let camera, scene, renderer, stackHelper;

const Scene = styled.div`
  width: 900px;
  text-align: center;
  margin: 1em;
`;

const Animation = ({
  planePosition,
  orientation,
  view,
  setOrientationMaxIndex,
}) => {
  const updateCameraPosition = (cameraPosition) => {
    camera.position.x = cameraPosition.x;
    camera.position.y = cameraPosition.y;
    camera.position.z = cameraPosition.z;
  };

  const setMaxIndex = () => {
    const orientationKey = orientationKeys[orientation];
    stackHelper.orientation = orientationKeys.indexOf(orientationKey);
    stackHelper.index = planePosition[orientationKey];
    setOrientationMaxIndex(stackHelper.orientationMaxIndex);
  };

  const setCenter = () => {
    const centerLPS = stackHelper.stack.worldCenter();
    camera.lookAt(centerLPS.x, centerLPS.y, centerLPS.z);
    camera.updateProjectionMatrix();
  };

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
      requestAnimationFrame(animate);
    };

    init();
    animate();
  }, []);

  useEffect(() => {
    if (!stackHelper) return;

    setMaxIndex();
  }, [planePosition, orientation]);

  useEffect(() => {
    if (!stackHelper) return;

    updateCameraPosition(views[view]);
    setCenter();
  }, [view]);

  return <Scene className="scene" />;
};

Animation.propTypes = {
  planePosition: PropTypes.object.isRequired,
  orientation: PropTypes.number.isRequired,
  view: PropTypes.number.isRequired,
  setOrientationMaxIndex: PropTypes.func.isRequired,
};

export default Animation;
