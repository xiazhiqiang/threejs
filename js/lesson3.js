import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

const scene = new THREE.Scene();

const geometry = new THREE.BoxGeometry(100, 100, 100); // 创建一个几何体
const material = new THREE.MeshLambertMaterial({
  color: "#0ff",
  transparent: true,
  opacity: 0.6,
  side: THREE.DoubleSide,
});

for (let i = 0; i < 10; i++) {
  for (let j = 0; j < 10; j++) {
    const mesh = new THREE.Mesh(geometry, material); //网格模型对象Mesh
    // 在XOZ平面上分布
    mesh.position.set(i * 200, 0, j * 200);
    scene.add(mesh); //网格模型添加到场景中
  }
}

// 由于材质是漫反射，所以需要添加光源
// 添加环境光源
const ambientLight = new THREE.AmbientLight("#fff", 1);
ambientLight.position.set(0, 0, 0);
scene.add(ambientLight);
const ambientLightHelper = new THREE.PointLightHelper(ambientLight); // 添加点光源查看器
scene.add(ambientLightHelper);

const camera = new THREE.PerspectiveCamera(
  90, // 近场角度
  window.innerWidth / window.innerHeight, // 宽高比
  1, // 近截面距离
  8000 // 远截面距离
);
camera.position.set(2000, 2000, 2000); // 设置相机位置
camera.lookAt(0, 0, 0);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.render(scene, camera);
document.getElementById("webgl").appendChild(renderer.domElement);

// 设置相机控件轨道控制器OrbitControls
const controls = new OrbitControls(camera, renderer.domElement);
// 如果OrbitControls改变了相机参数，重新调用渲染器渲染三维场景
controls.addEventListener("change", function () {
  renderer.render(scene, camera);
});

// onresize 事件会在窗口被调整大小时发生
window.onresize = function () {
  // 重置渲染器输出画布canvas尺寸
  renderer.setSize(window.innerWidth, window.innerHeight);
  // 全屏情况下：设置观察范围长宽比aspect为窗口宽高比
  camera.aspect = window.innerWidth / window.innerHeight;
  // 渲染器执行render方法的时候会读取相机对象的投影矩阵属性projectionMatrix
  // 但是不会每渲染一帧，就通过相机的属性计算投影矩阵(节约计算资源)
  // 如果相机的一些属性发生了变化，需要执行updateProjectionMatrix ()方法更新相机的投影矩阵
  camera.updateProjectionMatrix();
};
