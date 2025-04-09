
export async function loadPLYModel(gl, path) {
  const response = await fetch(path);
  if (!response.ok) throw new Error('No se pudo cargar el modelo');
  const data = await response.text();
  // Aquí normalmente se parsea el PLY y se sube a buffers de GPU.
  console.log('PLY cargado (demo):', data.slice(0, 200)); // demo
}
