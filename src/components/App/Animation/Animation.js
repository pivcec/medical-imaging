import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import THREE from "../../../libs/three";
import AMI from "../../../libs/ami";
import { colors, files } from "../../../helpers/utils";

const orientationKeys = ["x", "y", "z"];

let camera, scene, renderer, stackHelper;

const Scene = styled.div`
  text-align: center;
  margin: 1em;
`;

const Animation = ({
  planePosition,
  cameraPosition,
  centerPosition,
  orientation,
  handleCentering,
}) => {
  const [activeOrientation, setActiveOrientation] = useState("x");

  useEffect(() => {
    const init = () => {
      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(60, 1, 1, 500);
      camera.position.x = cameraPosition.x;
      camera.position.y = cameraPosition.y;
      camera.position.z = cameraPosition.z;

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
          stackHelper.index = planePosition.x;
          scene.add(stackHelper);

          const centerLPS = stackHelper.stack.worldCenter();
          camera.lookAt(centerLPS.x, centerLPS.y, centerLPS.z);
          camera.updateProjectionMatrix();
          handleCentering(centerLPS);
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
    if (!centerPosition || !stackHelper) return;
    const centerLPS = stackHelper.stack.worldCenter();

    if (JSON.stringify(centerLPS) !== JSON.stringify(centerPosition)) {
      camera.lookAt(centerPosition.x, centerPosition.y, centerPosition.z);
      camera.updateProjectionMatrix();
    }
  }, [centerPosition]);

  useEffect(() => {
    if (!camera) return;

    camera.position.x = cameraPosition.x;
    camera.position.y = cameraPosition.y;
    camera.position.z = cameraPosition.z;
  }, [cameraPosition]);

  useEffect(() => {
    if (!stackHelper) return;

    setActiveOrientation(orientationKeys[orientation]);
  }, [orientation]);

  useEffect(() => {
    if (!stackHelper) return;

    stackHelper.orientation = orientationKeys.indexOf(activeOrientation);

    stackHelper.index = planePosition[activeOrientation];
  }, [planePosition, activeOrientation]);

  return <Scene className="scene" />;
};

Animation.propTypes = {
  planePosition: PropTypes.object.isRequired,
  cameraPosition: PropTypes.object.isRequired,
  centerPosition: PropTypes.object.isRequired,
  orientation: PropTypes.number.isRequired,
  handleCentering: PropTypes.func.isRequired,
};

export default Animation;
