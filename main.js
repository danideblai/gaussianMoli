// Crear la escena
const scene = new THREE.Scene();

// Configurar la cámara (Perspectiva) 
const camera = new THREE.PerspectiveCamera(
  60,                                     // campo de visión (FOV) en grados
  window.innerWidth / window.innerHeight, // relación de aspecto del canvas
  0.1,                                    // plano cercano de recorte
  1000                                    // plano lejano de recorte
);
// Posicionar la cámara un poco alejada para empezar
camera.position.set(0, 0, 10);

// Crear el renderizador WebGL y añadirlo al documento
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Habilitar controles orbitales para mover la cámara con el ratón
const controls = new THREE.OrbitControls(camera, renderer.domElement);
// (Opcional: controls.target por defecto es (0,0,0), se ajustará más abajo tras cargar el modelo)

// Añadir una luz para iluminar el modelo (luz ambiental y direccional)
const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);   // luz suave ambiental
scene.add(ambientLight);
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8); // luz direccional
directionalLight.position.set(10, 10, 10);  // posicionarla en diagonal arriba
scene.add(directionalLight);

// Cargar el archivo PLY
const loader = new THREE.PLYLoader();
loader.load('models/Moli02.ply', function (geometry) {
  // Este callback se ejecuta cuando el archivo PLY se ha cargado

  // Si el PLY no tiene normales, las calculamos para mejorar la iluminación
  if (geometry.index !== null) {
    geometry.computeVertexNormals();
  }

  // Determinar si el modelo tiene colores por vértice
  const hasVertexColors = geometry.hasAttribute('color');

  // Crear un material según el tipo de geometría
  let object;
  if (geometry.index === null) {
    // Si no hay índice, asumimos que es una nube de puntos
    const pointMaterial = new THREE.PointsMaterial({
      size: 1.0,                           // tamaño de cada punto (en píxeles)
      vertexColors: hasVertexColors,       // usar color de vértices si está presente
      color: hasVertexColors ? 0xffffff : 0xcccccc  // blanco si hay colores, gris claro si no
    });
    object = new THREE.Points(geometry, pointMaterial);
  } else {
    // Si hay índice, es una malla con caras
    const meshMaterial = new THREE.MeshStandardMaterial({
      vertexColors: hasVertexColors,      // aplica colores de vértice si existen
      color: hasVertexColors ? 0xffffff : 0xcccccc  // color base (blanco para ver colores reales)
    });
    object = new THREE.Mesh(geometry, meshMaterial);
  }

  // Añadir el modelo a la escena
  scene.add(object);

  // Opcional: centrar la cámara y controles respecto al modelo cargado
  geometry.computeBoundingSphere();                  // calcular esfera envolvente del modelo
  if (geometry.boundingSphere) {
    const center = geometry.boundingSphere.center;
    const radius = geometry.boundingSphere.radius;
    // Posicionar la cámara a una distancia adecuada (2 radios) desde el centro del modelo
    camera.position.set(center.x + radius*2, center.y + radius*2, center.z + radius*2);
    camera.lookAt(center);
    controls.target.copy(center);  // orbitar alrededor del centro del modelo
    controls.update();
  }
}, undefined, function (error) {
  console.error('Error al cargar el modelo PLY:', error);
});

// Función de animación (renderizado en bucle)
function animate() {
  requestAnimationFrame(animate);
  controls.update();             // actualizar controles (necesario si damping/inercia)
  renderer.render(scene, camera); 
}
animate();

// Ajustar el renderizador y la cámara si la ventana cambia de tamaño
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
