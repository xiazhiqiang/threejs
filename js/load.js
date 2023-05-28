/**
 * 加载某个gltf三维模型
 */

import * as THREE from "three";
import { loadModel } from "./utils/loader";

// 创建场景
const scene = new THREE.Scene();

// 创建渲染器
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor("#ccc", 0.5); // 设置渲染器整体背景颜色为白色
renderer.shadowMap.enable = true;
document.body.appendChild(renderer.domElement);

// 添加环境光
const ambientLight = new THREE.AmbientLight("#fff");
scene.add(ambientLight);

// 添加线光源
const pointLight = new THREE.PointLight("#fff");
pointLight.position.set(20, 20, 0);
pointLight.castShadow = true; // 阴影
scene.add(pointLight);

// 创建透视相机
const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(50, 50, 50);
camera.lookAt(0, 0, 0);

let model = null;
try {
  // 加载模型
  model = await loadModel("/gltf/F16.gltf");
} catch (e) {
  console.error("error load model", e);
}

if (model) {
  model.receiveShadow = true; // 接受阴影

  // 将模型添加到场景中
  scene.add(model.scene);

  renderer.render(scene, camera);
}
