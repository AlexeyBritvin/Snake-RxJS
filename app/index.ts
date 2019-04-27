import { createCanvasElement } from './src/canvas';
import { direction$ } from './src/direction';

const subscriptions = {
  direction: null
};

const canvas = createCanvasElement();
document.body.appendChild(canvas);

subscriptions.direction = direction$.subscribe();
