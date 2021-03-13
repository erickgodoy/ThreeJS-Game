import * as THREE from './threejs/three.module.js'
import {STLLoader} from './threejs/STLLoader.js'
import {OrbitControls} from './threejs/OrbitControls_.js'

let renderer, object;
let escena,camara;

function init(){
    escena = new THREE.Scene()
    camara = new THREE.PerspectiveCamera(
        55,
        window.innerWidth / window.innerHeight,
        45, 
        30000    
    );

    renderer = new THREE.WebGLRenderer({antialias:true});
    var controles = new OrbitControls(camara,renderer.domElement);
    
    var ejes = new THREE.AxesHelper(100);
    var teclado = new THREEx.KeyboardState();
    var gEsfera = new THREE.SphereGeometry(250,500,500);

    var textura = new THREE.TextureLoader().load("texSol.png");
    var materialE = new THREE.MeshBasicMaterial({
        map:textura,
        flatShading:true
    });
    var sol = new THREE.Mesh(gEsfera,materialE); 

    sol.position.x = 250;
    sol.position.y = 550;
    sol.position.z = -2250;
    
    escena.add(ejes);
    escena.add(sol);

    var i = 0;
    while(i<25){
        var gEsfera = new THREE.SphereGeometry(10,120,120);
        var textura = new THREE.TextureLoader().load("tex.jpg");
        var materialE = new THREE.MeshBasicMaterial({
            map:textura,
            flatShading:true
        });

        var asteroide = new THREE.Mesh(gEsfera,materialE);
        var xp = (Math.random() * (500 - (-500))) + (-500);
        var yp = (Math.random() * (500 - (-500))) + (-500);
        var zp = (Math.random() * (500 - (-500))) + (-500);
        asteroide.position.x=xp;
        asteroide.position.y=yp;
        asteroide.position.z=zp;
        escena.add(asteroide);
        i = i +1;
    }

    camara.position.x = 10;
    camara.position.y = 10;
    camara.position.z = 100;
    camara.lookAt(new THREE.Vector3(0, 0, 0));

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(new THREE.Color(0x000, 1.0));
    renderer.shadowMapEnabled = true;

    document.body.appendChild(renderer.domElement);

    escena.add(object);

    let controls = new OrbitControls(camara, renderer.domElement);


    let light = new THREE.DirectionalLight(0xffffff);
    light.position.set(0,0,10);
    escena.add(light);

    let light2 = new THREE.DirectionalLight(0xffffff);
    light2.position.set(0,0,-10);
    escena.add(light2);

    let light3 = new THREE.DirectionalLight(0xffffff);
    light3.position.set(-10,0,0);
    escena.add(light3);


    let light4 = new THREE.DirectionalLight(0xffffff);
    light4.position.set(10,0,0);
    escena.add(light4);

    var animar = function(){
        requestAnimationFrame(animar);
        renderer.render(escena,camara);

        let tiempo = 0.001;
        let distancia = 2000;
        let recorrido = distancia*tiempo;
        let objMov=object;
        if(teclado.pressed("up")){
            objMov.position.z-=recorrido;
        }
        if(teclado.pressed("down")){
            objMov.position.z+=recorrido;
        }
        if(teclado.pressed("left")){
            objMov.position.x-=recorrido;
        }
        if(teclado.pressed("right")){
            objMov.position.x+=recorrido;
        }
        if(teclado.pressed("w")){
            objMov.position.y+=recorrido;
        }
        if(teclado.pressed("s")){
            objMov.position.y-=recorrido;
        }
        controles.target.set(objMov.position.x,objMov.position.y,objMov.position.z);
        controles.update();
    }
    
    animar();
    document.body.appendChild(renderer.domElement);
    document.body.appendChild(renderer.domElement);
    controls.addEventListener('change', renderer);
    controls.minDistance = 500;
    controls.maxDistance = 1500;

    let material = [];
    let textura_ft = new THREE.TextureLoader().load("./fondo/divine_ft.jpg");
    let textura_bk = new THREE.TextureLoader().load("./fondo/divine_bk.jpg");
    let textura_up = new THREE.TextureLoader().load("./fondo/divine_up.jpg");
    let textura_dn = new THREE.TextureLoader().load("./fondo/divine_dn.jpg");
    let textura_rt = new THREE.TextureLoader().load("./fondo/divine_rt.jpg");
    let textura_lf = new THREE.TextureLoader().load("./fondo/divine_lf.jpg");

    material.push(new THREE.MeshBasicMaterial({map:textura_ft}));
    material.push(new THREE.MeshBasicMaterial({map:textura_bk}));
    material.push(new THREE.MeshBasicMaterial({map:textura_up}));
    material.push(new THREE.MeshBasicMaterial({map:textura_dn}));
    material.push(new THREE.MeshBasicMaterial({map:textura_rt}));
    material.push(new THREE.MeshBasicMaterial({map:textura_lf}));

    for (let i = 0; i < 6; i++)
        material[i].side = THREE.BackSide;
        let gCubo = new THREE.BoxGeometry(10000,10000,10000);
        let cubo = new THREE.Mesh(gCubo,material);
        escena.add(cubo);
        animate();
    }

    function animate() {
        renderer.render(escena,camara);
        requestAnimationFrame(animate);
    }

    let loader = new STLLoader();
    loader.load('/3dmodels/Spaceship.stl', (model)=>{

    object = new THREE.Mesh(
        model,
        new THREE.MeshLambertMaterial({color: 0x38cef9})
    )

    object.scale.set(2.5,2.5,2.5);
    object.position.set(0,0,0)
    object.rotation.y = -Math.PI;

    init(); 
});
