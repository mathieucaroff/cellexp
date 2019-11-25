class Playground {
   public static CreateScene(
      engine: BABYLON.Engine,
      canvas: HTMLCanvasElement,
   ): BABYLON.Scene {
      // This creates a basic Babylon Scene object (non-mesh)
      let scene = new BABYLON.Scene(engine)

      // This creates and positions a free camera (non-mesh)
      let target = BABYLON.Vector3.Zero()
      let camera = new BABYLON.FlyCamera(
         'camera1',
         new BABYLON.Vector3(0, 10, 0),
         scene,
      )

      // Point toward the ground (since camera is above target)
      camera.setTarget(target)

      // Use orthographic camera
      camera.mode = BABYLON.Camera.ORTHOGRAPHIC_CAMERA
      camera.orthoTop = 0.5
      camera.orthoBottom = -0.5
      camera.orthoLeft = -0.5
      camera.orthoRight = 0.5

      // Reduce speed since we use a small scene
      camera.speed = 0.05

      // This attaches the camera to the canvas
      camera.attachControl(canvas, false)

      // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
      let light = new BABYLON.HemisphericLight(
         'light1',
         new BABYLON.Vector3(0, 1, 0),
         scene,
      )

      // Default intensity is 1. Let's dim the light a small amount
      light.intensity = 1

      // on-material (black)
      let onMaterial = new BABYLON.StandardMaterial('on-mat', scene)
      onMaterial.disableLighting = true

      // Generate a random grid
      let arr = new Array(40).fill(0)
      let grid = arr.map(() => {
         // padEnd is not ECMA2017 so Typescript doesn't know it
         // rand generates 53 (01) digits
         let rand = () => {
            let some53digits = (Math.random()
               .toString(2)
               .slice(2) as any).padEnd(53, '0') as string
            return some53digits.split('').map((x) => +x)
         }
         // line uses rand as many times as needed to get a line of (arr.length) or more (01) digits
         let line = ([] as number[]).concat(
            ...Array(Math.ceil(arr.length / 53))
               .fill(0)
               .map(rand),
         )
         return line.slice(0, arr.length)
      })
      let ground = grid.map((line, j) => {
         return line.map((on, k) => {
            let w = 1 / grid.length
            let h = 1 / line.length
            let sq = BABYLON.Mesh.CreateGround(
               `ground${j}-${k}`,
               w,
               h,
               0,
               scene,
            )
            // let sq = BABYLON.Mesh.CreatePlane(`plane${j}-${k}`, 1, scene);
            sq.position.x = j / grid.length - 0.5 + w / 2
            sq.position.z = k / line.length - 0.5 + h / 2
            if (on) {
               sq.material = onMaterial
            }
            return sq
         })
      })

      return scene
   }
}
