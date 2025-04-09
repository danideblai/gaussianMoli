// Crear la escena
const scene = new THREE.Scene();

// Configurar la cámara (perspectiva) con fov 75°, proporción de aspecto de la ventana, y planos de recorte cercanos/lejanos
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
// Posicionar la cámara a cierta distancia para ver el modelo. 
camera.position.set(0, 0, 5);  // (x=0, y=0, z=5) - se puede ajustar según el tamaño del modelo

// Crear el renderizador y añadir el lienzo al documento
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Agregar controles de órbita para permitir rotar/hacer zoom con el mouse
const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;  // (opcional) suaviza el movimiento de la cámara
controls.target.set(0, 0, 0);   // Apuntar la cámara al origen (centro de la escena)
controls.update();

// Añadir iluminación básica (luz direccional y luz ambiental) para ver modelos sin color propio
const luzDireccional = new THREE.DirectionalLight(0xffffff, 0.8);
luzDireccional.position.set(1, 1, 1);  // posicionar la luz
scene.add(luzDireccional);
scene.add(new THREE.AmbientLight(0xffffff, 0.5));  // luz ambiental suave

// Cargar el modelo PLY
const loader = new THREE.PLYLoader();
loader.load('models/Moli02.ply', function (geometry) {
  // Callback cuando el archivo se haya cargado
  geometry.computeVertexNormals();  // calcular normales para iluminación correcta

  // Elegir material: si el PLY tiene colores por vértice, usarlos; si no, un color gris
  let material;
  if (geometry.hasAttribute('color')) {
    material = new THREE.PointsMaterial({ vertexColors: true, size: 0.005 }); 
    // ^ Si es nube de puntos (splat), usamos PointsMaterial. 
    // En caso de malla (faces), usar MeshStandardMaterial:
    // material = new THREE.MeshStandardMaterial({ vertexColors: true });
  } else {
    material = new THREE.MeshStandardMaterial({ color: 0xaaaaaa });
  }

  // Crear el objeto 3D (malla o nube de puntos) con la geometría y el material
  let object3D;
  if (material instanceof THREE.PointsMaterial) {
    object3D = new THREE.Points(geometry, material);
  } else {
    object3D = new THREE.Mesh(geometry, material);
  }

  // Opcional: centrar el modelo en la escena
  geometry.computeBoundingBox();
  const center = new THREE.Vector3();
  geometry.boundingBox.getCenter(center);
  object3D.position.x -= center.x;
  object3D.position.y -= center.y;
  object3D.position.z -= center.z;

  // Opcional: ajustar la cámara para encuadrar el modelo
  geometry.computeBoundingSphere();
  const radius = geometry.boundingSphere.radius;
  camera.position.set(0, 0, radius * 2.5);      // alejar la cámara según el tamaño del modelo
  camera.near = radius / 10;
  camera.far = radius * 10;
  camera.updateProjectionMatrix();
  controls.update();

  // Agregar el modelo cargado a la escena
  scene.add(object3D);
},
// Función de progreso (opcional)
(xhr) => {
  console.log((xhr.loaded / xhr.total * 100) + '% cargado');
},
// Función de manejo de errores (opcional)
(error) => {
  console.error('Error al cargar el modelo PLY:', error);
});

// Función de animación para renderizar la escena en cada frame
function animate() {
  requestAnimationFrame(animate);
  controls.update();             // actualizar controles (necesario si enableDamping está activado)
  renderer.render(scene, camera); // dibujar la escena
}
animate();

// Ajustar el renderizador y la cámara al cambiar el tamaño de la ventana
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
