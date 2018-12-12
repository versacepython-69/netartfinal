const socket = io()

var camera, scene, renderer, mesh, material;
init();
animate();
//angry();
//fear();
//joy();
//anylitical();
//confident();
//tentative();
//render();
//onWindowResize();

//^took out all unset mood functions for now


//HOW DO I LINK THESE FUNCTIONS UP TO THE MOST REACTED TO EMOTION FROM TONE ANALYZER, THINK I NEED AND "IF THEN"
//ANGRY FUNCTION WOULD JUST B COPY PASTED FOR EACH EMOTION I THINK
// function angry() {
// 		var xDistance = 10;
//     var zDistance = 10;
//     var geometry = new THREE.SphereGeometry(10,50,50);
//     var material = new THREE.MeshLambertMaterial({color:0xf06d27});
//
//     //initial offset so does not start in middle.
//     var xOffset = -50;
//     var zOffset = -50;
//
//     //NEED TO CHANGE for(var i = 0; i < Math.sqrt(congressMem); i++){
//         //NEED TO CHANGE for(var j = 0; j < Math.sqrt(congressMem); j++){
//         		var mesh  = new THREE.Mesh(geometry, material);
//         		mesh.position.x = (xDistance * i) + xOffset;
//             mesh.position.z = (zDistance * j) + zOffset;
//         		scene.add(mesh);
//         }
//     };
// }

function init() {
    // Renderer.
    renderer = new THREE.WebGLRenderer();
    //renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    // Add renderer to page
    document.body.appendChild(renderer.domElement);

    // Create camera.
    camera = new THREE.PerspectiveCamera(1000, window.innerWidth / window.innerHeight, 1, 5000);
    camera.position.z = 50;

    //^changed camera position as it was way off


    // Add controls I DONT KNOW THAT WE NEED THIS
    //controls = new THREE.TrackballControls( camera );
    //controls.addEventListener( 'change', render );

    // Create scene.
    scene = new THREE.Scene();
    scene.background = new THREE.Color( 0x000000 );

    var geometry = new THREE.SphereGeometry(12,50,50);
    var material = new THREE.MeshLambertMaterial({color:0xf06d27});
    mesh  = new THREE.Mesh(geometry, material);
    scene.add( mesh )

    //^resetting the ball shape with same angry color

    // Create ambient light and add to scene. I WANT TO CHANGE THIS WITH THE MOOD READER
    //var angryLight = new THREE.AmbientLight(0xbb6464); // reddish light
    //scene.add(angryLight);

//moved the directional light into socket functions

    // Create directional light and add to scene. DUNNO IF WE NEED THIS
    var directionalLight = new THREE.DirectionalLight(0xffffff);
     directionalLight.position.set(1, 1, 1).normalize();
     scene.add(directionalLight);

    // Add listener for window resize.
    window.addEventListener('resize', onWindowResize, false);
}

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

//function render() {
	//renderer.render(scene, camera);
//}
//^got rid of because the action of this function is what updates the screen and it wasnt doing that before, needed to be in animate function

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    controls.handleResize();
}

let userInput = document.querySelector('#userText')

// now we're create an event listener that lisents to what we type into it
userInput.addEventListener('keypress',function(e){
	// open your console && then start typeing into the input field to see what happens (notice what get's logged when u hit the enter key)
    if(e.key == "Enter"){
   	// when the user hits enter, let's create a popup w/the current text value in the input field
    socket.emit('apiReq',userInput.value)
   }
})

socket.on('apiRes', function(json){
    //change color based on json recieved^^
    json = JSON.parse(json)
    let tones = json.document_tone.tones

    let highestTone= {
        toneId:'empty',
        tone_name:'empty',
        score:0
    }
        for (var i = 0; i< tones.length; i++){
            if( tones[i].score >highestTone.score){
                highestTone = tones[i]
            }
        }
        if( highestTone.tone_id == "anger" ){
                mesh.material.color.setRGB( 255, 59, 0 )


            } else if( highestTone.tone_id == "fear" ){
                mesh.material.color.setRGB( 151, 218, 204 )
            } else if( highestTone.tone_id == "joy" ){
                mesh.material.color.setRGB( 254, 254, 0 )
            } else if( highestTone.tone_id == "analytical" ){
                mesh.material.color.setRGB( 0, 254, 0 )
            } else if( highestTone.tone_id == "confident" ){
                mesh.material.color.setRGB( 255, 0, 255 )
            } else if( highestTone.tone_id == "tentative" ){
                mesh.material.color.setRGB( 254, 254, 254 )
}

})
