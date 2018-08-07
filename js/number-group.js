import cax from './libs/cax'
import Number from './number'

const info = wx.getSystemInfoSync()
const screenWidth = info.windowWidth
const screenHeight = info.windowHeight

export default class NumberGroup extends cax.Group {
  constructor () {
    super()
  }
	
	generate(enemy, score) {
			var number = new Number(score)
			number.x = enemy.x
			number.y = enemy.y
			this.add(number)
	}
	
	update() {
    this.children.forEach(child => {
      child.update()
			if (child.alpha <= 0) {
				child.destroy()
			}
    })
	}
}
