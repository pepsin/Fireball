import cax from './libs/cax'

const FLOWER_IMG_PREFIX = 'images/flower_'

const IMG_WIDTH = 265
const IMG_HEIGHT = 311
const SCALE_RATIO = 0.4

const info = wx.getSystemInfoSync()
const screenWidth = info.windowWidth
const screenHeight = info.windowHeight

export default class Flower extends cax.Group {
  constructor (index) {
    super()
    this.bitmap = new cax.Bitmap(FLOWER_IMG_PREFIX + index + ".png")
    this.bitmap.originX = IMG_WIDTH / 2
    this.bitmap.originY = IMG_HEIGHT / 2
    this.add(this.bitmap)
    this.scaleX = this.scaleY = SCALE_RATIO
    this.speed = 1
    this.width = IMG_WIDTH / 2 * SCALE_RATIO
    this.height = IMG_WIDTH / 2 * SCALE_RATIO
  }
	
	catchFire () {
		this.visible = false
		this.destroy()
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
