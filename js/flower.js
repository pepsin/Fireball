import cax from './libs/cax'

const ENEMY_IMG_SRC = 'images/enemy.png'

const IMG_WIDTH = 120
const IMG_HEIGHT = 180

const info = wx.getSystemInfoSync()
const screenWidth = info.windowWidth
const screenHeight = info.windowHeight

export default class Flower extends cax.Group {
  constructor () {
    super()
    this.scaleX = this.scaleY = 0.5
    this.speed = 1
    this.width = IMG_WIDTH / 2
    this.height = IMG_WIDTH / 2
		this.targetX = Math.random() * screenWidth
    this.spriteOption = {
      framerate: 6,
      imgs: [
        'images/flower-1.png',
        'images/flower-2.png',
        'images/flower-3.png'
      ],
      frames: [
        // x, y, width, height, originX, originY ,imageIndex
        [10, 0, 128, 256, 0, 0, 0],
        [10, 0, 128, 256, 0, 0, 1],
        [10, 0, 128, 256, 0, 0, 2]
      ],
      animations: {
        move: {
          frames: [0, 1, 2, 1]
        }
      },
      playOnce: false,
      currentAnimation: 'move'
    }
  }

  animate () {
    const es = new cax.Sprite(this.spriteOption)
    es.x = this.x - 32
    es.y = this.y - 24
    this.parent.parent.add(es)
  }
}
