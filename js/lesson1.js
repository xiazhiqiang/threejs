import * as THREE from "three";

// 结合threejs中文网教程入门1-6，实践一下

// 1. 创建一个场景
const scene = new THREE.Scene();

// 2. 创建一个三维物体
const geometry = new THREE.BoxGeometry(1, 1, 1); // 创建一个几何体
const material = new THREE.MeshBasicMaterial({ color: "#f00" }); // 创建一种材质
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
renderer.setSize(window.innerWidth, window.innerHeight); // 设置渲染器
renderer.render(scene, camera); // 通过透视相机对物体进行“拍照”
document.getElementById("webgl").appendChild(renderer.domElement); // 将拍照结果渲染到Canvas画布中
