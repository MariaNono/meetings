const {Engine, Render, World, Bodies, MouseConstraint, Composites} = Matter

const w = window.innerWidth
const h = window.innerHeight

Matter.use('matter-wrap')

const f = () => {
  return Math.random() * (0.1 - 0.01) + 0.01
}

const engine = Engine.create()

const world = engine.world
world.gravity.y = 0.4
world.gravity.x = 0.03

const renderer = Render.create({
  element: document.body,
  engine: engine,
  options: {
    height: h,
    width: w,
    wireframes: false,
    background: '#ffffff00',
    pixelRatio: window.devicePixelRatio
  }
})

const mouseControl = MouseConstraint.create(engine,{
  element: document.body,
  constraint:{
    render:{
      visible:false
    }
  }
})

const createShape = function(x, y) {
  const bodyX = Math.random() * w
  const bodyY = Math.random() * (h + 200) - 200
  return Bodies.rectangle(bodyX, bodyY, 95, 16, {
    angle: Math.random() * -180,
    frictionAir: f(),
    restitution: 0,
    render: {
      opacity: 0.7,
      // fillStyle: '#fff',
      sprite:{
        texture:"Meeting.png",
        xScale:0.3,
        yScale:0.3,
      }
    },
  })
}

const initialShapes = Composites.stack(50,50,8,9,5,10,function(x,y){
  return createShape(x,y)
})

initialShapes.bodies.forEach(shape => {
  shape.plugin.wrap = {
    min: { x: 0, y: 0 },
    max: { x: w, y: h }
  }
})

World.add(world, [ mouseControl, initialShapes])

document.addEventListener('click', (event) => {
  const shape = createShape(event.pageX, event.pageY)
  World.add(world, shape)
})

Engine.run(engine)
Render.run(renderer)