import cax from './js/libs/cax'

import Background from './js/background'
import Player from './js/player'
import EnemyGroup from './js/enemy-group'
import Music from './js/music'

const bg = new Background()
const player = new Player()
const stage = new cax.Stage()
const enemyGroup = new EnemyGroup()
const music = new Music()
const info = wx.getSystemInfoSync()
const screenHeight = info.windowHeight

stage.add(bg, enemyGroup, player)

stage.add(player.bulletGroup)

let touchX = null
let touchY = null
let isShoot = false

wx.onTouchStart(function (e) {
	isShoot = false
  touchX = e.touches[0].clientX
  touchY = e.touches[0].clientY
})

wx.onTouchMove(function (e) {
  touchX = e.touches[0].clientX
  touchY = e.touches[0].clientY
})

wx.onTouchEnd(function (e) {
	isShoot = true
})

function update () {
  stage.update()
  bg.update()

  player.update()
  if (touchX !== null) {
		if (isShoot && player.isShoot != isShoot) {
			player.shoot()
		}
		player.isShoot = isShoot
		if (!player.isShoot) {
	    player.x = touchX
	    player.y = touchY
		}		
  }
  enemyGroup.update()

  enemyGroup.children.forEach(enemy => {
    player.bulletGroup.children.forEach(bullet => {
      if (bullet.isCollideWith(enemy)) {
        bullet.visible = false
        enemy.explode()
        music.playExplosion()
      }
    })
  })

  requestAnimationFrame(update)
}

update()