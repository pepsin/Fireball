import cax from './js/libs/cax'
import Background from './js/background'
import Stone from './js/stone'
import ShooterSpring from "./js/shooter-spring.js"
import EnemyGroup from './js/enemy-group'
import StoneGroup from './js/stone-group'
import FlowerGroup from './js/flower-group'
import Music from './js/music'
import Flower from './js/flower'
import NumberGroup from './js/number-group'
import Score from './js/score'
import Button from './js/button'

const info = wx.getSystemInfoSync()
const screenWidth = info.windowWidth
const screenHeight = info.windowHeight

const bg = new Background()
const stoneGroup = new StoneGroup()
const stage = new cax.Stage()
const spring = new ShooterSpring()
const flowerGroup = new FlowerGroup()
const enemyGroup = new EnemyGroup()
const numbers = new NumberGroup()
const scoreDisplay = new Score()
const music = new Music()
const pauseButton = new Button({
	x: (screenWidth - 44) / 2,
	y: 0,
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

stage.add(bg, flowerGroup, spring, stoneGroup, enemyGroup, numbers, scoreDisplay, pauseButton, restartButton)
scoreDisplay.setScore(0)
initStone()
spring.holePoints = bg.holePoints()

let touchX = null
let touchY = null
let isShoot = false
let touchMoved = false
let touchMoveX = 0
let touchMoveY = 0
let score = 0
let gameEnd = false
let STONE_REFRESH_TIME = 300
let paused = false

wx.onTouchStart(function (e) {
	isShoot = false
  touchX = e.touches[0].clientX
  touchY = e.touches[0].clientY
})

wx.onTouchMove(function (e) {
	touchMoved = true
	touchMoveX = e.touches[0].clientX - touchX
	touchMoveY = e.touches[0].clientY - touchY
  touchX = e.touches[0].clientX
  touchY = e.touches[0].clientY
  
})

wx.onTouchEnd(function (e) {
	touchMoved = false
	isShoot = true
	restartButton.actIfNeeded([touchX, touchY])
  pauseButton.actIfNeeded([touchX, touchY])
})

function initStone() {
	if (stoneGroup.children.length == 0) {
			stoneGroup.generate()
	}
	stoneGroup.current.setInitPoint(bg.originPoint())
	spring.follow(stoneGroup.current)
	stoneGroup.current.alpha = 1
}

function replay() {
	score = 0
	scoreDisplay.setScore(score)
  enemyGroup.reset()
  stoneGroup.empty()
  flowerGroup.empty()
  numbers.empty()
  initStone()
	
	flowerGroup.generateAll()
	flowerGroup.animateAll()
	
  gameEnd = false
  update()
}

restartButton.action = function() {
  restartButton.visible = false
  replay()
}

pauseButton.action = function() {
  paused = !paused
  update()
}

function update () {
	if (paused) {
		return
	}
  stage.update()
  bg.update()

	if (isShoot) {
		stoneGroup.shoot()
		isShoot = false
		initStone()
	}
	
	if (flowerGroup.children.length == 0) {
		flowerGroup.generateAll()
		flowerGroup.animateAll()
	}
	if (gameEnd) {
		return
	}
	if (touchMoved) {
		stoneGroup.updateCurrentPosition(touchMoveX, touchMoveY)
		touchMoveX = 0
		touchMoveY = 0
	}
	stoneGroup.update()
  enemyGroup.update()
	spring.update()
	numbers.update()

  enemyGroup.children.forEach(enemy => {
		stoneGroup.children.forEach(stone => {
			if (stone.isShoot) {
	      if (stone.isCollideWith(enemy)) {
					let s = 100 * stone.combo
					numbers.generate(enemy, s)
	        enemy.explode()
					score += s
					stone.combo += 1
	        music.playExplosion()
					scoreDisplay.setScore(score)
	      }
			}
		})
		flowerGroup.children.forEach(flower => {
			if (flower.isCollideWith(enemy)) {
				enemy.explode()
				flower.catchFire()
			}
		})
  })
	
	if (flowerGroup.children.length == 0) {
		gameEnd = true
    restartButton.visible = true
	}
  requestAnimationFrame(update)
}

update()