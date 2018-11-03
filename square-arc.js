const canvasSketch = require('canvas-sketch');
const { math, random } = require('canvas-sketch-util')
const palettes = require('nice-color-palettes')
const color = require('color')

random.setSeed(random.getRandomSeed())

const settings = {
  // dimensions: [ 2048, 2048 ],
  suffix: random.getSeed(),
}

const count = 100

const getGridInfo = ({ count, width, height }) => {
  const size = width / count
  const grid = []
  const palette = random.shuffle(random.pick(palettes))

  for (let x = 0; x < count; x++) {
    for (let y = 0; y < count; y++) {
      grid.push({
        x: x * size,
        y: y * size,
        size,
        palette,
      })
    }
  }

  return grid
}

const sketch = () => {
  return ({ context: ctx, width, height }) => {
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, width, height);
    
    const squares = getGridInfo({ count, width, height })
    
    squares.forEach((i, index) => {
      const {x, y, size, palette} = i
      const colorIndex = Math.floor(random.range(0, palette.length))
      const linewidth = Math.max(width / count * 0.025, 1)
      const u = random.sign() === 1 ? x : x + size
      const v = random.sign() === 1 ? y : y + size
      let rotation = null
      if (u === x) {
        if (v === y) {
          rotation = 0
        } else {
          rotation = 270
        }
      } else {
        if (v === y) {
          rotation = 90
        } else {
          rotation = 180
        }
      }
      
      ctx.fillStyle = palette[colorIndex]
      ctx.strokeStyle = palette[(colorIndex + 1) % palette.length]
      ctx.lineWidth = linewidth
      ctx.beginPath()
      ctx.rect(x, y, size, size)
      ctx.fill()
      ctx.closePath()

      ctx.beginPath()
      ctx.moveTo(u, v)
      ctx.arc(u, v, size * 0.95, math.degToRad(rotation), math.degToRad(rotation + 90), false)
      ctx.closePath()
      const gradient = ctx.createRadialGradient(u, v, 0, u, v, size)
      gradient.addColorStop(0.5, palette[(colorIndex + 2) % palette.length])
      gradient.addColorStop(0.8, color(palette[(colorIndex + 2) % palette.length]).darken(0.75))
      gradient.addColorStop(1, color(palette[(colorIndex + 2) % palette.length]).darken(0.75))
      ctx.fillStyle = gradient
      ctx.fill()

      ctx.beginPath()
      ctx.rect(x + linewidth / 2, y + linewidth / 2, size - linewidth, size - linewidth)
      ctx.stroke()
      ctx.closePath()

    })
  };
};

canvasSketch(sketch, settings);
