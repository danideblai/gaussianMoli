import * as THREE from './three.module.min.js';
import { PLYLoader } from './PLYLoader.js';

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x111111);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
camera.position.z = 3;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const loader = new PLYLoader();
loader.load('./models/Moli02.ply', geometry => {
  geometry.computeVertexNormals();
  const material = new THREE.PointsMaterial({ size: 0.01, vertexColors: true });
  const mesh = new THREE.Points(geometry, material);
  scene.add(mesh);
});

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();