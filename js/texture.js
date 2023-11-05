import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

const scene = new THREE.Scene();

// 坐标
const axesHelper = new THREE.AxesHelper(100);
scene.add(axesHelper);

// 添加一个辅助网格地面
const gridHelper = new THREE.GridHelper(300, 25, 0x004444, 0x004444);
scene.add(gridHelper);

// 平面
const geometry = new THREE.PlaneGeometry(200, 200);
console.log("uv", geometry.attributes.uv);

// 创建纹理加载器
const textLoader = new THREE.TextureLoader();
const texture = textLoader.load("/img/OIP.jpeg");

// 设置阵列模式
texture.wrapS = THREE.RepeatWrapping;
texture.wrapT = THREE.RepeatWrapping;
// uv两个方向纹理重复数量
texture.repeat.set(5, 5); //注意选择合适的阵列数量

const material = new THREE.MeshBasicMaterial({
  // color: "#ff0",
  transparent: true,
  opacity: 0.8,
  map: texture,
  side: THREE.DoubleSide,
});
const mesh = new THREE.Mesh(geometry, material);
mesh.rotateX(Math.PI / 2);
mesh.position.set(0, 50, 0);
scene.add(mesh);

const camera = new THREE.PerspectiveCamera(
  90,
  window.innerWidth / window.innerHeight,
  0.1,
  2000
);
camera.position.set(100, -100, 100);
camera.up.x = 0;
camera.up.y = 0;
camera.up.z = 1;
camera.lookAt(0, 0, 0);

const renderer = new THREE.WebGLRenderer();
renderer.setClearColor("#000");
renderer.setSize(window.innerWidth, window.innerHeight);
// renderer.render(scene, camera);
document.getElementById("webgl").appendChild(renderer.domElement);

// 设置相机控件
const controls = new OrbitControls(camera, renderer.domElement);
// 如果有循环渲染，相机控制器就不需要监听change了，
controls.addEventListener("change", function () {
  renderer.render(scene, camera);
});

function render() {
  texture.offset.x += 0.001;
  renderer.render(scene, camera);
  requestAnimationFrame(render);
}
render();
