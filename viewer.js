
export class GaussianSplatViewer {
  constructor({ container, plyUrl, cameraUrl }) {
    this.container = container;
    this.plyUrl = plyUrl;
    this.cameraUrl = cameraUrl;
  }

  load() {
    const message = document.createElement('div');
    message.innerText = 'Aquí iría el visor WebGL de Gaussian Splatting';
    message.style = 'color: white; background: black; font-size: 2em; padding: 2em;';
    this.container.appendChild(message);
  }
}
