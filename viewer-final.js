
export async function initViewer({ modelPath, cameraCsvPath }) {
  const loading = document.getElementById('loading');
  loading.innerText = 'Cargando modelo: ' + modelPath;

  // Fetch CSV
  const camResponse = await fetch(cameraCsvPath);
  const camText = await camResponse.text();
  const camLines = camText.trim().split('\n');
  const firstCam = camLines[1].split(','); // Skip header

  const position = {
    x: parseFloat(firstCam[1]),
    y: parseFloat(firstCam[2]),
    z: parseFloat(firstCam[3])
  };

  console.log("Cámara inicial desde CSV:", position);

  // Fetch PLY
  const plyResponse = await fetch(modelPath);
  const plyText = await plyResponse.text();
  console.log("Modelo PLY cargado (demo):", plyText.slice(0, 300));

  loading.innerText = 'Modelo cargado. Cámara colocada.';
}

export { initViewer };
