
import { loadPLYModel } from './utils.js';

window.addEventListener('DOMContentLoaded', () => {
  const canvas = document.createElement('canvas');
  document.body.appendChild(canvas);
  const gl = canvas.getContext('webgl2');

  if (!gl) {
    alert('WebGL2 no soportado en este navegador');
    return;
  }

  // Mostrar un mensaje mientras se carga
  const msg = document.createElement('div');
  msg.innerText = 'Cargando modelo Moli02.ply...';
  msg.style = 'color: white; position: absolute; top: 20px; left: 20px;';
  document.body.appendChild(msg);

  loadPLYModel(gl, 'Moli02.ply').then(() => {
    msg.remove();
    // Aquí iría el render loop real
    const done = document.createElement('div');
    done.innerText = 'Modelo cargado (demo básica)';
    done.style = 'color: white; position: absolute; top: 20px; left: 20px;';
    document.body.appendChild(done);
  });
});
