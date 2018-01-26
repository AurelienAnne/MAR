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
	var renderingEnvironment =  new ThreeRenderingEnv();

	//	lighting env
	var Lights = new ThreeLightingEnv('rembrandt','neutral','spot',renderingEnvironment,5000);

	//	Loading env
	var Loader = new ThreeLoadingEnv();

	// car Position
	var CARx = 0; 
	var CARy = 0 ; 
	var CARz = 0 ;
	var CARtheta = 0 ; 
	
	var helico = new Helico(CARx, CARy, CARz, CARtheta, "helico", Loader, renderingEnvironment);

	/**
	 * Particules
	 */

	 // TODO: Question 8 - 9
	var particlesGenerators = [];

	particlesGenerators.push(new ParticleSystem.Engine_Class({ 
		textureFile: 'assets/particles/particle.png',
		particlesCount: 10000,
		blendingMode: THREE.AdditiveBlending
	}));
	particlesGenerators.push(new ParticleSystem.Engine_Class({ 
		textureFile: 'assets/particles/particle.png',
		particlesCount: 10000,
		blendingMode: THREE.AdditiveBlending
	}));

	particlesGenerators[0].addEmitter(new ParticleSystem.ConeEmitter_Class({
		cone: {
			center: new THREE.Vector3(-8.5, 2, 4),
			height: new THREE.Vector3(0,-1,0),
			radius: 1,
			flow: 1000
		},
		particle: {
			speed: new MathExt.Interval_Class(5, 10),
			mass: new MathExt.Interval_Class(0.1, 0.3),
			size: new MathExt.Interval_Class(0.1, 1.0),
			lifeTime: new MathExt.Interval_Class(1.0, 7.0)
		}
	}));

	particlesGenerators[1].addEmitter(new ParticleSystem.ConeEmitter_Class({
		cone: {
			center: new THREE.Vector3(8.5, 2, 4),
			height: new THREE.Vector3(0,-1,0),
			radius: 1,
			flow: 1000
		},
		particle: {
			speed: new MathExt.Interval_Class(5, 10),
			mass: new MathExt.Interval_Class(0.1, 0.3),
			size: new MathExt.Interval_Class(0.1, 1.0),
			lifeTime: new MathExt.Interval_Class(1.0, 7.0)
		}
	}));

	particlesGenerators.forEach(gen => {		
		gen.addModifier(new ParticleSystem.LifeTimeModifier_Class());
		gen.addModifier(new ParticleSystem.ForceModifier_Weight_Class());
		gen.addModifier(new ParticleSystem.PositionModifier_EulerItegration_Class());
		gen.addModifier(new ParticleSystem.OpacityModifier_TimeToDeath_Class(new Interpolators.Linear_Class(0.9, 0.3)));
		gen.addModifier(new ParticleSystem.ColorModifier_TimeToDeath_Class({ r: 77/255, g: 77/255, b: 0}, { r: 139/255, g: 0, b: 0}))
		renderingEnvironment.addToScene(gen.particleSystem);
	});	
	
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
			helico.helicoTurbineD.rotation.z += 2*Math.PI/180;
			helico.helicoTurbineG.rotation.z += 2*Math.PI/180;

			particlesGenerators[1].emitters[0].center = 
					(helico.helicoAxeD.position);
		}
		if (currentlyPressedKeys[69]) // (E) Down 
		{
			helico.helicoTurbineD.rotation.z += -2*Math.PI/180;
			helico.helicoTurbineG.rotation.z += -2*Math.PI/180;
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
		particlesGenerators.forEach(particlesSys => {
			particlesSys.animate(0.5, renderingEnvironment.scene);
		});
		renderingEnvironment.renderer.render(renderingEnvironment.scene, renderingEnvironment.camera);

		helico.helicoAxeC.rotation.y += 15*Math.PI/180;
		helico.helicoAxeG.rotation.y += 15*Math.PI/180;
		helico.helicoAxeD.rotation.y += 15*Math.PI/180;
	};

	render(); 
}