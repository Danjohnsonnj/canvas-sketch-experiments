const canvasSketch = require('canvas-sketch');
const { lerp } = require('canvas-sketch-util/math');
const { random, math } = require('canvas-sketch-util');
const palettes = require('nice-color-palettes/1000.json');

random.setSeed(random.getRandomSeed())

const settings = {
  dimensions: [ 2048, 2048 ],
  suffix: random.getSeed(),
};


const sketch = ({ width, height }) => {
  const count = 10;
  const margin = width * 0.15;
  const fontFamily = '"Andale Mono"';
  const pickedPalette = random.pick(palettes)
  const palette = random.shuffle(pickedPalette).slice(0, pickedPalette.length - 1);
  const background = palette.shift();
  const characters = ['=']

  const createGrid = () => {
    const points = [];

    for (let x = 0; x < count; x++) {
      for (let y = 0; y < count; y++) {
        let u = x / (count - 1);
        let v = y / (count - 1);

        const size = 1
        const baseSize = width * 0.05;

        points.push({
          color: random.pick(palette),
          size: Math.abs(size * baseSize),
          rotation: math.degToRad(15),
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

      if (index === Math.floor(grid.length / 2)) {
        context.rect(margin / 2, margin / 2, width - margin, height - margin)
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