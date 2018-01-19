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
			                              "FlyingVehicle.js"]) ;
			// Loads modules contained in includes and starts main function
			ModulesLoader.loadModules(start) ;
		}
) ;

var embarque;
var startRaceTime = undefined;
var AIvehicle;
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

	// Creates the vehicle (handled by physics)
	var vehicle = new FlyingVehicle(
			{
				position: new THREE.Vector3(CARx, CARy, CARz),
				zAngle : CARtheta+Math.PI/2.0,
			}
			) ;

	

	// ai Position
	var AIx = -220; 
	var AIy = 50 ; 
	var AIz = 0 ;
	var AItheta = 0 ; 
	// Create AI vehicule
	AIvehicle = new FlyingVehicle(
		{
			position: new THREE.Vector3(AIx, AIy, AIz),
			zAngle : CARtheta+Math.PI/2.0,
		}
		) ;

	//	rendering env
	var renderingEnvironment =  new ThreeRenderingEnv();

	//	lighting env
	var Lights = new ThreeLightingEnv('rembrandt','neutral','spot',renderingEnvironment,5000);

	//	Loading env
	var Loader = new ThreeLoadingEnv();

	//	Meshes
	Loader.loadMesh('assets','border_Zup_02','obj',	renderingEnvironment.scene,'border',	-340,-340,0,'front');
	Loader.loadMesh('assets','ground_Zup_03','obj',	renderingEnvironment.scene,'ground',	-340,-340,0,'front');
	Loader.loadMesh('assets','circuit_Zup_02','obj',renderingEnvironment.scene,'circuit',	-340,-340,0,'front');
	//Loader.loadMesh('assets','tree_Zup_02','obj',	renderingEnvironment.scene,'trees',	-340,-340,0,'double');
	Loader.loadMesh('assets','arrivee_Zup_01','obj',	renderingEnvironment.scene,'decors',	-340,-340,0,'front');
		
	//	Car
	// car Translation
	var carPosition = new THREE.Object3D(); 
	carPosition.name = 'car0'; 
	renderingEnvironment.addToScene(carPosition); 
	// initial POS
	carPosition.position.x = CARx;
	carPosition.position.y = CARy;
	carPosition.position.z = CARz;
	// car Rotation floor slope follow
	var carFloorSlope = new THREE.Object3D(); 
	carFloorSlope.name = 'car1';
	carPosition.add(carFloorSlope);
	// car vertical rotation
	var carRotationZ = new THREE.Object3D(); 
	carRotationZ.name = 'car2';
	carFloorSlope.add(carRotationZ);
	carRotationZ.rotation.z = CARtheta ;
	// the car itself 
	// simple method to load an object
	var carGeometry = Loader.load({filename: 'assets/car_Zup_01.obj', node: carRotationZ, name: 'car3'}) ;
	carGeometry.position.z= +0.25 ;
	// attach the scene camera to car
	carGeometry.add(renderingEnvironment.camera) ;
	renderingEnvironment.camera.position.x = 0.0 ;
	renderingEnvironment.camera.position.z = 5.0 ;
	renderingEnvironment.camera.position.y = 0.0 ;
	renderingEnvironment.camera.rotation.x = 85.0*3.14159/180.0 ;
	embarque = true;
		

	//	AICar
	// car Translation
	var aiPosition = new THREE.Object3D();
	aiPosition.name = 'AIcar1';
	renderingEnvironment.addToScene(aiPosition); 
	// initial POS
	aiPosition.position.x = AIx;
	aiPosition.position.y = AIy;
	aiPosition.position.z = AIz;
	// car Rotation floor slope follow
	var aiFloorSlope = new THREE.Object3D(); 
	aiFloorSlope.name = 'AIcar1';
	aiPosition.add(aiFloorSlope);
	// car vertical rotation
	var aiRotationZ = new THREE.Object3D(); 
	aiRotationZ.name = 'AIcar2';
	aiFloorSlope.add(aiRotationZ);
	aiRotationZ.rotation.z = AItheta ;
	// the car itself 
	// simple method to load an object
	var aiGeometry = Loader.load({filename: 'assets/car_Zup_02.obj', node: aiRotationZ, name: 'AIcar3'}) ;
	aiGeometry.position.z= +0.25 ;

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
	NAV.setPos(CARx,CARy,CARz); 
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
			if(embarque){
				embarque = false;
				carGeometry.remove(renderingEnvironment.camera);
				switchCamera(NAV, renderingEnvironment.camera, vehicle);
			}else{
				embarque = true;
				carGeometry.add(renderingEnvironment.camera) ;
				renderingEnvironment.camera.position.x = 0.0 ;
				renderingEnvironment.camera.position.z = 5.0 ;
				renderingEnvironment.camera.position.y = 0.0 ;
				renderingEnvironment.camera.rotation.x = 85.0 * Math.PI/180.0 ;
				renderingEnvironment.camera.rotation.y = 0 * Math.PI/180.0 ;
				renderingEnvironment.camera.rotation.z = 0.0 * Math.PI/180.0 ;
			}
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
			vehicle.turnRight(1000) ;
		}
		if (currentlyPressedKeys[81]) // (Q) Left 
		{		
			vehicle.turnLeft(1000) ;
		}
		if (currentlyPressedKeys[90]) // (Z) Up
		{
			vehicle.goFront(1200, 1200) ;
			if(startRaceTime == undefined) {
				startRaceTime = moment();
			}
		}
		if (currentlyPressedKeys[83]) // (S) Down 
		{
			vehicle.brake(100) ;
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
		// Vehicle stabilization 
		vehicle.goUp(vehicle.weight()/4.0, vehicle.weight()/4.0, vehicle.weight()/4.0, vehicle.weight()/4.0) ;
		vehicle.stopAngularSpeedsXY() ;
		vehicle.stabilizeSkid(50) ; 
		vehicle.stabilizeTurn(1000) ;
		var oldPosition = vehicle.position.clone() ;
		vehicle.update(1.0/60) ;
		var newPosition = vehicle.position.clone() ;
		newPosition.sub(oldPosition) ;
		// NAV
		NAV.move(newPosition.x, newPosition.y, 150,10) ;
		// carPosition
		carPosition.position.set(NAV.x, NAV.y, NAV.z) ;
		// Updates the vehicle
		vehicle.position.x = NAV.x ;
		vehicle.position.y = NAV.Y ;
		// Updates carFloorSlope
		carFloorSlope.matrixAutoUpdate = false;		
		carFloorSlope.matrix.copy(NAV.localMatrix(CARx,CARy));
		// Updates carRotationZ
		carRotationZ.rotation.z = vehicle.angles.z-Math.PI/2.0 ;

		if(nbTour == 5){
			document.getElementById('fin5Tours').style = 'position: absolute; margin-top: 30%;margin-left: 30%; font-family: Arial; color: white;background-color:rgba(128, 128, 128, .7);padding:4px;';
			document.getElementById("fin5Tours").innerHTML = "Congratulation ! You won !"
			+ "Temps total : " + totalTime + "<br>"
			+ "Meilleur tour : " + ((!bestTour)?"":bestTour) + "<br>"
			+ showLaps();
		}else{
			//renderAIvehicule();
			// Camera
			switchCamera(NAV, renderingEnvironment.camera, vehicle);
			editInfos(NAV, vehicle);
			
			//renderingEnvironment.camera.rotation.z = vehicle.angles.z-Math.PI/2.0 ;
			// Rendering
			renderingEnvironment.renderer.render(renderingEnvironment.scene, renderingEnvironment.camera);
		} 
	};

	render();
}

// Fantôme => Tour du fantôme = bestTour
var ghosts = [];
var ghostCurrentFrame = 0;
var ghostEnabled = false;

function renderAIvehicule() {
	if(ghostEnabled && ghosts[ghostCurrentFrame] != undefined) {
		AIvehicle.goUp(AIvehicle.weight()/4.0, AIvehicle.weight()/4.0, AIvehicle.weight()/4.0, AIvehicle.weight()/4.0) ;
		AIvehicle.stopAngularSpeedsXY() ;
		AIvehicle.stabilizeSkid(50) ; 
		AIvehicle.stabilizeTurn(1000) ;
		AIvehicle.update(1.0/60) ;

		AIvehicle.position.x = ghosts[ghostCurrentFrame].x
		AIvehicle.position.y = ghosts[ghostCurrentFrame].y;
		AIvehicle.position.z = ghosts[ghostCurrentFrame].z;
	}
	
}

// Gestion des tours
var nbTour = 0;
var bestTour = null;
var totalTime = null;
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
		nbTour++;
		checkpoint15 = false;
		ghostEnabled = true;
	}

	totalTime = moment(momentVar.diff(startRaceTime)).format("m:ss.SSS")
	document.getElementById("infos").innerHTML = "Vitesse : " + getVehiculeSpeed(vehicle) + "<br>"
		+ "Tour : " + (nbTour+1) + "<br>" 
		+ "Temps total : " + totalTime + "<br>"
		+ "Meilleur tour : " + ((!bestTour)?"":bestTour) + "<br>"
		+ showLaps() 
		+ "<label for=\"camera\">Changer camera</label><input type='text' enable=false value='P' size=2>";

	saveGhostPosition(NAV);	
	renderAIvehicule();
	

	const vehiculeVolume = getVehiculeSpeed(vehicle) / 100;
	document.getElementById("audioStarship").volume = (vehiculeVolume > 1) ? 1.0 : vehiculeVolume;

	lastPlane = NAV.active;
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
function saveGhostPosition(NAV) {
	ghosts.push({
		"x": NAV.x,
		"y": NAV.y,
		"z": NAV.z
	});

	if(ghostEnabled) {
		ghostCurrentFrame++;
	}
}

// Caméra
function switchCamera(NAV, camera, vehicle){
	if(!embarque){
		switch(NAV.active) {
			case "0":
			case "1":
				camera.lookAt(NAV);
				camera.position.x = -220;
				camera.position.y = -150 ;
				camera.position.z = 70;
				camera.rotation.x = 70.0 * Math.PI/180.0;
				camera.rotation.z = 0.0 * Math.PI/180.0;
				break;
			case "2":
			case "3":
			case "4":
				camera.lookAt(NAV);
				camera.position.x = -250 ;
				camera.position.y = 260 ;
				camera.position.z = NAV.z+40;
				camera.rotation.x = -60.0 * Math.PI/180.0;
				camera.rotation.z = -165.0 * Math.PI/180.0;
				break;
			case "5":
			case "6":
			case "7":
				camera.lookAt(NAV);
				camera.position.x = -80;
				camera.position.y = 260 ;
				camera.position.z = NAV.z+40;
				camera.rotation.x = -60.0 * Math.PI/180.0;
				camera.rotation.z = -165.0 * Math.PI/180.0;
				break;
			case "8":
			case "9":
			case "10":
				camera.lookAt(NAV);
				camera.position.x = 30;
				camera.position.y = 50 ;
				camera.position.z = 80;
				camera.rotation.x = 90.0 * Math.PI/180.0;
				camera.rotation.z = 0.0 * Math.PI/180.0;
				break;
			case "11":
			case "12":
			case "13":
			case "14":
				camera.lookAt(NAV);
				camera.position.x = 230;
				camera.position.y = 100 ;
				camera.position.z = 80;
				camera.rotation.x = 290.0 * Math.PI/180.0;
				camera.rotation.z = 180.0 * Math.PI/180.0;
				break;
			case "15":
			case "16":
			case "17":
				camera.lookAt(NAV);
				camera.position.x = 270;
				camera.position.y = -200 ;
				camera.position.z = 80;
				camera.rotation.x = 90.0 * Math.PI/180.0;
				camera.rotation.z = 0.0 * Math.PI/180.0;
				break;
			case "18":
			case "19":
			case "20":
				camera.lookAt(NAV);
				camera.position.x = 50;
				camera.position.y = -300 ;
				camera.position.z = 100;
				camera.rotation.x = 90.0 * Math.PI/180.0;
				camera.rotation.z = 0.0 * Math.PI/180.0;
				break;
			case "21":
			case "22":
			case "23":
			case "24":
			case "25":
				camera.lookAt(NAV);
				camera.position.x = -40;
				camera.position.y = 20 ;
				camera.position.z = 160;
				camera.rotation.x = 290.0 * Math.PI/180.0;
				camera.rotation.z = 180.0 * Math.PI/180.0;
				break;
			case "26":
			case "27":
			case "28":
			case "29":
			case "30":
				camera.lookAt(NAV);
				camera.position.x = -180;
				camera.position.y = -330 ;
				camera.position.z = 100;
				camera.rotation.x = 70.0 * Math.PI/180.0;
				camera.rotation.z = 0.0 * Math.PI/180.0;
				break;
			default:
				camera.lookAt(NAV);
				camera.position.x = NAV.x ;
				camera.position.y = NAV.y ;
				camera.position.z = NAV.z+50+vehicle.speed.length()*2 ;
				camera.rotation.x = 0.0 * Math.PI/180.0;
				camera.rotation.z = 0.0 * Math.PI/180.0;
				break;
    	}
	}
}
