import './style.css'

import * as THREE from 'three';

//for control over the scene with mouse
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js'

//creating the scene
const scene = new THREE.Scene();

//defining the camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);

//configuring the renderer
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

camera.position.setZ(30);

renderer.render(scene, camera);

//creating the torus
const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
const material = new THREE.MeshStandardMaterial({color: 0xff6347}); //adding material that reflects the light
const torus = new THREE.Mesh(geometry, material);

scene.add(torus);

//creating the light inside the center of the torus
const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(0, 0, 5);
scene.add(pointLight);

//setting light around the torus
const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(ambientLight);

//setting up grid helper
//const lightHelper = new THREE.PointLightHelper(pointLight);
//scene.add(lightHelper);

//setting up grid helper
//const gridHelper = new THREE.GridHelper(200, 50);
//scene.add(gridHelper);

//setting up the controls for the mouse
//const controls = new OrbitControls(camera, renderer.domElement);

//generating 200 random starts
function addStar(){
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({color: 0xffffff});
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);
  scene.add(star);
}

Array(200).fill().forEach(addStar);

//adding space tecture as background
const spaceTexture = new THREE.TextureLoader().load('space.jpg');
scene.background = spaceTexture;

//creating texture mapping
const TextureMapping = new THREE.TextureLoader().load('download.jpg');

const mapping = new THREE.Mesh(
  new THREE.BoxGeometry(3, 3, 3),
  new THREE.MeshBasicMaterial({map: TextureMapping})
);

scene.add(mapping);

//creating the moon and adding boldness
const moonTexture = new THREE.TextureLoader().load('moon.jpg');
const normalTexture = new THREE.TextureLoader().load('normal.jpg');

const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({
    map: moonTexture,
    normalMap: normalTexture
  })
);

scene.add(moon);

//positioning the moon
moon.position.z = 17;
moon.position.setX(-13);

//moving the camera on scroll
function moveCamera(){
  const t = document.body.getBoundingClientRect().top;

  moon.rotation.x +=0.01;
  moon.rotation.y +=0.075;
  moon.rotation.z +=0.01;

  mapping.rotation.y += 0.01;
  mapping.rotation.z +=0.01;

  camera.position.z = t * -0.011;
  camera.position.x = t * -0.0001;
  camera.position.y = t * -0.0001;

}
document.body.onscroll = moveCamera;

//adding animation on loop
function animate(){
  requestAnimationFrame(animate);

  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;

  //controls.update();

  renderer.render(scene, camera);
}

animate();

