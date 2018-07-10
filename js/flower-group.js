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
		for (var i = 0; i < 3; i++) {
	    var e = new Flower(i)
	    e.x = screenWidth / 3 * i
	    e.y = screenHeight - e.height
	    this.add(e)
		}
	}
	
	animateAll() {

	}

  generate () {
    
  }
}
