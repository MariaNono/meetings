const {Engine, Render, World, Bodies, MouseConstraint, Composites} = Matter

const w = window.innerWidth
const h = window.innerHeight

const engine = Engine.create()

const renderer = Render.create({
  element: document.body,
  engine: engine,
  options: {
    height: h,
    width: w,
    wireframes: false,
    background: '#000',
    pixelRatio: window.devicePixelRatio
  }
})

/* 
const bigBall = Bodies.circle(w/2,h/2,250,{
  isStatic:true,
  render:{
    fillStyle:"#fff"
  }
})

const wallOptions = {
  isStatic:true,
  render:{
    visible: true
  }}

const ground = Bodies.rectangle(w/2,h+50,w+100,100, wallOptions)
const ceiling = Bodies.rectangle(w/2,-50,w+100,100, wallOptions)
const leftWall = Bodies.rectangle(-50,h/2,100,h+100, wallOptions)
const rightWall = Bodies.rectangle(w+50,h/2,100,h+100, wallOptions) 
*/

const mouseControl = MouseConstraint.create(engine,{
  element: document.body,
  constraint:{
    render:{
      visible:false
    }
  }
})


const createShape = function(x, y) {
  return Bodies.rectangle(x, y, 304, 67, {
    render: {
      sprite:{
        texture:"Meeting.png",
        xScale:0.3,
        yScale:0.3,
      }
    }
  })
}

const initialShapes = Composites.stack(50,50,15,5,40,40,function(x,y){
  return createShape(x,y)
})

World.add(engine.world, [ mouseControl, initialShapes])


document.addEventListener('click', function() {
  const shape = createShape(event.pageX, event.pageY)
  World.add(engine.world, shape)
})

Engine.run(engine)
Render.run(renderer)