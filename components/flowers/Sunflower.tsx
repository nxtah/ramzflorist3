// Sunflower flower component using Three.js
import React, { useRef, useEffect } from "react";
import * as THREE from "three";

export const Sunflower: React.FC = () => {
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

    // Sunflower stem
    const stemGeometry = new THREE.CylinderGeometry(0.05, 0.05, 2, 32);
    const stemMaterial = new THREE.MeshPhongMaterial({ color: 0x228B22 });
    const stem = new THREE.Mesh(stemGeometry, stemMaterial);
    stem.position.y = -0.5;
    scene.add(stem);

    // Sunflower center
    const centerGeometry = new THREE.SphereGeometry(0.4, 32, 32);
    const centerMaterial = new THREE.MeshPhongMaterial({ color: 0x8B4513 });
    const center = new THREE.Mesh(centerGeometry, centerMaterial);
    center.position.y = 0.7;
    scene.add(center);

    // Sunflower petals (simple ring of spheres)
    const petalMaterial = new THREE.MeshPhongMaterial({ color: 0xFFD700 });
    for (let i = 0; i < 12; i++) {
      const angle = (i / 12) * Math.PI * 2;
      const petalGeometry = new THREE.SphereGeometry(0.18, 16, 16);
      const petal = new THREE.Mesh(petalGeometry, petalMaterial);
      petal.position.x = Math.cos(angle) * 0.7;
      petal.position.y = 0.7 + Math.sin(angle) * 0.7;
      scene.add(petal);
    }

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);
    const pointLight = new THREE.PointLight(0xffffff, 0.8);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    // Animation
    const animate = () => {
      center.rotation.y += 0.01;
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
