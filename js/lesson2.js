import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

//引入性能监视器stats.js
import Stats from "three/addons/libs/stats.module.js";

// 实践学习一下不同光源和材质对渲染物体的影响，物体动效，窗口变化渲染

const scene = new THREE.Scene();

// 物体
const geometry = new THREE.BoxGeometry(4, 4, 4);
// 漫反射材质
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

// 平行光
const directionalLight = new THREE.DirectionalLight("#0ff", 1);
directionalLight.position.set(0, 2, 4);
directionalLight.target = mesh; // 平行光对准物体照射，默认对准原点
scene.add(directionalLight);
const directionalLightHelper = new THREE.DirectionalLightHelper(
  directionalLight
); // 添加平行光源查看器
scene.add(directionalLightHelper);

// 聚光源
const spotLight = new THREE.SpotLight("#f0f", 1);
spotLight.position.set(0, 0, 10);
scene.add(spotLight);
const spotLightHelper = new THREE.SpotLightHelper(spotLight); // 添加聚光源查看器
scene.add(spotLightHelper);

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

// 渲染器
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.render(scene, camera);
document.getElementById("webgl").appendChild(renderer.domElement);

const stats = new Stats();
stats.setMode(0);
document.body.appendChild(stats.domElement);

// 设置相机控件
const controls = new OrbitControls(camera, renderer.domElement);
// // 如果有循环渲染，相机控制器就不需要监听change了，
// controls.addEventListener("change", function () {
//   renderer.render(scene, camera);
// });

// 动画循环渲染
function render() {
  // 物体旋转
  mesh.rotateY(0.1);

  // 更新性能监视器
  stats.update();

  renderer.render(scene, camera);

  // 帧渲染
  window.requestAnimationFrame(render);
}
render();

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
