


const socket = io()
socket.emit('apiReq', 'https://api.propublica.org/congress/v1/115/senate/members.json')
socket.on('apiRes', function(json) {
    //NEED  TO CHANGE const congressMem = json.results[0].congress;
    console.log(json);
    //NEED TO CHANGE console.log(congressMem);

    var camera, scene, renderer, mesh, material, controls;
    init();
    animate();
    angry();
    fear();
    joy();
    sadness();
    anylitical();
    confident();
    tentative();
    render();

//HOW DO I LINK THESE FUNCTIONS UP TO THE MOST REACTED TO EMOTION FROM TONE ANALYZER, THINK I NEED AND "IF THEN"
//ANGRY FUNCTION WOULD JUST B COPY PASTED FOR EACH EMOTION I THINK
    function angry() {
    		var xDistance = 10;
        var zDistance = 10;
        var geometry = new THREE.SphereGeometry(10,50,50);
        var material = new THREE.MeshLambertMaterial({color:0xf06d27});

        //initial offset so does not start in middle.
        var xOffset = -50;
        var zOffset = -50;

        //NEED TO CHANGE for(var i = 0; i < Math.sqrt(congressMem); i++){
            //NEED TO CHANGE for(var j = 0; j < Math.sqrt(congressMem); j++){
            		var mesh  = new THREE.Mesh(geometry, material);
            		mesh.position.x = (xDistance * i) + xOffset;
                mesh.position.z = (zDistance * j) + zOffset;
            		scene.add(mesh);
            }
        };
    }

    function init() {
        // Renderer.
        renderer = new THREE.WebGLRenderer();
        //renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(window.innerWidth, window.innerHeight);
        // Add renderer to page
        document.body.appendChild(renderer.domElement);

        // Create camera.
        camera = new THREE.PerspectiveCamera(1000, window.innerWidth / window.innerHeight, 1, 5000);
        camera.position.y = -200;


        // Add controls I DONT KNOW THAT WE NEED THIS
        //controls = new THREE.TrackballControls( camera );
        //controls.addEventListener( 'change', render );

        // Create scene.
        scene = new THREE.Scene();
        scene.background = new THREE.Color( 0xffffff );

        // Create ambient light and add to scene. I WANT TO CHANGE THIS WITH THE MOOD READER
        //var angryLight = new THREE.AmbientLight(0xbb6464); // reddish light
        //scene.add(angryLight);

        // Create directional light and add to scene. DUNNO IF WE NEED THIS
        var directionalLight = new THREE.DirectionalLight(0xffffff);
        directionalLight.position.set(1, 1, 1).normalize();
        scene.add(directionalLight);

        // Add listener for window resize.
        window.addEventListener('resize', onWindowResize, false);
    }

    function animate() {
        requestAnimationFrame(animate);
        controls.update();

    }

    function render() {
    	renderer.render(scene, camera);
    }

    function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
        controls.handleResize();
    }

})
