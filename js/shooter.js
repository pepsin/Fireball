import cax from './libs/cax'
import Bullet from './bullet'
import Music from './music'

const info = wx.getSystemInfoSync()
const screenWidth = info.windowWidth
const screenHeight = info.windowHeight
const originX = screenWidth / 2
const originY = screenHeight / 3 * 2

// 玩家相关常量设置
const SHOOTER_IMG = 'images/shooter.png'
const IMG_WIDTH = 301
const IMG_HEIGHT = 194

export default class Shooter extends cax.Group {
  constructor (ctx) {
    super()
    this.music = new Music()
		var index = Math.ceil(Math.random() * 10000) % 3
    this.bitmap = new cax.Bitmap(SHOOTER_IMG)
    this.bitmap.originX = IMG_WIDTH / 2
    this.bitmap.originY = IMG_HEIGHT / 2
		this.width = IMG_WIDTH / 2
		this.height = IMG_WIDTH / 2

    this.add(this.bitmap)
    this.x = originX
    this.y = originY

    this.scaleX = this.scaleY = 0.5

    this.preShootTime = Date.now()
    this.bulletGroup = new cax.Group()
		this.isShoot = false
		this.frames = 0
		this.speedX = 0
		this.speedY = 0
		this.shootAngle = 0
		this.rotationDeltaWhenFlying = 0
		this.combo = 1
		this.speedRatio = 1
  }

  update () {
		var x = Math.max(0, Math.min(screenWidth, this.x));
		var y = Math.max(0, Math.min(screenHeight, this.y));
		var theta = Math.atan((originY - y) / (originX - x))
		console.log(theta / Math.PI / 2)
		if (originX - x < 0) {
			theta = Math.PI - theta
		}
		this.rotation = theta / Math.PI / 2 * 360
  }
	
	follow (stone) {
		this.x = stone.x
		this.y = stone.y
	}
}
