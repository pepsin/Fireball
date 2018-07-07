import cax from './libs/cax'
import Flower from './flower'

const info = wx.getSystemInfoSync()
const screenWidth = info.windowWidth
const screenHeight = info.windowHeight

export default class FlowerGroup extends cax.Group {
  constructor () {
    super()
  }
	
	generateAll() {
		for (var i = 0; i < 4; i++) {
	    const e = new Flower()
	    e.x = screenWidth / 4 * i
	    e.y = screenHeight - 128
	    this.add(e)
		}
	}
	
	animateAll() {
		this.children.forEach(flower => {
			flower.animate()
		})
	}

  generate () {
    
  }
}
