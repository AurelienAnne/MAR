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
										  "Interpolators.js"]) ;
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

	/**
	 * Corps de l'helico
	 */

	//	Helico
	// helico Translation
	var helicoPosition = new THREE.Object3D(); 
	helicoPosition.name = 'helicoCorp'; 
	renderingEnvironment.addToScene(helicoPosition); 
	// initial POS
	helicoPosition.position.x = 0;
	helicoPosition.position.y = 0;
	helicoPosition.position.z = 0;
	// the helico itself 
	// simple method to load an object
	var helicoGeometry = Loader.load({filename: 'assets/helico/helicoCorp.obj', node: helicoPosition, name: 'helico'}) ;

	/**
	 * Partie Droite de l'helico 
	 */

	//	Helico Turbine Droite
	// helico Translation
	var helicoTurbineD = new THREE.Object3D(); 
	helicoTurbineD.name = 'helicoTurbineD'; 
	helicoPosition.add(helicoTurbineD);
	// initial POS
	helicoTurbineD.position.x = 8.5;
	helicoTurbineD.position.y = -3;
	helicoTurbineD.position.z = 4;
	// the turbine itself 
	// simple method to load an object
	var turbineDGeometry = Loader.load({filename: 'assets/helico/turbine.obj', node: helicoTurbineD, name: 'turbineD'}) ;

	//	Helico Axe Droite
	// helico Translation
	var helicoAxeD = new THREE.Object3D(); 
	helicoAxeD.name = 'helicoAxeD'; 
	helicoTurbineD.add(helicoAxeD);
	// initial POS
	helicoAxeD.position.x = 0; //8.5
	helicoAxeD.position.y = 1; //-2
	helicoAxeD.position.z = 0; //4
	// the axe itself 
	// simple method to load an object
	var axeDGeometry = Loader.load({filename: 'assets/helico/axe.obj', node: helicoAxeD, name: 'axeD'});

	//	Helico Pales Droites
	var helicoPaleD1 = new THREE.Object3D(); 
	helicoPaleD1.name = 'helicoPaleD1';
	axeDGeometry.add(helicoPaleD1);
	// initial POS
	helicoPaleD1.position.x = 0; //0
	helicoPaleD1.position.y = 2; //0
	helicoPaleD1.position.z = 0; //5
	// the axe itself 
	// simple method to load an object
	var paleD1Geometry = Loader.load({filename: 'assets/helico/pale.obj', node: helicoPaleD1, name: 'paleD1'});

	//	Helico Pales Droites
	var helicoPaleD2 = new THREE.Object3D(); 
	helicoPaleD2.name = 'helicoPaleD2';
	axeDGeometry.add(helicoPaleD2);
	// initial POS
	helicoPaleD2.position.x = 0; //0
	helicoPaleD2.position.y = 2; //0
	helicoPaleD2.position.z = 0; //5
	helicoPaleD2.rotation.y = 120 * Math.PI / 180;
	// the axe itself 
	// simple method to load an object
	var paleD2Geometry = Loader.load({filename: 'assets/helico/pale.obj', node: helicoPaleD2, name: 'paleD2'});

	//	Helico Pales Droites
	var helicoPaleD3 = new THREE.Object3D(); 
	helicoPaleD3.name = 'helicoPaleD3';
	axeDGeometry.add(helicoPaleD3);
	// initial POS
	helicoPaleD3.position.x = 0; //0
	helicoPaleD3.position.y = 2; //0
	helicoPaleD3.position.z = 0; //5
	helicoPaleD3.rotation.y = -120 * Math.PI / 180;
	// the axe itself 
	// simple method to load an object
	var paleD3Geometry = Loader.load({filename: 'assets/helico/pale.obj', node: helicoPaleD3, name: 'paleD3'});

	/**
	 * Partie Gauche de l'helico
	 */

	//	Helico Turbine Gauche
	// helico Translation
	var helicoTurbineG = new THREE.Object3D(); 
	helicoTurbineG.name = 'helicoTurbineG'; 
	helicoPosition.add(helicoTurbineG);
	// initial POS
	helicoTurbineG.position.x = -8.5;
	helicoTurbineG.position.y = -3;
	helicoTurbineG.position.z = 4;
	// the turbine itself 
	// simple method to load an object
	var turbineGGeometry = Loader.load({filename: 'assets/helico/turbine.obj', node: helicoTurbineG, name: 'turbineG'});

	//	Helico Axe Gauche
	// helico Translation
	var helicoAxeG = new THREE.Object3D(); 
	helicoAxeG.name = 'helicoAxeG'; 
	helicoTurbineG.add(helicoAxeG);
	// initial POS
	helicoAxeG.position.x = 0; //-8.5
	helicoAxeG.position.y = 1; //-2
	helicoAxeG.position.z = 0; //4
	// the axe itself 
	// simple method to load an object
	var axeGGeometry = Loader.load({filename: 'assets/helico/axe.obj', node: helicoAxeG, name: 'axeG'}) ;

	//	Helico Pales Gauches
	var helicoPaleG1 = new THREE.Object3D(); 
	helicoPaleG1.name = 'helicoPaleG1';
	axeGGeometry.add(helicoPaleG1);
	// initial POS
	helicoPaleG1.position.x = 0; //0
	helicoPaleG1.position.y = 2; //0
	helicoPaleG1.position.z = 0; //5
	// the axe itself 
	// simple method to load an object
	var paleG1Geometry = Loader.load({filename: 'assets/helico/pale.obj', node: helicoPaleG1, name: 'paleG1'});

	//	Helico Pales Gauches
	var helicoPaleG2 = new THREE.Object3D(); 
	helicoPaleG2.name = 'helicoPaleG2';
	axeGGeometry.add(helicoPaleG2);
	// initial POS
	helicoPaleG2.position.x = 0; //0
	helicoPaleG2.position.y = 2; //0
	helicoPaleG2.position.z = 0; //5
	helicoPaleG2.rotation.y = 120 * Math.PI / 180;
	// the axe itself 
	// simple method to load an object
	var paleG2Geometry = Loader.load({filename: 'assets/helico/pale.obj', node: helicoPaleG2, name: 'paleG2'});

	//	Helico Pales Gauches
	var helicoPaleG3 = new THREE.Object3D(); 
	helicoPaleG3.name = 'helicoPaleG3';
	axeGGeometry.add(helicoPaleG3);
	// initial POS
	helicoPaleG3.position.x = 0; //0
	helicoPaleG3.position.y = 2; //0
	helicoPaleG3.position.z = 0; //5
	helicoPaleG3.rotation.y = -120 * Math.PI / 180;
	// the axe itself 
	// simple method to load an object
	var paleG3Geometry = Loader.load({filename: 'assets/helico/pale.obj', node: helicoPaleG3, name: 'paleG3'});

	//	Helico Turbine Centrale
	// helico Translation
	var helicoTurbineC = new THREE.Object3D(); 
	helicoTurbineC.name = 'helicoTurbineC'; 
	helicoPosition.add(helicoTurbineC);
	// initial POS
	helicoTurbineC.position.x = 0;
	helicoTurbineC.position.y = 0;
	helicoTurbineC.position.z = 4;
	helicoTurbineC.rotation.x = 90*Math.PI / 180;
	// the turbine itself 
	// simple method to load an object
	var turbineCGeometry = Loader.load({filename: 'assets/helico/turbine.obj', node: helicoTurbineC, name: 'turbineC'});

	//	Helico Axe Central
	// helico Translation
	var helicoAxeC = new THREE.Object3D(); 
	helicoAxeC.name = 'helicoAxeC'; 
	helicoTurbineC.add(helicoAxeC);
	// initial POS
	helicoAxeC.position.x = 0; //0
	helicoAxeC.position.y = 1; //0
	helicoAxeC.position.z = 0; //5
	// the axe itself 
	// simple method to load an object
	var axeCGeometry = Loader.load({filename: 'assets/helico/axe.obj', node: helicoAxeC, name: 'axeC'}) ;

	//	Helico Pales Centrales
	var helicoPaleC1 = new THREE.Object3D(); 
	helicoPaleC1.name = 'helicoPaleC1';
	axeCGeometry.add(helicoPaleC1);
	// initial POS
	helicoPaleC1.position.x = 0; //0
	helicoPaleC1.position.y = 2; //0
	helicoPaleC1.position.z = 0; //5
	// the axe itself 
	// simple method to load an object
	var paleC1Geometry = Loader.load({filename: 'assets/helico/pale.obj', node: helicoPaleC1, name: 'paleC1'});

	//	Helico Pales Centrales
	var helicoPaleC2 = new THREE.Object3D(); 
	helicoPaleC2.name = 'helicoPaleC2';
	axeCGeometry.add(helicoPaleC2);
	// initial POS
	helicoPaleC2.position.x = 0; //0
	helicoPaleC2.position.y = 2; //0
	helicoPaleC2.position.z = 0; //5
	helicoPaleC2.rotation.y = 120 * Math.PI / 180;
	// the axe itself 
	// simple method to load an object
	var paleC2Geometry = Loader.load({filename: 'assets/helico/pale.obj', node: helicoPaleC2, name: 'paleC2'});

	//	Helico Pales Centrales
	var helicoPaleC3 = new THREE.Object3D(); 
	helicoPaleC3.name = 'helicoPaleC3';
	axeCGeometry.add(helicoPaleC3);
	// initial POS
	helicoPaleC3.position.x = 0; //0
	helicoPaleC3.position.y = 2; //0
	helicoPaleC3.position.z = 0; //5
	helicoPaleC3.rotation.y = -120 * Math.PI / 180;
	// the axe itself 
	// simple method to load an object
	var paleC3Geometry = Loader.load({filename: 'assets/helico/pale.obj', node: helicoPaleC3, name: 'paleC3'});

	/**
	 * Fin de l'helico
	 */

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

		helicoAxeC.rotation.y += 15*Math.PI/180;
		helicoAxeG.rotation.y += 15*Math.PI/180;
		helicoAxeD.rotation.y += 15*Math.PI/180;
	};

	render(); 
}