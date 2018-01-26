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
										  "Vehicule.js",
										  "FlyingVehicle.js", 
										  "Crates.js", 
										  "Camera.js", 
										  "ATH.js",
										  "Helico.js" ]);
			// Loads modules contained in includes and starts main function
			ModulesLoader.loadModules(start) ;
		}
) ;

var startRaceTime = undefined;
var actualTour = null;
var momentVar = null;
var hasChosenHelico = true;
document.getElementById("audioMusic").volume = 0.3;
document.getElementById("audioStarship").volume = 0.0;
			
function start()
{
	//	----------------------------------------------------------------------------
	//	MAR 2014 - nav test
	//	author(s) : Cozot, R. and Lamarche, F.
	//	date : 11/16/2014
	//	last : 11/25/2014
	//	---------------------------------------------------------------------------- 			
	//	global vars
	//	----------------------------------------------------------------------------
	//	keyPressed
	var currentlyPressedKeys = {};
	
	// car Position
	var CARx = -220; 
	var CARy = 0 ; 
	var CARz = 0 ;
	var CARtheta = 0 ; 

	//	rendering env
	var renderingEnvironment =  new ThreeRenderingEnv();

	//	lighting env
	var Lights = new ThreeLightingEnv('rembrandt','neutral','spot',renderingEnvironment,5000);

	//	Loading env
	var Loader = new ThreeLoadingEnv();

	if(hasChosenHelico){
		playerCar = new Helico(-220,0,0,0,"PlayerCar", Loader, renderingEnvironment);
	}else{
		playerCar = new Vehicule(-220,0,0,0,"PlayerCar", Loader, renderingEnvironment);
	}	
	AIcar = new Vehicule(-220,-50,0,0,"AIcar", Loader, renderingEnvironment);

	//	Meshes
	Loader.loadMesh('assets','border_Zup_02','obj',	renderingEnvironment.scene,'border',	-340,-340,0,'front');
	Loader.loadMesh('assets','ground_Zup_03','obj',	renderingEnvironment.scene,'ground',	-340,-340,0,'front');
	Loader.loadMesh('assets','circuit_Zup_02','obj',renderingEnvironment.scene,'circuit',	-340,-340,0,'front');
	//Loader.loadMesh('assets','tree_Zup_02','obj',	renderingEnvironment.scene,'trees',	-340,-340,0,'double');
	Loader.loadMesh('assets','arrivee_Zup_01','obj',	renderingEnvironment.scene,'decors',	-340,-340,0,'front');

	var crates = new Crates(renderingEnvironment.scene);
	var camera = new Camera();
	ath = new ATH();
	
	//	Car
	// the car itself 
	// simple method to load an object
	var carGeometry = playerCar.carGeometry;
	carGeometry.position.z= +0.25 ;
	// attach the scene camera to car
	playerCar.carGeometry.add(renderingEnvironment.camera) ;
	renderingEnvironment.camera.position.x = 0.0 ;
	renderingEnvironment.camera.position.z = 10.0 ;
	renderingEnvironment.camera.position.y = -10.0 ;
	renderingEnvironment.camera.rotation.x = 85.0*3.14159/180.0 ;

	//	Skybox
	Loader.loadSkyBox('assets/maps',['px','nx','py','ny','pz','nz'],'jpg', renderingEnvironment.scene, 'sky',4000);

	//	Planes Set for Navigation 
	// 	z up 
	var NAV = new navPlaneSet(
					new navPlane('p01',	-260, -180,	 -80, 120,	+0,+0,'px')); 		// 01	
	NAV.addPlane(	new navPlane('p02', -260, -180,	 120, 200,	+0,+20,'py')); 		// 02		
	NAV.addPlane(	new navPlane('p03', -260, -240,	 200, 240,	+20,+20,'px')); 	// 03		
	NAV.addPlane(	new navPlane('p04', -240, -160,  200, 260,	+20,+20,'px')); 	// 04		
	NAV.addPlane(	new navPlane('p05', -160,  -80,  200, 260,	+20,+40,'px')); 	// 05		
	NAV.addPlane(	new navPlane('p06',  -80, -20,   200, 260,	+40,+60,'px')); 	// 06		
	NAV.addPlane(	new navPlane('p07',  -20,  +40,  140, 260,	+60,+60,'px')); 	// 07		
	NAV.addPlane(	new navPlane('p08',    0,  +80,  100, 140,	+60,+60,'px')); 	// 08		
	NAV.addPlane(	new navPlane('p09',   20, +100,   60, 100,	+60,+60,'px')); 	// 09		
	NAV.addPlane(	new navPlane('p10',   40, +100,   40,  60,	+60,+60,'px')); 	// 10		
	NAV.addPlane(	new navPlane('p11',  100,  180,   40, 100,	+40,+60,'nx')); 	// 11		
	NAV.addPlane(	new navPlane('p12',  180,  240,   40,  80,	+40,+40,'px')); 	// 12		
	NAV.addPlane(	new navPlane('p13',  180,  240,    0,  40,	+20,+40,'py')); 	// 13 		
	NAV.addPlane(	new navPlane('p14',  200,  260,  -80,   0,	+0,+20,'py')); 		// 14		
	NAV.addPlane(	new navPlane('p15',  180,  240, -160, -80,	+0,+40,'ny')); 		// 15		
	NAV.addPlane(	new navPlane('p16',  160,  220, -220,-160,	+40,+40,'px')); 	// 16	
	NAV.addPlane(	new navPlane('p17',   80,  160, -240,-180,	+40,+40,'px')); 	// 17	
	NAV.addPlane(	new navPlane('p18',   20,   80, -220,-180,	+40,+40,'px')); 	// 18	
	NAV.addPlane(	new navPlane('p19',   20,   80, -180,-140,	+40,+60,'py')); 	// 19	
	NAV.addPlane(	new navPlane('p20',   20,   80, -140,-100,	+60,+80,'py')); 	// 20	
	NAV.addPlane(	new navPlane('p21',   20,   60, -100, -40,	+80,+80,'px')); 	// 21		
	NAV.addPlane(	new navPlane('p22',  -80,   20, -100, -40,	+80,+80,'px')); 	// 22		
	NAV.addPlane(	new navPlane('p23', -140,  -80, -100, -40,	+80,+80,'px')); 	// 23		
	NAV.addPlane(	new navPlane('p24', -140,  -80, -140,-100,	+60,+80,'py')); 	// 24		
	NAV.addPlane(	new navPlane('p25', -140,  -80, -200,-140,	+40,+60,'py')); 	// 25		
	NAV.addPlane(	new navPlane('p26', -100,  -80, -240,-200,	+40,+40,'px')); 	// 26		
	NAV.addPlane(	new navPlane('p27', -220, -100, -260,-200,	+40,+40,'px')); 	// 27	
	NAV.addPlane(	new navPlane('p28', -240, -220, -240,-200,	+40,+40,'px')); 	// 28	
	NAV.addPlane(	new navPlane('p29', -240, -180, -200,-140,	+20,+40,'ny')); 	// 29	
	NAV.addPlane(	new navPlane('p30', -240, -180, -140, -80,	+0,+20,'ny')); 		// 30			
	NAV.setPos(playerCar.CARx,playerCar.CARy,playerCar.CARz); 
	NAV.initActive();
	// DEBUG
	//NAV.debug();
	//var navMesh = NAV.toMesh();
	//renderingEnvironment.addToScene(navMesh);
	//	event listener
	//	---------------------------------------------------------------------------
	//	resize window
	window.addEventListener( 'resize', onWindowResize, false );
	//	keyboard callbacks 
	document.onkeydown = handleKeyDown;
	document.onkeyup = handleKeyUp;

	//	callback functions
	//	---------------------------------------------------------------------------
	function handleKeyDown(event) { 
		currentlyPressedKeys[event.keyCode] = true;
		if (event.keyCode == 80) // (P) Down 
		{
			camera.switch(NAV, renderingEnvironment.camera, playerCar, carGeometry);
		}
	}
	function handleKeyUp(event) {currentlyPressedKeys[event.keyCode] = false;}

	function handleKeys() {
		if (currentlyPressedKeys[67]) // (C) debug
		{
			// debug scene
			renderingEnvironment.scene.traverse(function(o){
				console.log('object:'+o.name+'>'+o.id+'::'+o.type);
			});
		}				
		if (currentlyPressedKeys[68]) // (D) Right
		{
			playerCar.vehicle.turnRight(1000) ;
			saveGhostPosition(NAV, "R");
			inputCurrentTurn.push({
				"x": NAV.x,
				"y": NAV.y,
				"z": NAV.z,
				"key": "R"
			});

			if(hasChosenHelico){
				if(playerCar.helicoTurbineD.rotation.z > -30*Math.PI/180){
					playerCar.helicoTurbineD.rotation.z += -2*Math.PI/180;
					playerCar.helicoTurbineG.rotation.z += -2*Math.PI/180;
				}
			}
		}
		if (currentlyPressedKeys[81]) // (Q) Left 
		{		
			playerCar.vehicle.turnLeft(1000) ;
			saveGhostPosition(NAV, "L");
			inputCurrentTurn.push({
				"x": NAV.x,
				"y": NAV.y,
				"z": NAV.z,
				"key": "L"
			});

			if(hasChosenHelico){
				if(playerCar.helicoTurbineD.rotation.z < 30*Math.PI/180){
					playerCar.helicoTurbineD.rotation.z += 2*Math.PI/180;
					playerCar.helicoTurbineG.rotation.z += 2*Math.PI/180;
				}
			}
		}
		if (currentlyPressedKeys[90]) // (Z) Up
		{
			playerCar.vehicle.goFront(1200, 1200);	
			inputCurrentTurn.push({
				"x": NAV.x,
				"y": NAV.y,
				"z": NAV.z,
				"key": "U"
			});
			
			saveGhostPosition(NAV, "U");
			if(startRaceTime == undefined) {
				startRaceTime = moment();
			}

			if(hasChosenHelico){
				if(playerCar.helicoTurbineD.rotation.z > 0){
					playerCar.helicoTurbineD.rotation.z += -1*Math.PI/180;
					playerCar.helicoTurbineG.rotation.z += -1*Math.PI/180;
				}else if(playerCar.helicoTurbineD.rotation.z < 0){
					playerCar.helicoTurbineD.rotation.z += 1*Math.PI/180;
					playerCar.helicoTurbineG.rotation.z += 1*Math.PI/180;
				}
			}
		}
		if (currentlyPressedKeys[83]) // (S) Down 
		{
			playerCar.vehicle.brake(100);
			inputCurrentTurn.push({
				"x": NAV.x,
				"y": NAV.y,
				"z": NAV.z,
				"key": "D"
			});
			saveGhostPosition(NAV, "D");
		}
		if(currentlyPressedKeys[72]) { // (H) Hack 
			nextLap(NAV);
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
		
		renderVehicule(playerCar);
		renderAIvehicule();
		editInfos(NAV, playerCar.vehicle);

//		renderingEnvironment.camera.rotation.z = vehicle.angles.z-Math.PI/2.0 ;
		// Rendering
		renderingEnvironment.renderer.render(renderingEnvironment.scene, renderingEnvironment.camera); 
	
		function renderVehicule(v){

			// Vehicle stabilization 
			v.vehicle.goUp(v.vehicle.weight()/4.0, v.vehicle.weight()/4.0, v.vehicle.weight()/4.0, v.vehicle.weight()/4.0) ;
			v.vehicle.stopAngularSpeedsXY() ;
			v.vehicle.stabilizeSkid(50) ; 
			v.vehicle.stabilizeTurn(1000) ;
			
			var oldPosition = v.vehicle.position.clone() ;
			v.vehicle.update(1.0/60) ;
			var newPosition = v.vehicle.position.clone() ;
			newPosition.sub(oldPosition) ;
			
			// NAV
			NAV.move(newPosition.x, newPosition.y, 150,10) ;
			// carPosition
			v.carPosition.position.set(NAV.x, NAV.y, NAV.z) ;
			// Updates the vehicle
			v.vehicle.position.x = NAV.x ;
			v.vehicle.position.y = NAV.Y ;
			// Updates carFloorSlope
			v.carFloorSlope.matrixAutoUpdate = false;		
			v.carFloorSlope.matrix.copy(NAV.localMatrix(v.CARx, v.CARy));
			
			// Helico pales
			if(hasChosenHelico){
				v.helicoAxeC.rotation.y += (v.vehicle.getVehiculeSpeed()/5)*Math.PI/180;
				v.helicoAxeG.rotation.y += (v.vehicle.getVehiculeSpeed()/5)*Math.PI/180;
				v.helicoAxeD.rotation.y += (v.vehicle.getVehiculeSpeed()/5)*Math.PI/180;
			}
			
			// Updates carRotationZ
			v.carRotationZ.rotation.z = v.vehicle.angles.z-Math.PI/2.0 ;
		}

		if (nbLap == 5) {
			ath.showEnd();
		} else {
			// Camera
			camera.update(NAV, renderingEnvironment.camera, playerCar.vehicle);
			
			// Crates
			const crate = crates.detectCrateCollision(NAV);
			if (crate != undefined) {
				ath.score += crate.pts;
			}
			
			// Laps
			if(NAV.active == "15") {
				checkpoint15 = true;
			}
			momentVar = moment();
			if (lastPlane == "0" && NAV.active == "1" && checkpoint15) {
				laps.push(momentVar);
				if(!bestTour)
					bestTour = moment(momentVar.diff(startRaceTime)).format("m:ss.SSS")
				else{
					actualTour = moment(momentVar.diff(laps[laps.length-2])).format("m:ss.SSS");
					if(actualTour < bestTour)
						bestTour = actualTour; 
				}
				nbLap++;
				checkpoint15 = false;
				ghostEnabled = true;
			}
			lastPlane = NAV.active;
		
			// ATH
			totalTime = moment(momentVar.diff(startRaceTime)).format("m:ss.SSS")
			ath.update(NAV, playerCar.vehicle, nbLap);
		
			saveGhostPosition(NAV);	
			renderAIvehicule();
		
			// Sound
			const vehiculeVolume = playerCar.vehicle.getVehiculeSpeed() / 100;
			document.getElementById("audioStarship").volume = (vehiculeVolume > 1) ? 1.0 : vehiculeVolume;			
	
			// Rendering
			renderingEnvironment.renderer.render(renderingEnvironment.scene, renderingEnvironment.camera); 
	}
	};

	render();
}

// Fantôme => Tour du fantôme = bestTour
var ghosts = [];
var ghostEnabled = false;
var inputCurrentTurn = [];
var currentGhostFrame = 0;

function renderAIvehicule(NAV) {
	if(ghostEnabled && ghosts[currentGhostFrame] != undefined) {
		var v = AIcar;
		if (ghosts[currentGhostFrame].key == "U"){
			v.vehicle.goFront(1200, 1200);
		}
		if (ghosts[currentGhostFrame].key == "D"){
			v.vehicle.brake(100);
		}
		if (ghosts[currentGhostFrame].key == "R"){
			v.vehicle.turnRight(1000) ;
		}
		if (ghosts[currentGhostFrame].key == "L"){
			v.vehicle.turnLeft(1000) ;
		}
		var aiCarVehicule = AIcar.vehicle;

		// Vehicle stabilization 
		v.vehicle.goUp(v.vehicle.weight()/4.0, v.vehicle.weight()/4.0, v.vehicle.weight()/4.0, v.vehicle.weight()/4.0) ;
		v.vehicle.stopAngularSpeedsXY() ;
		v.vehicle.stabilizeSkid(50) ; 
		v.vehicle.stabilizeTurn(1000);
		var oldPosition = v.vehicle.position.clone() ;
		v.vehicle.update(1.0/60) ;
		var newPosition = v.vehicle.position.clone() ;
		newPosition.sub(oldPosition) ;
		
		// NAV
		// NAV.move(newPosition.x, newPosition.y, 150,10) ;
		// carPosition
		v.carPosition.position.set(ghosts[currentGhostFrame].x, ghosts[currentGhostFrame].y, ghosts[currentGhostFrame].z) ;
		// Updates the vehicle
		v.vehicle.position.x = ghosts[currentGhostFrame].x ;
		v.vehicle.position.y = ghosts[currentGhostFrame].y ;
		// Updates carFloorSlopefunction
		v.carFloorSlope.matrixAutoUpdate = false;		
		//v.carFloorSlope.matrix.copy(NAV.localMatrix(v.CARx, v.CARy));					

		// Updates carRotationZ
		v.carRotationZ.rotation.z = v.vehicle.angles.z-Math.PI/2.0 ;
		currentGhostFrame++;
		if(currentGhostFrame >= ghosts.length){
			currentGhostFrame = 0;
			if(ghosts.best != null)
				ghosts = ghosts.best;
		}
		//console.log(NAV.planeSet[0].isIn(AIcar.vehicle.position.x, AIcar.vehicle.position.y));
	}	
}

// Gestion des tours
var nbTour = 0;
var nbLap = 0;
var bestTurn = 0;
var bestTour = null;
var actualTour = null;
var momentVar = null;
var lastPlane = "1";
var laps = [];
var checkpoint15 = false;

function editInfos(NAV, vehicle) {
	document.getElementById('infos').style = 'position: absolute; margin-top: 10px;margin-left: 10px; font-family: Arial; color: white;background-color:rgba(128, 128, 128, .7);padding:4px;';
	if(NAV.active == "15") {
		checkpoint15 = true;
	}
	if (lastPlane == "0" && NAV.active == "1" && checkpoint15) {
		momentVar = moment();
		laps.push(momentVar);
		if(!bestTour){
			bestTour = moment(momentVar.diff(startRaceTime)).format("m:ss.SSS");
			bestTurn = nbTour;
			ghosts.best = inputCurrentTurn;
		}
		else{
			actualTour = moment(momentVar.diff(laps[laps.length-2])).format("m:ss.SSS");
			if(actualTour < bestTour){
				bestTour = actualTour;				
				bestTurn = nbTour;
				ghosts.best = inputCurrentTurn;
			}
				
		}
		nbTour++;
		inputCurrentTurn = [];
		checkpoint15 = false;
		ghostEnabled = true;
	}

	document.getElementById("infos").innerHTML = "Vitesse : " + getVehiculeSpeed(vehicle) + "<br>"
		+ "Tour : " + (nbTour+1) + "<br>" 
		+ "Temps total : " + moment(moment().diff(startRaceTime)).format("m:ss.SSS") + "<br>"
		+ "Meilleur temps : " + ((!bestTour)?"":bestTour) + " au tour n°"+ (bestTurn+1)+"<br>"
		+ showLaps() 
		+ "<label for=\"camera\">Changer camera</label><input type='text' enable=false value='P' size=2>";

	//saveGhostPosition(NAV);	
	renderAIvehicule(NAV);
	

	const vehiculeVolume = getVehiculeSpeed(vehicle) / 100;
	document.getElementById("audioStarship").volume = (vehiculeVolume > 1) ? 1.0 : vehiculeVolume;

	lastPlane = NAV.active;
	

	
	//console.log(NAV.planeSet[0].isIn(AIcar.vehicle.position.x, AIcar.vehicle.position.y));
}

function showLaps() {
	var html = "";
	for(let i = 0; i < laps.length; i++) {
		var ref;
		if (i == 0) {
			ref = startRaceTime;
		}
		else {
			ref = laps[i-1];
		}
		html += "> Tour " + (i+1) + " : " + moment(laps[i].diff(ref)).format("m:ss.SSS") + "<br>";
	}
	return html;
}

function getVehiculeSpeed(vehicle) {
	return Math.max(Math.abs(vehicle.speed.x), Math.abs(vehicle.speed.y), Math.abs(vehicle.speed.z)).toFixed(0);	
}

// Cheat mode
function nextLap(NAV) {
	checkpoint15 = true;
	NAV.active = "29";
	NAV.x = -221.1913160491978;
	NAV.y = -89.90764169051636
	NAV.z = 3.30254723017212;
}

// Ghost
function saveGhostPosition(NAV, key) {
	ghosts.push({
		"x": NAV.x,
		"y": NAV.y,
		"z": NAV.z,
		"key": key
	});
}
