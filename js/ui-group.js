import cax from './libs/cax'
import Button from './button'

const info = wx.getSystemInfoSync()
const screenWidth = info.windowWidth
const screenHeight = info.windowHeight

const pauseButton = new Button({
	x: (screenWidth - 44) / 2,
	y: info.statusBarHeight,
  width: 44,
  height: 44,
	borderRadius: 5,
	bgImage: ["images/pause.png", 30, 30]
})

const restartButton = new Button({
	x: (screenWidth - 87) / 2,
	y: (screenHeight - 87) / 2,
  width: 87,
  height: 87,
	borderRadius: 5,
	bgImage: ["images/restart.png", 87, 87]
})
restartButton.visible = false

function rnd (start, end) {
  return Math.floor(Math.random() * (end - start) + start)
}

export default class UIGroup extends cax.Group {
  constructor () {
    super()
    this.add(pauseButton, restartButton)
    this.pauseButton = pauseButton
    this.restartButton = restartButton
  }
	
  passEvent(points) {
  	restartButton.actIfNeeded(points)
    pauseButton.actIfNeeded(points)
  }
}
