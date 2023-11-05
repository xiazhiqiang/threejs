import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

const scene = new THREE.Scene();

// 坐标线辅助
const axesHelper = new THREE.AxesHelper(100);
scene.add(axesHelper);

// 添加一个辅助网格地面
const gridHelper = new THREE.GridHelper(300, 25, 0x004444, 0x004444);
scene.add(gridHelper);

// 正投相机
const width = window.innerWidth; //canvas画布宽度
const height = window.innerHeight; //canvas画布高度
const k = width / height; //canvas画布宽高比
const s = 200; //控制left, right, top, bottom范围大小
const camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 1, 2000);
camera.position.set(0, -100, 0);
camera.up.set(0, 0, 1);
camera.lookAt(0, 0, 0);

const renderer = new THREE.WebGL1Renderer();
renderer.setClearAlpha("#000");
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById("webgl").appendChild(renderer.domElement);

// 设置相机控件
const controls = new OrbitControls(camera, renderer.domElement);
controls.update();
// 如果有循环渲染，相机控制器就不需要监听change了，
controls.addEventListener("change", function () {
  renderer.render(scene, camera);
});

// 环境光源
const ambientLight = new THREE.AmbientLight();
ambientLight.position.set(0, 0, 0);
scene.add(ambientLight);

// 加载模型
const loader = new GLTFLoader();
loader.load("/gltf/J16.gltf", function (gltf) {
  // console.log("控制台查看加载gltf文件返回的对象结构", gltf);
  // console.log("gltf对象场景属性", gltf.scene);
  // 返回的场景对象gltf.scene插入到threejs场景中
  console.log("gltf scene", gltf.scene);

  // 模型放到8倍
  gltf.scene.scale.set(8, 8, 8);

  // 调整模型旋转
  gltf.scene.rotateZ(Math.PI / 2);
  gltf.scene.rotateX(Math.PI / 2);

  scene.add(gltf.scene);
  renderer.render(scene, camera);
});

// Canvas画布跟随窗口变化
window.onresize = function () {
  const width = window.innerWidth; //canvas画布宽度
  const height = window.innerHeight; //canvas画布高度
  // 1. WebGL渲染器渲染的Cnavas画布尺寸更新
  renderer.setSize(width, height);

  // 2.1.更新相机参数
  const k = width / height; //canvas画布宽高比
  camera.left = -s * k;
  camera.right = s * k;
  // 2.2.相机的left, right, top, bottom属性变化了，通知threejs系统
  camera.updateProjectionMatrix();
};
