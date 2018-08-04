import cax from './libs/cax'
import Bullet from './bullet'
import Music from './music'

const info = wx.getSystemInfoSync()
const screenWidth = info.windowWidth
const screenHeight = info.windowHeight
const initX = screenWidth / 2
const initY = screenHeight / 7 * 3

// 玩家相关常量设置
const PLAYER_IMG_PREFIX = 'images/stone_'
const IMG_WIDTH = 64
const IMG_HEIGHT = 64

export default class Stone extends cax.Group {
  constructor (ctx) {
    super()
    this.music = new Music()
		var index = Math.ceil(Math.random() * 10000) % 3
    this.bitmap = new cax.Bitmap(PLAYER_IMG_PREFIX + index + ".png")
    this.bitmap.initX = IMG_WIDTH / 2
    this.bitmap.initY = IMG_HEIGHT / 2
		this.width = IMG_WIDTH / 2
		this.height = IMG_WIDTH / 2

    this.add(this.bitmap)
    this.scaleX = this.scaleY = 0.5
		this.x = -100
    this.y = -100
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
		this.alpah = 0
  }
	
	setInitPoint(point) {
		this.vertex = point
		this.x = point[0] - this.width / 2
		this.y = point[1]
		this.initPoint = [this.x, this.y]
	}
	
	shoot () {
		if (this.x - this.initPoint[0] == 0 &&
				this.y - this.initPoint[1] == 0) {
			return false
		}
		this.isShoot = true
		
		if (this.shootAngle == 0) {
			var x = Math.max(0, Math.min(screenWidth, this.x));
			var y = Math.max(0, Math.min(screenHeight, this.y));
			var theta = Math.atan((this.vertex[1] - y) / (this.vertex[0] - x))
			this.speedRatio = Math.pow(Math.pow(this.vertex[1] - y, 2) + Math.pow(this.vertex[0] - x, 2), 0.5) / (screenHeight - initY) + 0.2
			this.rotationDeltaWhenFlying = 1
			//Range compensation
			if (initX - x < 0) {
				theta = Math.PI + theta
				this.rotationDeltaWhenFlying = -1
			}
			this.shootAngle = theta
		}
		return true
	}
	
	destroyIfNeeded () {
		var destroyPadding = 100
		if (this.isShoot) {
	    if (this.y > (screenHeight + destroyPadding) ||
					this.x > (screenWidth + destroyPadding) ||
				  this.x < -destroyPadding || this.y < -destroyPadding) {
	      this.destroy()
	    }
		}
	}

  update () {
    this.currentTime = Date.now()
    if (this.currentTime - this.preShootTime > 200) {
      this.preShootTime = this.currentTime
    }
			
		if (this.isShoot) {			
			this.frames += 1
			var seconds = this.frames / 60
			var speed = 16 * this.speedRatio
			var gravity = 10
			this.speedX = Math.cos(this.shootAngle) * speed
			this.speedY = Math.sin(this.shootAngle) * speed
			this.x += this.speedX
      this.y += (this.speedY + (gravity * seconds))
			this.rotation += this.rotationDeltaWhenFlying
		}
		
		this.destroyIfNeeded()
  }
	
  isCollideWith (sp) {
    let spX = sp.x + sp.width
    let spY = sp.y + sp.height

		if (this.x <= spX &&
				this.x + this.width >= sp.x &&
				this.y <= spY &&
				this.y + this.height >= sp.y) {
					return true
		}
		return false
  }
	
	pointLeft () {
		return [this.x + 5, this.y + this.height / 2]
	}
	
	pointRight () {
		return [this.x + this.width - 5, this.y + this.height / 2]
	}
}
