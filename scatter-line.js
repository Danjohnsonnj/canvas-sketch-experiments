const canvasSketch = require('canvas-sketch')
const { math, random } = require('canvas-sketch-util')
const palettes = require('nice-color-palettes')

random.setSeed(random.getRandomSeed())

const settings = {
  dimensions: [ 2048, 2048 ],
  suffix: random.getSeed(),
}

const getPointInfo = ({count, width, height, grid }) => {
  const getBounds = () => {
    if (random.chance(0.75)) {
      return {
        left: Math.floor(width / 2) - width / grid,
        right: Math.floor(width / 2) + width / grid,
        top: Math.floor(height / 2) - height / grid,
        bottom: Math.floor(height / 2) + height / grid,  
      }
    }
    const h = random.rangeFloor(grid)
    const v = random.rangeFloor(grid)
    return {
      left: width / grid * (h),
      right: width / grid * (h + 1),
      top: height / grid * (v),
      bottom: height / grid * (v + 1),
    }
  }
  const { left, right, top, bottom } = getBounds()
  const points = Array(count).fill(null).map((i, x) => {

    const n = random.noise1D(x) * 100
    return {
      y: n + random.rangeFloor(bottom, top),
      x: n + random.rangeFloor(left, right),
      alpha: random.value() * 0.75 + 0.25,
      radius: Math.abs(random.gaussian()) * Math.abs(left - right) / Math.pow(grid, 2)
    }
  })
  return points
}

const sketch = (opts) => {  
  const palette = random.shuffle(random.pick(palettes))
  const count = 20
  const grid = 3

  return ({ context: ctx, width, height }) => {
    ctx.fillStyle = palette.shift()
    ctx.fillRect(0, 0, width, height)

    Array(grid*grid).fill(0).filter(g => random.value() > 0.25).forEach(() => {
      const points = getPointInfo({ count, width, height, grid })
      points.forEach(i => {
        const { x, y, radius, alpha } = i
        const blend = random.pick(['multiply', 'screen', 'source-over'])
        ctx.beginPath()
        ctx.globalAlpha = alpha
        ctx.globalCompositeOperation = blend

        ctx.arc(x, y, radius, 0, math.degToRad(360))
        ctx.fillStyle = random.pick(palette)
        ctx.fill()
      })
    })
  }

}

canvasSketch(sketch, settings)
