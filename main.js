
import { initViewer } from './viewer-final.js';

window.addEventListener('DOMContentLoaded', async () => {
  await initViewer({
    modelUrl: 'https://drive.google.com/uc?export=download&id=1RXHBdJ05_OVYIuCqjRd9QhMUMhUONT8Z'
  });
});
