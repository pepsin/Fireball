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
import UIGroup from './js/ui-group'
import Score from './js/score'

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
const uiGroup = new UIGroup()
const scoreDisplay = new Score()
const music = new Music()

stage.add(bg, flowerGroup, spring, stoneGroup, enemyGroup, numbers, scoreDisplay, uiGroup)
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
  uiGroup.passEvent([touchX, touchY])
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
  uiGroup.showBG(false)
	
  gameEnd = false
  paused = false
  update()
}

uiGroup.restartButton.action = function() {
  uiGroup.restartButton.visible = false
  replay()
}

uiGroup.startButton.action = function() {
  paused = false
  music.playBgm()
  uiGroup.start()
  update()
}

uiGroup.pauseButton.action = function() {
  paused = true
  music.pauseBgm()
  uiGroup.pause()
  update()
}

function update () {
  stage.update()
  uiGroup.update()
	if (paused) {
		return
	}
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
  
  enemyGroup.interactWithStoneAndFlowers(stoneGroup, flowerGroup, numbers, function(newScore) {
      music.playExplosion()
      score += newScore
			scoreDisplay.setScore(score)
  })
	
	if (flowerGroup.children.length == 0) {
		gameEnd = true
    uiGroup.showBG(true)
    uiGroup.restartButton.visible = true
	}
  requestAnimationFrame(update)
}

update()