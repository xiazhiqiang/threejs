import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

export async function loadModel(sourceUrl) {
  return new Promise((resolve, reject) => {
    const loader = new GLTFLoader();
    loader.load(
      sourceUrl,
      function (gltf) {
        resolve(gltf);
      },
      undefined,
      function (error) {
        reject(error);
      }
    );
  });
}
