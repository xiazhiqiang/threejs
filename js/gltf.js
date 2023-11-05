import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

const scene = new THREE.Scene();

// 坐标轴观察器
const axesHelper = new THREE.AxesHelper(100);
scene.add(axesHelper);

// 添加环境光源
const ambientLight = new THREE.AmbientLight("#fff", 1);
ambientLight.position.set(0, 0, 0);
scene.add(ambientLight);

const camera = new THREE.PerspectiveCamera(
  90,
  window.innerWidth / window.innerHeight,
  0.1,
  2000
);
camera.position.set(10, 10, 10);
camera.lookAt(0, 0, 0);

const renderer = new THREE.WebGLRenderer({
  antialias: true,
});
renderer.setClearColor("#000");
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.render(scene, camera);
document.getElementById("webgl").appendChild(renderer.domElement);

// 添加
const controls = new OrbitControls(camera, renderer.domElement);
controls.addEventListener("change", function () {
  renderer.render(scene, camera);
});

const loader = new GLTFLoader();
loader.load("/gltf/J16.gltf", function (gltf) {
  // console.log("控制台查看加载gltf文件返回的对象结构", gltf);
  // console.log("gltf对象场景属性", gltf.scene);
  // 返回的场景对象gltf.scene插入到threejs场景中
  console.log("gltf scene", gltf.scene);
  scene.add(gltf.scene);

  gltf.scene.traverse((obj) => {
    if (obj.type === "Mesh") {
      obj.material.color.set("#0ff");
    }
  });
  renderer.render(scene, camera);
});

function animate() {
  renderer.render(scene, camera);
  requestAnimationFrame();
}
animate();
