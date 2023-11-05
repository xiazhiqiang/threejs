import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

const scene = new THREE.Scene();

// 添加辅助
const axesHelper = new THREE.AxesHelper(500);
scene.add(axesHelper);

// 空几何体
const geometry = new THREE.BufferGeometry();

const vertices = new Float32Array([
  0,
  0,
  0, //顶点1坐标
  50,
  0,
  0, //顶点2坐标
  0,
  100,
  0, //顶点3坐标
  0,
  0,
  10, //顶点4坐标
  0,
  0,
  100, //顶点5坐标
  50,
  0,
  10, //顶点6坐标
]);
const attributes = new THREE.BufferAttribute(vertices, 3);
geometry.attributes.position = attributes;

// 点材质
const pointMaterial = new THREE.PointsMaterial({
  color: "#ff0",
  size: 0.1, //点对象像素尺寸
});
// 点模型
const pointMesh = new THREE.Points(geometry, pointMaterial);
scene.add(pointMesh);

// 线材质
const lineMaterial = new THREE.LineBasicMaterial({
  color: "#0ff",
});
// 线模型 Line，LineLoop（闭合线），LineSegment（非闭合线）
const lineMesh = new THREE.LineLoop(geometry, lineMaterial);
scene.add(lineMesh);

// 自定义平面矩形，注意保持一个方向上点的顺序，要么都是顺时针，要么都是逆时针，否则会出现正反面情况
const vertices2 = new Float32Array([
  0,
  0,
  0, //顶点1坐标
  80,
  0,
  0, //顶点2坐标
  80,
  80,
  0, //顶点3坐标

  0,
  0,
  0, //顶点4坐标   和顶点1位置相同
  80,
  80,
  0, //顶点5坐标  和顶点3位置相同
  0,
  80,
  0, //顶点6坐标
]);
const attributes2 = new THREE.BufferAttribute(vertices2, 3);
const geometry2 = new THREE.BufferGeometry();
geometry2.attributes.position = attributes2;
const sideMaterial = new THREE.MeshBasicMaterial({
  color: "yellow",
  wireframe: true, //线条模式渲染mesh对应的三角形数据
});
geometry2.center(); // 中心点居中，回到坐标原点
const sideMesh = new THREE.Mesh(geometry2, sideMaterial);
scene.add(sideMesh);

const camera = new THREE.PerspectiveCamera(
  90,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(200, 200, 200);
camera.lookAt(0, 0, 0);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor("#000", 1); //设置背景颜色
renderer.render(scene, camera);
document.getElementById("webgl").appendChild(renderer.domElement);

// 设置相机控件
const controls = new OrbitControls(camera, renderer.domElement);
controls.addEventListener("change", function () {
  renderer.render(scene, camera);
});
