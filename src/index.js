const dft = {
  fillStyle: 'black',
  strokeStyle: 'red',
  lineWidth: 2,
  imgType: 'image/PNG'
}

const pcEvent = ['mousedown', 'mousemove', 'mouseup']
const h5Event = ['touchstart', 'touchmove', 'touchend']

const isMobile = () => window.ontouchstart !== undefined

class SignatureBoard {
  constructor(el, opts) {
    // canvas context
    this.ctx = null
    this.opts = opts || {}
    this.canDraw = false

    const parentW = el.clientWidth
    const parentH = el.clientHeight

    this.canvas = document.createElement('canvas')
    this.canvas.width = parentW
    this.canvas.height = parentH

    el.appendChild(this.canvas)

    const eventList = isMobile() ? h5Event : pcEvent

    if (this.canvas.getContext('2d')) {
      this.ctx = this.canvas.getContext('2d')
      this.initCanvas()
    } else {
      throw Error('The browser dont support canvas!')
    }

    this.canvas.addEventListener(eventList[0], (e) => {
      this.canDraw = true
      this.ctx.beginPath()
      this.ctx.moveTo(e.offsetX, e.offsetY)
    })
    this.canvas.addEventListener(eventList[1], (e) => {
      if (!this.canDraw) return
      requestAnimationFrame(() => {
        this.draw(e.offsetX, e.offsetY)
      })
    })
    this.canvas.addEventListener(eventList[2], () => {
      this.ctx.closePath()
      this.canDraw = false
    })
  }

  initCanvas() {
    this.ctx.fillStyle = this.opts.fillStyle ?? dft.fillStyle
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)
  }

  draw(x, y) {
    this.ctx.lineTo(x, y)
    this.ctx.lineWidth = this.opts.lineWidth ?? dft.lineWidth
    this.ctx.strokeStyle = this.opts.strokeStyle ?? dft.strokeStyle
    this.ctx.stroke()
  }

  getDataUrl() {
    return this.canvas.toDataURL(this.opts.imgType ?? dft.imgType)
  }

  downloadImg() {
    const url = this.getDataUrl()
    const aTag = document.createElement('a')
    aTag.download = 'true'
    aTag.href = url
    aTag.click()
  }

  clear() {
    this.initCanvas()
  }
}
