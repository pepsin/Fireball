import cax from './libs/cax'
import Bullet from './bullet'
import Music from './music'
import Stone from './stone'

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
  }

  update () {
		if (this.stone) {
			this.x = this.stone.x
			this.y = this.stone.y
		}
		var x = Math.max(0, Math.min(screenWidth, this.x));
		var y = Math.max(0, Math.min(screenHeight, this.y));
		var theta = Math.atan((originY - y) / (originX - x))
		if (originX - x == 0) {
			if (originY - y >= 0) {
				theta = Math.PI / 2
			} else {
				theta = 0
			}
		} else {
			if (originX - x > 0) {
					theta = theta + Math.PI
			}
		}
		
		this.rotation = 270 + theta / Math.PI / 2 * 360
  }
	
	follow (stone) {
		this.stone = stone
	}
}
