const canvasSketch = require('canvas-sketch');
const { math, random } = require('canvas-sketch-util')

const settings = {
  dimensions: [ 2048, 2048 ]
};

const getJitter = (vary) => {
  return random.value() * random.sign() * vary
}

const sketch = () => {
  return ({ context: ctx, width, height }) => {
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, width, height);

    ctx.strokeStyle = 'black'
    ctx.lineWidth = 10
    
    const count = 100
    const varianceFactor = width * 0.001
    ctx.beginPath()
    ctx.moveTo(width / 2 - getJitter(varianceFactor), height)
    for (let i = 1; i <= count; i++) {
      const x = width / 2 - getJitter(varianceFactor)
      const y = height - (height / count) * i
      ctx.lineTo(x, y)
    }
    ctx.stroke()
  };
};

canvasSketch(sketch, settings);
