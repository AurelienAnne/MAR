function Vehicule(initX, initY, initZ, Inittheta, name, Loader, renderingEnvironment)
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
    
    //	Car
	// car Translation
	this.carPosition = new THREE.Object3D(); 
	this.carPosition.name = name + 'car0'; 
	renderingEnvironment.addToScene(this.carPosition); 
	// initial POS
	this.carPosition.position.x = this.CARx;
	this.carPosition.position.y = this.CARy;
	this.carPosition.position.z = this.CARz;
	// car Rotation floor slope follow
	this.carFloorSlope = new THREE.Object3D(); 
	this.carFloorSlope.name = name + 'car1';
	this.carPosition.add(this.carFloorSlope);
	// car vertical rotation
	this.carRotationZ = new THREE.Object3D(); 
	this.carRotationZ.name = name + 'car2';
	this.carFloorSlope.add(this.carRotationZ);
	this.carRotationZ.rotation.z = this.CARtheta ;
	// the car itself 
	// simple method to load an object
	this.carGeometry = Loader.load({filename: 'assets/car_Zup_01.obj', node: this.carRotationZ, name: name + 'car3'}) ;
    this.carGeometry.position.z= +0.25 ; 
    this.carFloorSlope = new THREE.Object3D(); 
	this.carFloorSlope.name = name + 'car1';
	this.carPosition.add(this.carFloorSlope);
	
	this.resetZRotation = function(){
		this.carRotationZ.rotation.z = 0 ;
	}
    
}