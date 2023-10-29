/**
 * 第一个场景Demo，follow官网
 */

import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import WebGL from "./utils/capability";

// 创建场景
const scene = new THREE.Scene();

// 创建相机，使用透视相机
const camera = new THREE.PerspectiveCamera(
  75, // 视场角度
  window.innerWidth / window.innerHeight, // 屏幕宽高比
  0.1, // 近裁截面
  1000 // 远裁截面
);

// 创建渲染器
const renderer = new THREE.WebGLRenderer();

// 设置渲染器
renderer.setSize(window.innerWidth, window.innerHeight);

// 渲染器添加到Dom中
document.body.appendChild(renderer.domElement);

// 创建立方体
const geometry = new THREE.BoxGeometry(1, 1, 1);

// 创建材质
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });

// 创建网格，网格包含几何体+作用于几何体的材质
const cube = new THREE.Mesh(geometry, material);

// 场景中添加网格，默认相机和网格在(0,0,0)坐标
scene.add(cube);

// 将相机与网格坐标移开一点
camera.position.z = 5;

function animate() {
  // 动画循环
  requestAnimationFrame(animate);

  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

  renderer.render(scene, camera);
}

// 判断webgl支持，则执行动画，否则提示错误
if (WebGL.isWebGLAvailable()) {
  // Initiate function or other initializations here
  animate();
} else {
  const warning = WebGL.getWebGLErrorMessage();
  document.body.appendChild(warning);
}
