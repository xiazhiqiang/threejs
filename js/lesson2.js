import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

// 实践学习一下不同光源和材质对渲染物体的影响

const scene = new THREE.Scene();

// 物体
const geometry = new THREE.BoxGeometry(4, 4, 4);
const material = new THREE.MeshLambertMaterial({
  color: "#ff0",
  transparent: true,
  opacity: 0.5,
});
const mesh = new THREE.Mesh(geometry, material);
mesh.position.set(-10, 2, 2);
scene.add(mesh);

// 添加辅助
const axesHelper = new THREE.AxesHelper(30);
scene.add(axesHelper);

// 点光源
const pointLight = new THREE.PointLight("#f00", 1);
pointLight.position.set(6, 0, 0);
scene.add(pointLight);
const pointLightHelper = new THREE.PointLightHelper(pointLight); // 添加点光源查看器
scene.add(pointLightHelper);

// // 环境光
// const ambientLight = new THREE.AmbientLight("#fff", 1);
// ambientLight.position.set(10, 0, 0);
// scene.add(ambientLight);
// const ambientLightHelper = new THREE.PointLightHelper(ambientLight); // 添加点光源查看器
// scene.add(ambientLightHelper);

// 透视相机
const camera = new THREE.PerspectiveCamera(
  90,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(30, 30, 30);
camera.lookAt(0, 0, 0);
scene.add(camera);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.render(scene, camera);
document.getElementById("webgl").appendChild(renderer.domElement);

// 设置相机控件
const controls = new OrbitControls(camera, renderer.domElement);
controls.addEventListener("change", function () {
  renderer.render(scene, camera);
});
