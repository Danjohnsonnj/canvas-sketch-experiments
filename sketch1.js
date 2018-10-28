const canvasSketch = require('canvas-sketch');
const { lerp } = require('canvas-sketch-util/math');
const palettes = require('nice-color-palettes/1000.json');
const random = require('canvas-sketch-util/random');

random.setSeed(random.getRandomSeed());
let palette = random.pick(palettes);

palette = random.shuffle(palette);
palette = palette.slice(0, random.rangeFloor(2, palette.length + 1));

const background = palette.shift();

const settings = {
  dimensions: [ 2048, 2048 ]
};

const sketch = () => {
  const count = 20;

  const createGrid = () => {
    const points = [];
    for (let x = 0; x < count; x++) {
      for (let y = 0; y < count; y++) {
        const u = x / (count - 1);
        const v = y / (count - 1);
        const position = [ u, v ];
        points.push({
          color: random.pick(palette),
          radius: Math.abs(random.gaussian()),
          position
        });
      }
    }
    return points;
  };

  let points = createGrid().filter(() => {
    return Math.random() > 0.75;
  });

  points = random.shuffle(points);

  const text = [
    'winnie',
    'bubs',
    'joe',
    'dan',
  ]

  return ({ context, width, height }) => {
    const margin = width * 0.175;

    context.fillStyle = background;
    context.fillRect(0, 0, width, height);

    points.forEach(data => {
      const {
        position,
        radius,
        color
      } = data;
      const x = lerp(margin, width - margin, position[0]);
      const y = lerp(margin, height - margin, position[1]);

      // context.beginPath();
      // context.arc(x, y, radius, 0, Math.PI * 2);
      // context.fillStyle = color;
      // context.fill();
      context.save()
      context.rotate(random.value() * 5 * Math.PI / 180);
      context.font = `${40 + 100 * radius}px Helvetica`
      context.fillStyle = color
      context.fillText(random.pick(text), x, y)

      console.log(random.noise2D(x, y))
      context.restore()
    });
  };
};

canvasSketch(sketch, settings);