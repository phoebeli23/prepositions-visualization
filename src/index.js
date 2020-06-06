import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import fontJsn from 'three/examples/fonts/helvetiker_regular.typeface.json';
import fontJsn2 from 'three/examples/fonts/optimer_bold.typeface.json';

let scene, renderer, controls, camera;

init();
animate();

function init() {
    camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 5000);
    camera.position.set(0, 50, 550);
    scene = new THREE.Scene();

    //light
    const light = new THREE.HemisphereLight(0xffffbb, 0x080820, 1);
    light.position.set(0, 1, 1)
    scene.add(light);

    //walls
    const loader = new THREE.TextureLoader();
    const houseMaterial = new THREE.MeshBasicMaterial({
        map: loader.load('https://images.pexels.com/photos/326311/pexels-photo-326311.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'),
        side: THREE.DoubleSide
    });

    const p1 = new THREE.Mesh(new THREE.PlaneGeometry(120, 120), houseMaterial);
    p1.position.set(0, 0, -60)
    scene.add(p1);

    const p2 = new THREE.Mesh(new THREE.PlaneGeometry(120, 120), houseMaterial);
    p2.position.set(0, 0, 60)
    scene.add(p2);

    const p3 = new THREE.Mesh(new THREE.PlaneGeometry(120, 120), houseMaterial);
    p3.position.set(-60, 0, 0)
    p3.rotateY(Math.PI / 2);
    scene.add(p3);

    const p4 = new THREE.Mesh(new THREE.PlaneGeometry(120, 120), houseMaterial);
    p4.position.set(60, 0, 0)
    p4.rotateY(Math.PI / 2);
    scene.add(p4);
    
    const p5 = new THREE.Mesh(new THREE.PlaneGeometry(120, 120), houseMaterial);
    p5.position.set(0, -60, 0)
    p5.rotateX(Math.PI / 2);
    scene.add(p5);

    //cone
    const coneGeo = new THREE.ConeGeometry(110, 50, 4);
    const cone = new THREE.Mesh(coneGeo, houseMaterial);
    cone.position.set(0, 85, 0);
    cone.rotateY(Math.PI / 4);
    scene.add(cone);

    //text - title
    const titleFont = {
        font: new THREE.Font(fontJsn2),
		size: 30,
		height: 10,
		curveSegments: 12,
		bevelEnabled: true,
		bevelThickness: 6,
		bevelSize: 2, 
		bevelOffset: 0,
		bevelSegments: 3
    };
    const titleMaterial = new THREE.MeshPhongMaterial({color: 0xffE4e1});
    scene.add(createTerm(titleFont, 'Las Preposiciones de Lugar', titleMaterial, -250, 250, 0));

    //text - terms
    const font = {
        font: new THREE.Font(fontJsn),
		size: 18,
		height: 5,
		curveSegments: 12,
		bevelEnabled: true,
		bevelThickness: 2,
		bevelSize: 0.5, 
		bevelOffset: 0,
		bevelSegments: 3
    };
    
    const tm4 = new THREE.MeshPhongMaterial({color: 0xccffd7});
    scene.add(createTerm(font, 'delante de', tm4, -60, -20, 150));
    scene.add(createTerm(font, 'enfrente de', tm4, -60, 20, 150));
    scene.add(createTerm(font, 'dentras de', tm4, -60, 0, -400));

    const tm1 = new THREE.MeshPhongMaterial({color: 0xd9bdff});
    scene.add(createTerm(font, 'sobre', tm1, -50, 120, 0));
    scene.add(createTerm(font, 'encima de', tm1, -50, 150, 0));
    scene.add(createTerm(font, 'debajo de', tm1, -60, -200, 0));

    const tm2 = new THREE.MeshPhongMaterial({color: 0xff8f94});
    scene.add(createTerm(font, 'al lado de', tm2, 250, 50, 0));
    scene.add(createTerm(font, 'a la derecha', tm2, 200, 0, 0));
    scene.add(createTerm(font, 'a la izquierda', tm2, -350, 0, 0));

    const tm3 = new THREE.MeshPhongMaterial({color: 0xeffd39e});
    scene.add(createTerm(font, 'junto a', tm3, 90, -50, 0));
    scene.add(createTerm(font, 'cerca de', tm3, -200, 50, 0));
    scene.add(createTerm(font, 'lejos de', tm3, -700, 0, -600));

    const tm5 = new THREE.MeshPhongMaterial({color: 0xa3f1ff});
    scene.add(createTerm(font, 'fuera de', tm5, -250, 150, -50));
    scene.add(createTerm(font, 'dentro de', tm5, -55, 0, -10));


    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    window.addEventListener( 'resize', onWindowResize, false );

    //controls
    controls = new OrbitControls(camera, renderer.domElement);
    controls.rotateSpeed = .6;
    controls.keyPanSpeed = 10.0;
    controls.enableDamping = true;
    controls.dampingFactor = .05;
}

function onWindowResize(){
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function createTerm(font, text, material, x, y, z) {
    const geometry = new THREE.TextGeometry(text, font);
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);
    return mesh;
}

function animate() {
    requestAnimationFrame(animate);

    controls.update();
    //mesh.rotation.y += 0.02;

    renderer.render(scene, camera);
}