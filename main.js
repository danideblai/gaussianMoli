
import { initViewer } from './viewer-final.js';

window.addEventListener('DOMContentLoaded', async () => {
  await initViewer({
    modelPath: 'Moli02.ply',
    cameraCsvPath: 'realitymoli.csv'
  });
});
