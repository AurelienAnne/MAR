function Helico(initX, initY, initZ, Inittheta, name, Loader, renderingEnvironment)
{
    // car Position
	this.CARx = initX; 
	this.CARy = initY ; 
	this.CARz = initZ ;
    this.CARtheta = Inittheta ;
    
    this.vehicle = new FlyingVehicle(
    {
        position: new THREE.Vector3(this.CARx, this.CARy, this.CARz),
        zAngle : this.CARtheta+Math.PI/2.0,
    }
    ) ;
    
    //	Helico
	// helico Translation
	this.carPosition = new THREE.Object3D(); 
	this.carPosition.name = 'helicoCorp'; 
	renderingEnvironment.addToScene(this.carPosition); 
	// initial POS
	this.carPosition.position.x = this.CARx;
	this.carPosition.position.y = this.CARy;
	this.carPosition.position.z = this.CARz;
	// car Rotation floor slope follow
	this.carFloorSlope = new THREE.Object3D(); 
	this.carFloorSlope.name = 'car1';
	this.carPosition.add(this.carFloorSlope);
	// car vertical rotation
	this.carRotationZ = new THREE.Object3D(); 
	this.carRotationZ.name = 'car2';
	this.carFloorSlope.add(this.carRotationZ);
	this.carRotationZ.rotation.z = this.CARtheta ;
	// the helico itself 
	// simple method to load an object
	this.carGeometry = Loader.load({filename: 'assets/helico/helicoCorp.obj', node: this.carRotationZ, name: 'helico'}) ;

	/**
	 * Partie Droite de l'helico 
	 */

	//	Helico Turbine Droite
	// helico Translation
	this.helicoTurbineD =  new THREE.Object3D();
	this.helicoTurbineD.name = 'helicoTurbineD'; 
	this.carRotationZ.add(this.helicoTurbineD);
	// initial POS
	this.helicoTurbineD.position.x = 8.5;
	this.helicoTurbineD.position.y = -3;
	this.helicoTurbineD.position.z = 4;
	// the turbine itself 
	// simple method to load an object
	var turbineDGeometry = Loader.load({filename: 'assets/helico/turbine.obj', node: this.helicoTurbineD, name: 'turbineD'}) ;

	//	Helico Axe Droite
	// helico Translation
	this.helicoAxeD =  new THREE.Object3D();
	this.helicoAxeD.name = 'helicoAxeD'; 
	this.helicoTurbineD.add(this.helicoAxeD);
	// initial POS
	this.helicoAxeD.position.x = 0; //8.5
	this.helicoAxeD.position.y = 1; //-2
	this.helicoAxeD.position.z = 0; //4
	// the axe itself 
	// simple method to load an object
	var axeDGeometry = Loader.load({filename: 'assets/helico/axe.obj', node: this.helicoAxeD, name: 'axeD'});

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
	this.helicoTurbineG =  new THREE.Object3D();
	this.helicoTurbineG.name = 'helicoTurbineG'; 
	this.carRotationZ.add(this.helicoTurbineG);
	// initial POS
	this.helicoTurbineG.position.x = -8.5;
	this.helicoTurbineG.position.y = -3;
	this.helicoTurbineG.position.z = 4;
	// the turbine itself 
	// simple method to load an object
	var turbineGGeometry = Loader.load({filename: 'assets/helico/turbine.obj', node: this.helicoTurbineG, name: 'turbineG'});

	//	Helico Axe Gauche
	// helico Translation
	this.helicoAxeG =  new THREE.Object3D();
	this.helicoAxeG.name = 'helicoAxeG'; 
	this.helicoTurbineG.add(this.helicoAxeG);
	// initial POS
	this.helicoAxeG.position.x = 0; //-8.5
	this.helicoAxeG.position.y = 1; //-2
	this.helicoAxeG.position.z = 0; //4
	// the axe itself 
	// simple method to load an object
	var axeGGeometry = Loader.load({filename: 'assets/helico/axe.obj', node: this.helicoAxeG, name: 'axeG'}) ;

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
	this.carRotationZ.add(helicoTurbineC);
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
	this.helicoAxeC =  new THREE.Object3D();
	this.helicoAxeC.name = 'helicoAxeC'; 
	helicoTurbineC.add(this.helicoAxeC);
	// initial POS
	this.helicoAxeC.position.x = 0; //0
	this.helicoAxeC.position.y = 1; //0
	this.helicoAxeC.position.z = 0; //5
	// the axe itself 
	// simple method to load an object
	var axeCGeometry = Loader.load({filename: 'assets/helico/axe.obj', node: this.helicoAxeC, name: 'axeC'}) ;

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
    
}