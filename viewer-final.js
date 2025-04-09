
import * as THREE from './three.module.js';
import { PLYLoader } from './PLYLoader.js';

export async function initViewer({ modelUrl }) {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  const controlsScript = await import('./OrbitControls.js');
  const controls = new controlsScript.OrbitControls(camera, renderer.domElement);

  const loader = new PLYLoader();
  loader.load(modelUrl, geometry => {
    geometry.computeVertexNormals();
    const material = new THREE.MeshStandardMaterial({ color: 0xcccccc, flatShading: true });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);
    camera.position.z = 2;
    animate();
  });

  const light = new THREE.DirectionalLight(0xffffff, 1);
  light.position.set(5, 5, 5);
  scene.add(light);

  function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
  }
}
