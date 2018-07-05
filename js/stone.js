import cax from './libs/cax'
import Bullet from './bullet'
import Music from './music'

const info = wx.getSystemInfoSync()
const screenWidth = info.windowWidth
const screenHeight = info.windowHeight
const originX = screenWidth / 2
const originY = screenHeight / 3 * 2

// 玩家相关常量设置
const PLAYER_IMG_SRC = 'images/Fireball-Stone.png'
const IMG_WIDTH = 64
const IMG_HEIGHT = 64

export default class Stone extends cax.Group {
  constructor (ctx) {
    super()
    this.music = new Music()
    this.bitmap = new cax.Bitmap(PLAYER_IMG_SRC)
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
  }
	
	shoot () {
		this.isShoot = true
		console.log("Shoot")
		if (this.shootAngle == 0) {
			var x = Math.max(0, Math.min(screenWidth, this.x));
			var y = Math.max(0, Math.min(screenHeight, this.y));
			var theta = Math.atan((originY - y) / (originX - x))
			this.rotationDeltaWhenFlying = 1
			//Range compensation
			if (originX - x < 0) {
				theta = Math.PI + theta
				this.rotationDeltaWhenFlying = -1
			}
			this.shootAngle = theta
		}
	}
	
	destroyIfNeeded () {
		var destroyPadding = 200
		if (this.isShoot) {
	    if (this.y > (screenHeight + destroyPadding) ||
					this.x > (screenWidth + destroyPadding) ||
				  this.x < -destroyPadding) {
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
			var speed = 16
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
}
