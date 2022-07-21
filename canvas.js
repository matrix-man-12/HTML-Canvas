
let canvas1 = document.querySelector('.canvas-1')
let canvas2 = document.querySelector('.canvas-2')
let canvas3 = document.querySelector('.canvas-3')

canvas1.width = window.innerWidth 
canvas1.height = window.innerHeight
let context1 = canvas1.getContext('2d')

canvas2.width = window.innerWidth 
canvas2.height = window.innerHeight
let context2 = canvas2.getContext('2d')

canvas3.width = window.innerWidth 
canvas3.height = window.innerHeight
let context3 = canvas3.getContext('2d')

// fillRect(x, y, width, height)
context1.fillStyle = '#73A9AD'
context1.fillRect(100, 100, 100, 100)
context1.fillStyle = '#90C8AC'
context1.fillRect(200, 200, 100, 100)
context1.fillStyle = '#C4DFAA'
context1.fillRect(300, 300, 100, 100)
context1.fillStyle = '#F5F0BB'
context1.fillRect(400, 400, 100, 100)


// line-1
context1.beginPath()
context1.moveTo(100, 200)
context1.lineTo(400, 500)
context1.strokeStyle = '#576F72'
context1.stroke()

// line-2
context1.beginPath()
context1.moveTo(200, 100)
context1.lineTo(500, 400)
context1.strokeStyle = '#7D9D9C'
context1.stroke()


// arc/circle-1
// arc(x, y, radius, startAngle: float, endAngle: float, anticlockwise)
context1.beginPath()
context1.arc(300, 300, 282.8428, 0, Math.PI * 2, false)
context1.strokeStyle = '#ABC9FF'
context1.stroke()





// Canvas 2
function Circle(x, y, dx, dy, radius, color) {
    this.x = x
    this.y = y
    this.dx = dx
    this.dy = dy
    this.radius = radius
    this.color = color
    
    this.draw = function() {
        context2.beginPath()
        context2.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
        context2.fillStyle = this.color
        // console.log(`Color is: ${this.color}`);
        context2.fill()
    }

    this.update = function() {
        if(this.x + this.radius > innerWidth || this.x - this.radius < 0) {
            this.dx = -this.dx
        }
        if(this.y + this.radius > innerHeight || this.y - this.radius < 0) {
            this.dy = -this.dy
        }
        this.x += this.dx
        this.y += this.dy

        this.draw()
    }
}

let circleArray = []

let numberOfCircles = 50

for(let i = 0; i < numberOfCircles; i++ ) {
    
    let radius = (Math.random() * 100)

    let x = Math.random() * (window.innerWidth - radius*2) + radius
    let y = Math.random() * (window.innerHeight - radius*2) + radius

    let dx = (Math.random() - 0.5) * 5
    let dy = (Math.random() - 0.5 ) * 5

    let color = `#${Math.floor(Math.random()*16777215).toString(16)}`
    
    let circle = new Circle(x, y, dx, dy, radius, color)
    
    circleArray.push(circle)
}

function animate() {
    requestAnimationFrame(animate)

    context2.clearRect(0, 0, canvas2.width, canvas2.height)

    for(let i = 0; i < circleArray.length; i++) {
        circleArray[i].update()
    }
}

animate()


// Canvas 3

let mouse = {
    x: undefined,
    y: undefined
}

let maxRadius = 50
// let minRadius = 10

canvas3.addEventListener("mousemove", (event) => {
    mouse.x = event.x
    mouse.y = event.y
})

window.addEventListener("resize", (event) => {
    canvas3.width = window.innerWidth
    canvas3.height = window.innerHeight

    init()
})

let colorArray = ["#495C83", "#7A86B6", "#C4D7E0", "#A2B5BB"]

function Circle3(x, y, dx, dy, radius,) {
    this.x = x
    this.y = y
    this.dx = dx
    this.dy = dy
    this.radius = radius
    this.minRadius = radius
    this.color = colorArray[Math.floor(Math.random() * colorArray.length)]
    
    this.draw = function() {
        context3.beginPath()
        context3.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
        context3.fillStyle = this.color
        context3.fill()
    }

    this.update = function() {
        if(this.x + this.radius > innerWidth || this.x - this.radius < 0) {
            this.dx = -this.dx
        }
        if(this.y + this.radius > innerHeight || this.y - this.radius < 0) {
            this.dy = -this.dy
        }
        this.x += this.dx
        this.y += this.dy


        // mouse hover growth
        if(mouse.x - this.x < 50 && mouse.x - this.x > -50 && mouse.y - this.y < 50 && mouse.y - this.y > -50) {
            if(this.radius < maxRadius) {
                this.radius += 1
            }
        } else if(this.radius > this.minRadius) {
            this.radius -= 1
        }         

        this.draw()
    }
}


let circleArray3 = []

let numberOfCircles3 = 900

function init() {
    circleArray3 = []
    for(let i = 0; i < numberOfCircles3; i++ ) {
        
        let radius = (Math.random() * 3 + 1)

        let x = Math.random() * (window.innerWidth - radius*2) + radius
        let y = Math.random() * (window.innerHeight - radius*2) + radius

        let dx = (Math.random() - 0.5) * 5
        let dy = (Math.random() - 0.5 ) * 5
        
        let circle = new Circle3(x, y, dx, dy, radius,)
        
        circleArray3.push(circle)
    }
}

init()

function animate3() {
    requestAnimationFrame(animate3)

    context3.clearRect(0, 0, canvas3.width, canvas3.height)

    for(let i = 0; i < circleArray3.length; i++) {
        circleArray3[i].update()
    }
}

animate3()