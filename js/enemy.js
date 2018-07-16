import cax from './libs/cax'

const ENEMY_IMG_PREFIX = 'images/fire_'

const IMG_WIDTH = 150
const IMG_HEIGHT = 140
const SCALE_RATIO = 0.4

const info = wx.getSystemInfoSync()
const screenWidth = info.windowWidth
const screenHeight = info.windowHeight

export default class Enemy extends cax.Group {
  constructor () {
    super()
		var index = Math.ceil(Math.random() * 10000) % 3
    this.bitmap = new cax.Bitmap(ENEMY_IMG_PREFIX + index + ".png")
    this.bitmap.originX = IMG_WIDTH / 2
    this.bitmap.originY = IMG_HEIGHT / 2
    this.add(this.bitmap)

    this.scaleX = this.scaleY = SCALE_RATIO
    this.speed = 1

    this.width = IMG_WIDTH / 2
    this.height = IMG_WIDTH / 2
		this.targetX = Math.random() * screenWidth
    this.spriteOption = {
      framerate: 20,
      imgs: [
        'images/explosion1.png',
        'images/explosion2.png',
        'images/explosion3.png',
        'images/explosion4.png',
        'images/explosion5.png',
        'images/explosion6.png',
        'images/explosion7.png',
        'images/explosion8.png',
        'images/explosion9.png',
        'images/explosion10.png',
        'images/explosion11.png',
        'images/explosion12.png',
        'images/explosion13.png',
        'images/explosion14.png',
        'images/explosion15.png',
        'images/explosion16.png',
        'images/explosion17.png',
        'images/explosion18.png',
        'images/explosion19.png'
      ],
      frames: [
        // x, y, width, height, originX, originY ,imageIndex
        [0, 0, 64, 48, 0, 0, 0],
        [0, 0, 64, 48, 0, 0, 1],
        [0, 0, 64, 48, 0, 0, 2],
        [0, 0, 64, 48, 0, 0, 3],
        [0, 0, 64, 48, 0, 0, 4],
        [0, 0, 64, 48, 0, 0, 5],
        [0, 0, 64, 48, 0, 0, 6],
        [0, 0, 64, 48, 0, 0, 7],
        [0, 0, 64, 48, 0, 0, 8],
        [0, 0, 64, 48, 0, 0, 9],
        [0, 0, 64, 48, 0, 0, 10],
        [0, 0, 64, 48, 0, 0, 11],
        [0, 0, 64, 48, 0, 0, 12],
        [0, 0, 64, 48, 0, 0, 13],
        [0, 0, 64, 48, 0, 0, 14],
        [0, 0, 64, 48, 0, 0, 15],
        [0, 0, 64, 48, 0, 0, 16],
        [0, 0, 64, 48, 0, 0, 17],
        [0, 0, 64, 48, 0, 0, 18]
      ],
      animations: {
        explode: {
          frames: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18]
        }
      },
      playOnce: true,
      currentAnimation: 'explode'
    }
  }

  explode () {
    this.visible = false
    const es = new cax.Sprite(this.spriteOption)
    es.x = this.x - 32
    es.y = this.y - 24
    this.parent.parent.add(es)
		this.destroy()
  }

  update () {
    this.y += this.speed
		if (this.x < this.targetX) {
			this.x += (this.speed / 2)
			if (this.rotation > -45) {
					this.rotation -= 0.25
			}
		} else {
			this.x -= this.speed / 2
			if (this.rotation < 0) {
				this.rotation += 0.25
			}
		}
    if (this.y > screenHeight) {
			if (this.parent != NULL) {
				this.destroy()
			}
    }
  }
}
