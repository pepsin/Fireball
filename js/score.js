import cax from './libs/cax'

const NUMBER_IMG_PREFIX = 'images/numbers/score/'

const SCALE_RATIO = 0.5

const info = wx.getSystemInfoSync()
const screenWidth = info.windowWidth
const screenHeight = info.windowHeight

//number info
const numSizes = {
	"0": [30, 38],
	"1": [20, 38],
	"2": [26, 36],
	"3": [26, 36],
	"4": [30, 38],
	"5": [28, 40],
	"6": [28, 40],
	"7": [30, 38],
	"8": [28, 38],
	"9": [28, 38]
}

export default class Score extends cax.Group {
  constructor (num) {
    super()
		this.num = num
		this.bitmaps = []
  }
		
	updateBitmaps() {
		for (var i = 0; i < this.bitmaps.length; i++) {
			this.bitmaps[i].destroy()
		}
		this.bitmaps = []
		
		let numStr = "" + this.num
		var width = 0
		var height = 0
		var ratio = SCALE_RATIO
		for (var i = 0; i < numStr.length; i++) {
			let n = numStr[i]
			var size = numSizes[n]
			size = [size[0] * ratio, size[1] * ratio]
			let bitmap = new cax.Bitmap(NUMBER_IMG_PREFIX + n + ".png")
			var padding = 1
			if (i == 0) {
				padding = 0
			}
			bitmap.x = width + size[0]
			bitmap.y = 0
			this.add(bitmap)
			width += (size[0] + padding)
			height = Math.max(size[1], height)
			bitmap.scaleX = ratio
			bitmap.scaleY = ratio
			this.bitmaps.push(bitmap)
		}
		
		this.width = width
		this.height = height
		this.x = 0
		this.y = info.statusBarHeight
	}
	
	setScore(num) {
		if (num == this.num) {
			return
		}
		this.num = num
		this.updateBitmaps()
	}
}
