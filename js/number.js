import cax from './libs/cax'

const NUMBER_IMG_PREFIX = 'images/numbers/'

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

export default class Number extends cax.Group {
  constructor (num) {
    super()
    let numStr = "" + num
		this.bitmaps = []
		var width = 0
		var height = 0
		for (var i = 0; i < numStr.length; i++) {
			let n = numStr[i]
			let size = numSizes[n]
			let bitmap = new cax.Bitmap(NUMBER_IMG_PREFIX + n + ".png")
			var padding = 6
			if (i == 0) {
				padding = 0
			}
			bitmap.originX = size[0] / 2
			bitmap.originY = size[1] / 2
			this.add(bitmap)
			width += (size[0] + padding)
			height = Math.max(size[1], height)
		}
		
		this.width = width 
		this.height = height
  }
}
