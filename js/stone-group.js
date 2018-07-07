import cax from './libs/cax'
import Stone from './stone'

const info = wx.getSystemInfoSync()
const screenWidth = info.windowWidth
const screenHeight = info.windowHeight

function rnd (start, end) {
  return Math.floor(Math.random() * (end - start) + start)
}

export default class StoneGroup extends cax.Group {
  constructor () {
    super()
		this.current = null
  }

  generate () {
    const p = new Stone()
		this.current = p
    this.add(p)
  }
	
	shoot () {
		if (this.current.shoot()) {
			this.generate()
		}
	}

	updateCurrentPosition (deltaX, deltaY) {
		this.current.x += deltaX
		this.current.y += deltaY
	}
	
  update () {
    this.children.forEach(child => {
      child.update()
    })
  }
}
