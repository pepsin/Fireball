let instance
export default class Music {
  constructor () {
    if (instance) { return instance }

    instance = this

    this.bgmAudio = wx.createInnerAudioContext()
    this.bgmAudio.loop = true
    this.bgmAudio.src = 'audio/shamisen.mp3'
    this.bgmAudio.volume = 0.3

    this.shootAudio = wx.createInnerAudioContext()
    this.shootAudio.src = 'audio/bullet.mp3'
    
    this.hitAudio = []
    for (var i = 0; i < 28; i++) {
      var boomAudio = wx.createInnerAudioContext()
      boomAudio.src = 'audio/hit.mp3'
      this.hitAudio.push(boomAudio)
    }

    this.playBgm()
  }

  playBgm () {
    this.bgmAudio.play()
  }
  
  pauseBgm() {
    this.bgmAudio.pause()
  }

  playShoot () {
    // this.shootAudio.currentTime = 0
    this.shootAudio.play()
  }

  playExplosion () {
    for (var i = 0; i < this.hitAudio.length; i++) {
      if (this.hitAudio[i].paused) {
        this.hitAudio[i].play()
        break
      }
    }
  }
}
