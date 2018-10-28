const canvasSketch = require('canvas-sketch');
const { lerp } = require('canvas-sketch-util/math');
const random = require('canvas-sketch-util/random');
const palettes = require('nice-color-palettes/1000.json');

random.setSeed(random.getRandomSeed())

const settings = {
  dimensions: [ 2048, 2048 ],
  suffix: random.getSeed(),
};


const sketch = ({ width, height }) => {
  const count = random.rangeFloor(10, 40);
  const margin = width * 0.15;
  const maxColors = random.rangeFloor(4, 6);
  const fontFamily = '"Andale Mono"';
  const palette = random.shuffle(random.pick(palettes)).slice(0, maxColors);
  // const background = 'hsl(0, 0%, 94%)';
  const background = palette.shift();
  // const characters = '△◁▷▽'.split('');
  // const characters = ['joe', 'dan', 'win', 'bub']
  const characters = ['=']

  const createGrid = () => {
    const points = [];
    const frequency = random.range(0.75, 1.25);

    for (let x = 0; x < count; x++) {
      for (let y = 0; y < count; y++) {
        let u = x / (count - 1);
        let v = y / (count - 1);

        const [ dx, dy ] = random.insideSphere(0.05);
        u += dx;
        v += dy;

        const n = random.noise2D(u * frequency, v * frequency);
        const size = n * 0.5 + 1;
        const baseSize = width * 0.05;
        const sizeOffset = width * 0.05;

        points.push({
          color: random.pick(palette),
          size: Math.abs(baseSize * size + random.gaussian() * sizeOffset),
          rotation: n * Math.PI * 0.5,
          character: random.pick(characters),
          position: [ u, v ]
        });
      }
    }
    return points;
  };

  const grid = createGrid();

  return ({ context, width, height }) => {
    context.fillStyle = background;
    context.fillRect(0, 0, width, height);

    grid.forEach(({ position, rotation, size, color, character }, index) => {
      const [ u, v ] = position;
      const x = lerp(margin, width - margin, u);
      const y = lerp(margin, height - margin, v);
      context.fillStyle = context.strokeStyle = color;
      context.textAlign = 'center';
      context.textBaseline = 'middle';
      context.font = `${size}px ${fontFamily}`;

      if (index > grid.length / 2 && index < grid.length / 2 + 3) {
        const offset = 10 + random.gaussian() * 20 * random.sign()
        context.rect(margin / 2 + offset, margin / 2 + offset, width - margin + offset, height - margin + offset)
        context.strokeStyle = random.pick(palette)
        context.lineWidth = width * 0.001
        context.stroke()
      }
  
      context.save();
      context.translate(x, y);
      context.rotate(rotation);
      context.globalAlpha = 0.85;
      context.fillText(character, 0, 0);
      context.restore();
    });
  };
};

canvasSketch(sketch, settings);