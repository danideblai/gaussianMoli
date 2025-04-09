
import { initViewer } from './viewer-final.js?v=3';

window.addEventListener('DOMContentLoaded', async () => {
  await initViewer({
    modelPath: 'Moli02.ply',
    cameraCsvPath: 'realitymoli.csv'
  });
});
