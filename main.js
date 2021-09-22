import './style.css';
import * as THREE from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'

//scene & camera settings
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);
camera.position.setX(-3);


//torus and light settings
const geometry = new THREE.TorusGeometry( 10, 3, 16, 100 );
const material = new THREE.MeshStandardMaterial( {color: 0xff6347} );
const torus = new THREE.Mesh(geometry,material);
scene.add( torus );

const pointLight= new THREE.PointLight(0xffffff);
pointLight.position.set(20,20,20);

const ambientLight= new THREE.AmbientLight(0xffffff);
scene.add( pointLight , ambientLight);

const lightHelper= new THREE.PointLightHelper(pointLight);
const gridHelper = new THREE.GridHelper(200,50)
scene.add(lightHelper,gridHelper);


//controls 
const controls = new OrbitControls(camera, renderer.domElement);


// stars settings
function addStar() {
    const geometry = new THREE.SphereGeometry(0.25, 24, 24);
    const material = new THREE.MeshStandardMaterial({ color: 0x101212 });
    const star = new THREE.Mesh(geometry, material);
  
    const [x, y, z] = Array(3)
      .fill()
      .map(() => THREE.MathUtils.randFloatSpread(100));
  
    star.position.set(x, y, z);
    scene.add(star);
  }
  
  Array(200).fill().forEach(addStar);


  //background settings

  const spaceTexture= new THREE.TextureLoader().load('../images/2.jpg');
  scene.background= spaceTexture;
  

  // avatar settings

  const mohTexture= new THREE.TextureLoader().load('../images/igpic.png');

  const moh= new THREE.Mesh(
      new THREE.BoxGeometry(3,3,3),
     new THREE.MeshBasicMaterial({map:mohTexture})
  )
    scene.add(moh);

    

//Moon settings
const moonTexture = new THREE.TextureLoader().load('./images/moon.jpg');
const normalTexture = new THREE.TextureLoader().load('./images/normal.jpg');
const moon = new THREE.Mesh(
    new THREE.SphereGeometry(3,32,32),
    new THREE.MeshStandardMaterial({
        map: moonTexture,
        normalMap: normalTexture

    })

)
moon.position.z=30;
moon.position.setX(-8);
scene.add(moon);

function moveCamera() {
    const t = document.body.getBoundingClientRect().top;
    moon.rotation.x += 0.05;
    moon.rotation.y += 0.075;
    moon.rotation.z += 0.05;
  
    moh.rotation.y += 0.01;
    moh.rotation.z += 0.01;
  
    camera.position.z = t * -0.01;
    camera.position.x = t * -0.0002;
    camera.rotation.y = t * -1;
  }
  
  document.body.onscroll = moveCamera;
  moveCamera();

//animation  recursive function
function animate(){
    requestAnimationFrame(animate);
    torus.rotation.z +=0.01;
    torus.rotation.x +=0.005;
    torus.rotation.y -=0.005;
    controls.update();
    renderer.render(scene, camera);
}
animate()