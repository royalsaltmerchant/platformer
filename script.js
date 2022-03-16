// init canvas
var canvas = document.getElementById('canvas')
var ctx = canvas.getContext('2d')
// init player image
var image = new Image()
image.src = 'ghost.webp'
var reverseImage = new Image()
reverseImage.src = 'ghostReverse.webp'
// set canvas size
canvas.width = window.innerWidth
canvas.height = window.innerHeight
// set global properties
var gravity = 0.9


class Player {
  constructor() {
    this.position = {
      x: 100,
      y: 100
    }
    this.velocity = {
      x: 0,
      y: 0
    }
    this.width = 100
    this.height = 100
    this.speed = 8
    this.jump = -20
    this.jumping = false

    this.reverse = false
  }

  handleMovement() {
    this.position.x += this.velocity.x
    this.position.y += this.velocity.y
  }

  handleGravity() {
    if(this.position.y + this.height + this.velocity.y <= canvas.height) {
      this.velocity.y += gravity
    } else {
      this.velocity.y = 0
    }
  }

  controls() {
    // vertical
    if(keys.up.pressed && !this.jumping) {
      this.velocity.y = this.jump
      this.jumping = true
      setTimeout(() => {
        this.jumping = false
      }, 800)
    }
    if(keys.down.pressed) {}

    // horizontal
    if(keys.left.pressed) {
      this.velocity.x = -this.speed
      this.reverse = true
    } else if(keys.right.pressed) {
      this.velocity.x = this.speed
      this.reverse = false
    } else this.velocity.x = 0
  }

  draw() {
    ctx.drawImage(this.reverse ? reverseImage : image, this.position.x, this.position.y, this.width, this.height)
  }

  update() {
    this.draw()
    this.handleMovement()
    this.handleGravity()
    this.controls()
  }
}
var player = new Player()

class Platform {
  constructor() {
    this.position = {
      x: 0,
      y: 0
    }
  }
}
var platform1 = new Platform()

// keys
var keys = {
  right: {
    pressed: false
  },
  left: {
    pressed: false
  },
  up: {
    pressed: false
  },
  down: {
    pressed: false
  }
}


// clear and animate
function clear() {
  ctx.clearRect(0,0,canvas.width,canvas.height)
}

function animate() {
  requestAnimationFrame(animate)
  clear()
  player.update()
}

animate()



// window event listeners for key actions
addEventListener('keydown', ({code}) => {
  // console.log(code)
  switch(code) {
    case 'ArrowUp':
      keys.up.pressed = true
      break
    case 'ArrowDown':
      keys.down.pressed = true
      break
    case 'ArrowLeft':
      keys.left.pressed = true
      break
    case 'ArrowRight':
      keys.right.pressed = true
      break
  }
})

addEventListener('keyup', ({code}) => {
  // console.log(code)
  switch(code) {
    case 'ArrowUp':
      keys.up.pressed = false
      break
    case 'ArrowDown':
      keys.down.pressed = false
      break
    case 'ArrowLeft':
      keys.left.pressed = false
      break
    case 'ArrowRight':
      keys.right.pressed = false
      break
  }
})
