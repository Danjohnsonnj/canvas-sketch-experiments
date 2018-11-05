const canvasSketch = require('canvas-sketch');
const { math, random } = require('canvas-sketch-util')

const settings = {
  dimensions: [ 2048, 2048 ]
};

const getJitter = (vary) => {
  return random.value() * random.sign() * vary
}

const shakyLineTo = function({ ctx, end, count = 100, vary }) {
  const start = ctx.currentPosition
  vary = vary || Math.max(Math.abs(start.x - end.x), Math.abs(start.y - end.y), ctx.canvas.width) / 1000

  ctx.beginPath()
  ctx.moveTo(start.x, start.y)
  for (let i = 1; i <= count; i++) {
    const x = (end.x - start.x) / count * i + getJitter(vary)
    const y = (end.y - start.y) / count * i + getJitter(vary)
    ctx.lineTo(start.x + x, start.y + y)
  }
  ctx.stroke()
  ctx.closePath()
  ctx.currentPosition = end
}

const sketch = () => {
  return ({ context: ctx, width, height }) => {
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, width, height);

    ctx.strokeStyle = 'black'
    ctx.lineWidth = 10 
    
    const count = 100
    ctx.currentPosition = {
      x: 100,
      y: 100
    }
    ctx.moveTo(ctx.currentPosition.x, ctx.currentPosition.y)
    shakyLineTo({ ctx, end: { x: width - 100, y: 100 }, count })
    shakyLineTo({ ctx, end: { x: width - 100, y: height - 100 }, count })
    shakyLineTo({ ctx, end: { x: 100, y: height - 100 }, count })
    shakyLineTo({ ctx, end: { x: 100, y: 100 }, count })
  };
};

canvasSketch(sketch, settings);
