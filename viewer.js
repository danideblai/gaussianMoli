
export class SplatViewer {
  constructor({ container, model, cameras }) {
    this.container = container;
    this.model = model;
    this.cameras = cameras;
  }

  load() {
    const message = document.createElement('div');
    message.innerText = 'Cargando visor real... (aquí iría GLSplatViewer)';
    message.style = 'color: white; background: black; font-size: 2em; padding: 2em;';
    this.container.appendChild(message);

    // Aquí deberías integrar el código real de GLSplatViewer
    // Este es solo un placeholder temporal
  }
}
