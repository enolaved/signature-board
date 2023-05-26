const dft = {
  fillStyle: 'black',
  strokeStyle: 'red'
}

class SignatureBoard {
  constructor(el) {
    this.parent = el
    this.ctx = null
    const parentW = this.parent.clientWidth
    const parentH = this.parent.clientHeight
    const canvas = document.createElement('canvas')
    canvas.width = parentW
    canvas.height = parentH
    canvas.id = '$$signature'
    this.parent.appendChild(canvas)

    if (canvas.getContext('2d')) {
      this.ctx = canvas.getContext('2d')
      this.ctx.fillStyle = dft.fillStyle
      this.ctx.fillRect(0, 0, parentW, parentH)
    } else {
      throw Error('The browser dont support canvas!')
    }

    canvas.addEventListener('mouseenter', (e) => {
      this.ctx.beginPath()
      this.ctx.moveTo(e.offsetX, e.offsetY)
    })
    canvas.addEventListener('mousemove', (e) => {
      this.ctx.lineTo(e.offsetX, e.offsetY)
      this.ctx.lineWidth = 2
      this.ctx.strokeStyle = dft.strokeStyle
      this.ctx.stroke()
    })
    canvas.addEventListener('mouseleave', () => {
      this.ctx.closePath()
    })
  }
}