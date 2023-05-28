/**
 * 画线Demo，follow官网
 */

import * as THREE from "three";

// 创建渲染器
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// 创建透视相机
const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  1,
  500
);
camera.position.set(0, 0, 100);
camera.lookAt(0, 0, 0);

// 创建场景
const scene = new THREE.Scene();

// 定义材质，线材质只有LineBasicMaterial和LineDashedMaterial。
const material = new THREE.LineBasicMaterial({ color: "#00f" });

// 定义几何体
const points = [];
points.push(new THREE.Vector3(-10, 0, 0));
points.push(new THREE.Vector3(0, 10, 0));
points.push(new THREE.Vector3(10, 0, 0));
const geometry = new THREE.BufferGeometry().setFromPoints(points);

// 形成一条线
const line = new THREE.Line(geometry, material);

// 将线添加到场景中
scene.add(line);

renderer.render(scene, camera);
