import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

// 结合threejs中文网教程入门，实践一下渲染基本物体，添加透视相机对准物体，添加辅助和相机控制器

// 1. 创建一个场景
const scene = new THREE.Scene();

const axesHelper = new THREE.AxesHelper(20); // 添加辅助
scene.add(axesHelper);

// 2. 创建一个三维物体
const geometry = new THREE.BoxGeometry(); // 创建一个几何体
const material = new THREE.MeshBasicMaterial({
  color: "#fff",
  transparent: true,
  opacity: 0.6,
});
// 创建一种材质
const mesh = new THREE.Mesh(geometry, material); // 几何体添加材质生成三维物体
mesh.position.set(0, 0, 0); // 设置三维物体位置
scene.add(mesh); // 将三维物体添加到场景中

// 3. 创建一个透视相机
const camera = new THREE.PerspectiveCamera(
  90, // 近场角度
  window.innerWidth / window.innerHeight, // 宽高比
  0.1, // 近截面距离
  2000 // 远截面距离
);
camera.position.set(5, 5, 5); // 设置相机位置
camera.lookAt(mesh.position); // 将相机对准物体

// 4. 创建渲染器
const renderer = new THREE.WebGLRenderer();
document.getElementById("webgl").appendChild(renderer.domElement); // 将拍照结果渲染到Canvas画布中
renderer.setSize(window.innerWidth, window.innerHeight); // 设置渲染器
renderer.render(scene, camera); // 通过透视相机对物体进行“拍照”

// 设置相机控件轨道控制器OrbitControls
const controls = new OrbitControls(camera, renderer.domElement);
// 如果OrbitControls改变了相机参数，重新调用渲染器渲染三维场景
controls.addEventListener("change", function () {
  renderer.render(scene, camera);
});
