"use client";
import React, { useRef, useEffect } from "react";
import * as THREE from "three";

export const Rose: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const W = 420, H = 420;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, W / H, 0.1, 1000);
    camera.position.set(0, 1.2, 6);
    camera.lookAt(0, 0.5, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setClearColor(0x000000, 0);
    renderer.setSize(W, H);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mountRef.current?.appendChild(renderer.domElement);

    // ── LIGHTS ──────────────────────────────────────────────────
    const ambient = new THREE.AmbientLight(0xffe0e8, 0.6);
    scene.add(ambient);

    const keyLight = new THREE.DirectionalLight(0xfff0f5, 2.0);
    keyLight.position.set(3, 6, 4);
    keyLight.castShadow = true;
    scene.add(keyLight);

    const fillLight = new THREE.PointLight(0xff6688, 1.2, 20);
    fillLight.position.set(-3, 3, 2);
    scene.add(fillLight);

    const rimLight = new THREE.PointLight(0xffaacc, 0.8, 15);
    rimLight.position.set(0, -2, -4);
    scene.add(rimLight);

    // ── MATERIALS ───────────────────────────────────────────────
    const petalMat = new THREE.MeshPhysicalMaterial({
      color: 0xc8193c,
      roughness: 0.35,
      metalness: 0.0,
      transmission: 0.18,
      thickness: 0.4,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.96,
    });
    const innerPetalMat = new THREE.MeshPhysicalMaterial({
      color: 0x9b0f2c,
      roughness: 0.3,
      metalness: 0.0,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.98,
    });
    const stemMat = new THREE.MeshPhongMaterial({
      color: 0x2d6a2d,
      shininess: 40,
      specular: 0x88cc88,
    });
    const leafMat = new THREE.MeshPhysicalMaterial({
      color: 0x2e7d32,
      roughness: 0.6,
      metalness: 0.0,
      side: THREE.DoubleSide,
    });

    // ── HELPERS ─────────────────────────────────────────────────
    // Build a single petal as a smooth curved shape
    function makePetalMesh(
      mat: THREE.Material,
      width: number,
      height: number,
      curl: number,       // how much the tip curls back
      cupDepth: number,   // how much it cups inward
      segs = 20
    ): THREE.Mesh {
      const geo = new THREE.BufferGeometry();
      const positions: number[] = [];
      const normals: number[] = [];
      const uvs: number[] = [];
      const indices: number[] = [];

      for (let i = 0; i <= segs; i++) {
        for (let j = 0; j <= segs; j++) {
          const u = j / segs; // 0→1 across width
          const v = i / segs; // 0→1 along height

          // Petal shape: ellipse-ish, narrow at base, wide in middle, taper at tip
          const shapeW = Math.sin(v * Math.PI) * Math.pow(Math.sin(u * Math.PI), 0.55);
          const x = (u - 0.5) * width * shapeW * 2;
          const y = v * height;

          // Curl: tip bends back
          const curlFactor = Math.pow(v, 2.5) * curl;
          // Cup: center dips inward
          const cupFactor = Math.sin(u * Math.PI) * Math.sin(v * Math.PI) * cupDepth;

          const z = -curlFactor + cupFactor;

          positions.push(x, y, z);

          // Approximate normal
          const nx = 0;
          const ny = curlFactor * 0.3;
          const nz = 1 - Math.abs(curlFactor) * 0.1;
          normals.push(nx, ny, nz);
          uvs.push(u, v);
        }
      }

      for (let i = 0; i < segs; i++) {
        for (let j = 0; j < segs; j++) {
          const a = i * (segs + 1) + j;
          const b = a + 1;
          const c = a + (segs + 1);
          const d = c + 1;
          indices.push(a, b, c);
          indices.push(b, d, c);
        }
      }

      geo.setIndex(indices);
      geo.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
      geo.setAttribute("normal", new THREE.Float32BufferAttribute(normals, 3));
      geo.setAttribute("uv", new THREE.Float32BufferAttribute(uvs, 2));
      geo.computeVertexNormals();

      return new THREE.Mesh(geo, mat);
    }

    // ── ROSE GROUP ──────────────────────────────────────────────
    const roseGroup = new THREE.Group();
    scene.add(roseGroup);

    // Stem curve (elegant slight lean)
    const stemCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, -2.8, 0),
      new THREE.Vector3(0.12, -1.6, 0.05),
      new THREE.Vector3(0.18, -0.4, 0.05),
      new THREE.Vector3(0.1, 0.3, 0),
      new THREE.Vector3(0, 0.8, 0),
    ]);
    const stemGeo = new THREE.TubeGeometry(stemCurve, 80, 0.055, 12, false);
    const stemMesh = new THREE.Mesh(stemGeo, stemMat);
    stemMesh.castShadow = true;
    roseGroup.add(stemMesh);

    // ── LEAVES ──────────────────────────────────────────────────
    function makeLeaf(
      rx: number, ry: number, rz: number,
      px: number, py: number, pz: number,
      scale: number
    ) {
      const shape = new THREE.Shape();
      shape.moveTo(0, 0);
      shape.bezierCurveTo(0.4, 0.2, 0.7, 0.8, 0, 1.3);
      shape.bezierCurveTo(-0.7, 0.8, -0.4, 0.2, 0, 0);

      const geo = new THREE.ShapeGeometry(shape, 20);
      const mesh = new THREE.Mesh(geo, leafMat);
      mesh.rotation.set(rx, ry, rz);
      mesh.position.set(px, py, pz);
      mesh.scale.setScalar(scale);
      mesh.castShadow = true;
      roseGroup.add(mesh);
      return mesh;
    }

    const leaf1 = makeLeaf(-0.3, 0.6, -0.4, 0.2, -1.2, 0.1, 0.7);
    const leaf2 = makeLeaf(-0.3, -0.7, 0.5, -0.25, -1.5, 0.1, 0.55);
    const leaf3 = makeLeaf(-0.2, 1.2, -0.2, 0.3, -0.6, 0.05, 0.45);

    // ── SEPAL (green base of flower) ────────────────────────────
    const sepalMat = new THREE.MeshPhysicalMaterial({ color: 0x2e7d32, roughness: 0.5, side: THREE.DoubleSide });
    for (let i = 0; i < 5; i++) {
      const angle = (i / 5) * Math.PI * 2;
      const sep = makePetalMesh(sepalMat, 0.22, 0.55, 0.25, 0.08, 12);
      sep.position.set(0, 0.82, 0);
      sep.rotation.y = angle;
      sep.rotation.x = Math.PI * 0.18;
      roseGroup.add(sep);
    }

    // ── PETALS: 5 layers ────────────────────────────────────────
    const allPetals: THREE.Mesh[] = [];

    const layers = [
      // [count, radius, yBase, tiltX, width, height, curl, cup, matType, rotOffset]
      [5,  0.08, 0.92, -0.55, 0.28, 0.42, 0.10, 0.14, "inner", 0.31],  // innermost closed bud
      [5,  0.15, 0.90, -0.42, 0.38, 0.54, 0.18, 0.18, "inner", 0.0],   // layer 2
      [7,  0.28, 0.88, -0.30, 0.50, 0.68, 0.28, 0.22, "outer", 0.22],  // layer 3
      [8,  0.44, 0.84, -0.18, 0.60, 0.80, 0.42, 0.28, "outer", 0.10],  // layer 4
      [9,  0.64, 0.80, -0.08, 0.68, 0.88, 0.60, 0.30, "outer", 0.05],  // outermost
    ] as const;

    layers.forEach(([count, radius, yBase, tiltX, pw, ph, curl, cup, matType, rotOff]) => {
      for (let i = 0; i < count; i++) {
        const angle = (i / count) * Math.PI * 2 + (rotOff as number);
        const mat = matType === "inner" ? innerPetalMat : petalMat;
        const petal = makePetalMesh(mat, pw, ph, curl, cup, 18);

        petal.position.set(
          Math.sin(angle) * radius,
          yBase,
          Math.cos(angle) * radius
        );
        petal.rotation.y = angle;
        petal.rotation.x = tiltX - 0.05 * Math.random();
        petal.castShadow = true;

        roseGroup.add(petal);
        allPetals.push(petal);
      }
    });

    // ── STAMENS (tiny center pistils) ───────────────────────────
    const stamenMat = new THREE.MeshPhongMaterial({ color: 0xffd700, shininess: 80 });
    for (let i = 0; i < 12; i++) {
      const a = (i / 12) * Math.PI * 2;
      const r = 0.04 + Math.random() * 0.04;
      const geo = new THREE.CylinderGeometry(0.008, 0.008, 0.12, 6);
      const s = new THREE.Mesh(geo, stamenMat);
      s.position.set(Math.sin(a) * r, 0.95 + Math.random() * 0.05, Math.cos(a) * r);
      roseGroup.add(s);

      const tipGeo = new THREE.SphereGeometry(0.018, 6, 6);
      const tip = new THREE.Mesh(tipGeo, stamenMat);
      tip.position.set(Math.sin(a) * r, 1.07 + Math.random() * 0.04, Math.cos(a) * r);
      roseGroup.add(tip);
    }

    // ── FALLING PETALS (ambient floating petals) ─────────────────
    const fallingPetals: { mesh: THREE.Mesh; vy: number; vr: number; vy2: number; t: number }[] = [];
    for (let i = 0; i < 6; i++) {
      const fp = makePetalMesh(petalMat.clone(), 0.25, 0.38, 0.5, 0.15, 10);
      (fp.material as THREE.MeshPhysicalMaterial).opacity = 0.55 + Math.random() * 0.3;
      fp.position.set(
        (Math.random() - 0.5) * 4,
        (Math.random() - 0.3) * 3,
        (Math.random() - 0.5) * 2 - 0.5
      );
      fp.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI * 2, Math.random() * Math.PI);
      scene.add(fp);
      fallingPetals.push({ mesh: fp, vy: 0.003 + Math.random() * 0.004, vr: 0.008 + Math.random() * 0.01, vy2: Math.random() * Math.PI * 2, t: Math.random() * 100 });
    }

    // ── ANIMATION ───────────────────────────────────────────────
    let frame = 0;
    let animId: number;

    const animate = () => {
      animId = requestAnimationFrame(animate);
      frame++;
      const t = frame * 0.012;

      // Gentle sway of entire rose
      roseGroup.rotation.y = Math.sin(t * 0.4) * 0.08;
      roseGroup.rotation.z = Math.sin(t * 0.3) * 0.025;
      roseGroup.position.y = Math.sin(t * 0.5) * 0.04;

      // Petals breathe slightly (open/close)
      const breathe = Math.sin(t * 0.6) * 0.012;
      allPetals.forEach((p, idx) => {
        const layerIdx = Math.floor(idx / 5);
        const wobble = Math.sin(t + idx * 0.8) * 0.008;
        p.rotation.x += (breathe * (layerIdx * 0.5 + 0.5) - p.rotation.x * 0.0) * 0.005;
        p.rotation.z += wobble * 0.1;
      });

      // Leaves gentle flutter
      leaf1.rotation.z = -0.4 + Math.sin(t * 0.7) * 0.04;
      leaf2.rotation.z = 0.5 + Math.sin(t * 0.5 + 1) * 0.035;
      leaf3.rotation.z = -0.2 + Math.sin(t * 0.9 + 2) * 0.03;

      // Falling petals drift
      fallingPetals.forEach((fp) => {
        fp.t += 0.01;
        fp.mesh.position.y -= fp.vy;
        fp.mesh.position.x += Math.sin(fp.t * 0.7) * 0.004;
        fp.mesh.rotation.x += fp.vr * 0.5;
        fp.mesh.rotation.z += fp.vr * 0.3;

        // Reset when fallen too low
        if (fp.mesh.position.y < -3.5) {
          fp.mesh.position.y = 3.0 + Math.random() * 1.5;
          fp.mesh.position.x = (Math.random() - 0.5) * 4;
        }
      });

      // Subtle fill light pulse (like candlelight)
      fillLight.intensity = 1.0 + Math.sin(t * 1.3) * 0.15;

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      renderer.dispose();
      mountRef.current?.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{
        width: 420,
        height: 420,
        background: "transparent",
        display: "block",
      }}
    />
  );
};