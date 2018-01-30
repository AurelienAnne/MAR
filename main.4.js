/**
 *  ThreeJS test file using the ThreeRender class
 */

//Loads all dependencies
requirejs(['ModulesLoaderV2.js'], function()
		{ 
			// Level 0 includes
			ModulesLoader.requireModules(["threejs/three.min.js"]) ;
			ModulesLoader.requireModules([ "myJS/ThreeRenderingEnv.js", 
			                              "myJS/ThreeLightingEnv.js", 
			                              "myJS/ThreeLoadingEnv.js", 
			                              "myJS/navZ.js",
										  "FlyingVehicle.js",
										  "ParticleSystem.js",
										  "Interpolators.js",
										  "Helico.js"]) ;
			// Loads modules contained in includes and starts main function
			ModulesLoader.loadModules(start) ;
		}
) ;

var particlesGenerators = [];
var renderingEnvironment;
var helico;

function start()
{
	//	----------------------------------------------------------------------------
	//	MAR 2014 - TP Animation hélicoptère
	//	author(s) : Cozot, R. and Lamarche, F.
	//	---------------------------------------------------------------------------- 			
	//	global vars
	//	----------------------------------------------------------------------------
	//	keyPressed
	var currentlyPressedKeys = {};
	
	//	rendering env
	renderingEnvironment =  new ThreeRenderingEnv();

	//	lighting env
	var Lights = new ThreeLightingEnv('rembrandt','neutral','spot',renderingEnvironment,5000);

	//	Loading env
	var Loader = new ThreeLoadingEnv();

	// car Position
	var CARx = 0; 
	var CARy = 0 ; 
	var CARz = 0 ;
	var CARtheta = 0 ; 
	
	helico = new Helico(CARx, CARy, CARz, CARtheta, "helico", Loader, renderingEnvironment);
	helico.activeParticles(true, false, true);
	
	// Camera setup
	renderingEnvironment.camera.position.x = 0 ;
	renderingEnvironment.camera.position.y = 0 ;
	renderingEnvironment.camera.position.z = 40 ;
	
	//	event listener
	//	---------------------------------------------------------------------------
	//	resize window
	window.addEventListener( 'resize', onWindowResize, false );
	//	keyboard callbacks 
	document.onkeydown = handleKeyDown;
	document.onkeyup = handleKeyUp;					

	//	callback functions
	//	---------------------------------------------------------------------------
	function handleKeyDown(event) { currentlyPressedKeys[event.keyCode] = true;}
	function handleKeyUp(event) {currentlyPressedKeys[event.keyCode] = false;}

	function handleKeys() {
		if (currentlyPressedKeys[67]) // (C) debug
		{
			// debug scene
			renderingEnvironment.scene.traverse(function(o){
				console.log('object:'+o.name+'>'+o.id+'::'+o.type);
			});
		}				
		var rotationIncrement = 0.05 ;
		if (currentlyPressedKeys[68]) // (D) Right
		{
			renderingEnvironment.scene.rotateOnAxis(new THREE.Vector3(0.0,1.0,0.0), rotationIncrement) ;
		}
		if (currentlyPressedKeys[81]) // (Q) Left 
		{		
			renderingEnvironment.scene.rotateOnAxis(new THREE.Vector3(0.0,1.0,0.0), -rotationIncrement) ;
		}
		if (currentlyPressedKeys[90]) // (Z) Up
		{
			renderingEnvironment.scene.rotateOnAxis(new THREE.Vector3(1.0,0.0,0.0), rotationIncrement) ;
		}
		if (currentlyPressedKeys[83]) // (S) Down 
		{
			renderingEnvironment.scene.rotateOnAxis(new THREE.Vector3(1.0,0.0,0.0), -rotationIncrement) ;
		}

		if (currentlyPressedKeys[65]) // (A) Down 
		{
			if(helico.helicoTurbineD.rotation.z < 30*Math.PI/180){
				helico.helicoTurbineD.rotation.z += 2*Math.PI/180;
				helico.helicoTurbineG.rotation.z += 2*Math.PI/180;
			}
		}
		if (currentlyPressedKeys[69]) // (E) Down 
		{
			if(helico.helicoTurbineD.rotation.z > -30*Math.PI/180){
				helico.helicoTurbineD.rotation.z += -2*Math.PI/180;
				helico.helicoTurbineG.rotation.z += -2*Math.PI/180;
			}
		}
	}

	//	window resize
	function  onWindowResize() 
	{
		renderingEnvironment.onWindowResize(window.innerWidth,window.innerHeight);
	}

	function render() { 
		requestAnimationFrame( render );
		handleKeys();

		// Rendering
		helico.renderParticles();
		renderingEnvironment.renderer.render(renderingEnvironment.scene, renderingEnvironment.camera);

		helico.helicoAxeC.rotation.y += 15*Math.PI/180;
		helico.helicoAxeG.rotation.y += 15*Math.PI/180;
		helico.helicoAxeD.rotation.y += 15*Math.PI/180;
	};

	render(); 
}