const canvasSketch = require('canvas-sketch');

const settings = {
  dimensions: [ 2048, 2048 ]
};

const sketch = () => {
  return ({ context: ctx, width, height }) => {
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, width, height);

    ctx.strokeStyle = 'black'
    ctx.lineWidth = 10

    ctx.beginPath()
    ctx.moveTo(0, 0)
    ctx.arcTo(width / 2, 0, width / 2, height / 2, width * 0.5)
    ctx.arcTo(width / 2, height, 0, height, width * 0.5)
    // ctx.lineTo(0, height)
    ctx.stroke()
    ctx.closePath()

    // ctx.beginPath()
    // ctx.moveTo(100, 100)
    // ctx.lineTo(200, 200)
    // ctx.stroke()
    // ctx.closePath()
  };
};

canvasSketch(sketch, settings);
