import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

const scene = new THREE.Scene();

// 添加辅助线
const axesHelper = new THREE.AxesHelper(1000);
scene.add(axesHelper);

const group = new THREE.Group();
scene.add(group);

const geometry1 = new THREE.BoxGeometry(100, 100, 100);
geometry1.center(); // 中心点居中，回到坐标原点
const material = new THREE.MeshBasicMaterial({
  color: "#0ff",
  transparent: true,
  opacity: 0.8,
  side: THREE.DoubleSide,
});
const geometry2 = new THREE.SphereGeometry(50, 50, 50);
const mesh1 = new THREE.Mesh(geometry1, material);
const mesh2 = new THREE.Mesh(geometry2, material);
mesh1.position.set(0, 0, 0);
mesh2.position.set(0, 0, 100);
mesh1.rotateY(90);

mesh1.add(mesh2); // 在一个物体添加子物体后，子物体的position会根据父物体的位置来展现
// console.log("mesh1 children", mesh1);
group.add(mesh1);

// 获取世界坐标
console.log(
  "mesh2 world position",
  mesh2.getWorldPosition(new THREE.Vector3())
);

// 给mesh1天假局部坐标
const axesHelper2 = new THREE.AxesHelper(200);
mesh1.add(axesHelper2);

mesh1.traverse((obj) => {
  if (obj.type === "Mesh") {
    obj.material.color.set("#ff0");
  }
});

// 隐藏物体
// mesh1.visible = false;
// group.add(mesh1, mesh2);
// group.translateY(50);
// console.log("group children", group.children);

const camera = new THREE.PerspectiveCamera(
  90,
  window.innerWidth / window.innerHeight,
  0.1,
  2000
);
camera.up.x = 0;
camera.up.y = 0;
camera.up.z = 1; // z轴朝上
camera.position.set(500, -500, 500);
camera.lookAt(0, 0, 0);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.render(scene, camera);
document.getElementById("webgl").appendChild(renderer.domElement);

// 设置相机控件
const controls = new OrbitControls(camera, renderer.domElement);
controls.addEventListener("change", function () {
  renderer.render(scene, camera);
});
