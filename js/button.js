import cax from './libs/cax'

//options
/*
	font:
	text: 
	textColor:
	bgColor:
	bgImage: [path, width, height]
	borderRadius:
	borderColor:
	image:
*/

class Button extends cax.Group {
  constructor (option) {
    super()
    this.width = option.width
		this.height = option.height
		this.x = option.x
		this.y = option.y
		
		if (option.bgImage) {
			var ratio = 0.5
			let bitmap = new cax.Bitmap(option.bgImage[0])
			bitmap.scaleX = ratio
			bitmap.scaleY = ratio
			bitmap.width = option.bgImage[1]
			bitmap.height = option.bgImage[2]
			bitmap.x = (this.width - bitmap.width) / 2
			bitmap.y = (this.height - bitmap.height) / 2
			this.add(bitmap)
		} else if (option.bgColor || option.borderColor) {
	    this.roundedRect = new RoundedRect(option.width, option.autoHeight ? Math.max(textHeight, option.height) : option.height, option.borderRadius, {
	      strokeStyle: option.borderColor || 'black',
	      fillStyle: option.backgroundColor || '#F5F5F5'
	    })
	    this.add(this.roundedRect)
		}
		
		if (option.text) {
	    let textHeight = 0
	    this.text = new cax.Text(option.text, {
	      font: option.font,
	      color: option.color
	    })
	    const textWidth = this.text.getWidth()
	    const textGroup = new cax.Group()

	    if (textWidth > option.width) {
	      const step = Math.round(option.text.length * (option.width) / textWidth / 2)

	      const textList = this.stringSplit(option.text, step)
	      const lineHeight = option.lineHeight || 12
	      textHeight = textList.length * lineHeight + 6

	      textList.forEach((text, index) => {
	        this.text = new cax.Text(text, {
	          font: option.font,
	          color: option.color
	        })

	        this.text.x = option.width / 2 - this.text.getWidth() / 2 * this.text.scaleX + (option.textX || 0)
	        this.text.y = Math.max(textHeight, option.height) / 2 - 10 + 5 * this.text.scaleY + (option.textY || 0) + index * 12 - textHeight / 2 + lineHeight / 2
	        textGroup.add(this.text)
	      })
	    } else {
	      this.text.x = option.width / 2 - this.text.getWidth() / 2 * this.text.scaleX + (option.textX || 0)
	      this.text.y = option.height / 2 - 10 + 5 * this.text.scaleY + (option.textY || 0)
	      textGroup.add(this.text)
	    }
			this.add(textGroup)
		}
  }

  stringSplit (str, len) {
    let arr = [],
      offset = 0,
      char_length = 0
    for (let i = 0; i < str.length; i++) {
      let son_str = str.charAt(i)
      encodeURI(son_str).length > 2 ? char_length += 1 : char_length += 0.5
      if (char_length >= len || (char_length < len && i === str.length - 1)) {
        let sub_len = char_length == len ? i + 1 : i
        arr.push(str.substr(offset, sub_len - offset + ((char_length < len && i === str.length - 1) ? 1 : 0)))
        offset = i + 1
        char_length = 0
      }
    }
    return arr
  }
}

export default Button