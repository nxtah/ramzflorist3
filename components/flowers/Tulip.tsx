// Tulip flower component using Three.js
import React, { useRef, useEffect } from "react";
import * as THREE from "three";

export const Tulip: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const width = 300;
    const height = 300;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    mountRef.current?.appendChild(renderer.domElement);

    // Tulip stem
    const stemGeometry = new THREE.CylinderGeometry(0.05, 0.05, 2, 32);
    const stemMaterial = new THREE.MeshPhongMaterial({ color: 0x228B22 });
    const stem = new THREE.Mesh(stemGeometry, stemMaterial);
    stem.position.y = -0.5;
    scene.add(stem);

    // Tulip bulb (ellipsoid)
    const bulbGeometry = new THREE.SphereGeometry(0.5, 32, 32);
    bulbGeometry.scale(1, 1.3, 1);
    const bulbMaterial = new THREE.MeshPhongMaterial({ color: 0xFF6347 });
    const bulb = new THREE.Mesh(bulbGeometry, bulbMaterial);
    bulb.position.y = 0.7;
    scene.add(bulb);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);
    const pointLight = new THREE.PointLight(0xffffff, 0.8);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    // Animation
    const animate = () => {
      bulb.rotation.y += 0.01;
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };
    animate();

    // Cleanup
    return () => {
      renderer.dispose();
      mountRef.current?.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} style={{ width: 300, height: 300 }} />;
};
