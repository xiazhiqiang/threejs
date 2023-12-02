import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

// 引入CSS2渲染器CSS2DRenderer和CSS2模型对象CSS2DObject
import {
  CSS2DRenderer,
  CSS2DObject,
} from "three/addons/renderers/CSS2DRenderer.js";

const scene = new THREE.Scene();

// 坐标轴观察器
const axesHelper = new THREE.AxesHelper(100);
scene.add(axesHelper);

// const group = new THREE.Group();
// scene.add(group);

const geometry = new THREE.BoxGeometry(10, 10, 10);
const material = new THREE.MeshBasicMaterial({
  color: "#0ff",
  transparent: true,
  opacity: 0.8,
  side: THREE.DoubleSide,
});
const mesh = new THREE.Mesh(geometry, material);
mesh.position.set(0, 0, 0);
scene.add(mesh);

const camera = new THREE.PerspectiveCamera(
  90,
  window.innerWidth / window.innerHeight,
  0.1,
  2000
);
camera.up.set(0, 0, 1);
camera.position.set(20, -20, 20);
camera.lookAt(0, 0, 0);

// 渲染器
const renderer = new THREE.WebGLRenderer();
renderer.setClearColor("#000");
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.domElement.style.zIndex = 1;
document.getElementById("webgl").appendChild(renderer.domElement);
renderer.render(scene, camera);

// 设置相机控件
const controls = new OrbitControls(camera, renderer.domElement);
controls.update();
// 如果有循环渲染，相机控制器就不需要监听change了，
controls.addEventListener("change", function () {
  renderer.render(scene, camera);
});

const dom = document.createElement("div");
dom.id = "tag";
// dom.innerHTML = "标签内容";
// dom.style.top = 0;
dom.style.color = "white";
document.body.appendChild(dom);

const tag = new CSS2DObject(dom);
tag.position.set(5, 5, 5);
// group.add(tag);
mesh.add(tag);

// web渲染器
const css2Renderer = new CSS2DRenderer();
// 解决鼠标遮挡问题
css2Renderer.domElement.style.pointerEvents = "none";
css2Renderer.domElement.style.zIndex = 2;
document.body.appendChild(css2Renderer.domElement);
css2Renderer.render(scene, camera);
