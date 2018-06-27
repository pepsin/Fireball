import cax from './libs/cax'
import Bullet from './bullet'
import Music from './music'

const info = wx.getSystemInfoSync()
const screenWidth = info.windowWidth
const screenHeight = info.windowHeight

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

    this.add(this.bitmap)
    this.x = screenWidth / 2
    this.y = screenHeight - 120

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
		this.shootAngle = 0
		this.speedY = 0
		this.speedX = 0
		this.frames = 0
	}

  update () {
    this.currentTime = Date.now()
    if (this.currentTime - this.preShootTime > 200) {
      this.preShootTime = this.currentTime
    }
			
		if (this.isShoot) {
			if (this.shootAngle == 0) {
				var originX = screenWidth / 2
				var originY = screenHeight - 120
				var theta = Math.atan((originY - this.y) / (originX - this.x))
				this.rotationDeltaWhenFlying = 1
				//Range compensation
				if (originX - this.x < 0) {
					theta = Math.PI + theta
					this.rotationDeltaWhenFlying = -1
				}
				this.shootAngle = theta
			}
			
			this.frames += 1
			var seconds = this.frames / 60
			var speed = 14
			var gravity = 10
			this.speedX = Math.cos(this.shootAngle) * speed
			this.speedY = Math.sin(this.shootAngle) * speed
			this.x += this.speedX
      this.y += (this.speedY + (gravity * seconds))
			this.rotation += this.rotationDeltaWhenFlying
		}
		
    if (this.y > screenHeight ||
				this.x > screenWidth ||
			  this.x < 0) {
      this.destroy()
    }
  }

  isCollideWith (sp) {
    let spX = sp.x + sp.width / 2
    let spY = sp.y + sp.height / 2

    return !!(spX >= this.x &&
            spX <= this.x + this.width &&
            spY >= this.y &&
            spY <= this.y + this.height)
  }
}