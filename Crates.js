const CRATE_SIZE = 7;
const CRATES = [
    { 
        position: { x: -240, y: 110, z:0 },
        rotation: { x: 0, y: 0, z:0 }, // Plane 2 gauche
        userData: {
            pts: 20
        }
    }, 
    { 
        position: { x: -220, y: 110, z:0 },
        rotation: { x: 0, y: 0, z:0 }, // Plane 2 milieu
        userData: {
            pts: 20
        }
    }, 
    { 
        position: { x: -200, y: 110, z:0 },
        rotation: { x: 0, y: 0, z:0 }, // Plane 2 droite
        userData: {
            pts: 20
        }
    }, 
    { 
        position: { x: -170, y: 220, z:20 },
        rotation: { x: 0, y: 0, z:0 }, // Plane 4 gauche
        userData: {
            pts: 30
        }
    }, 
    { 
        position: { x: -170, y: 240, z:20 },
        rotation: { x: 0, y: 0, z:0 }, // Plane 4 droite
        userData: {
            pts: 30
        }
    }, 
    { 
        position: { x: 140, y: 70, z:50 },
        rotation: { x: 0, y: 14*Math.PI/180, z:0 }, // Plane 11
        userData: {
            pts: 15
        }
    }, 
];

var collidableMeshList = [];

function Crates(scene)
{
    var geometry = new THREE.BoxGeometry(CRATE_SIZE, CRATE_SIZE, CRATE_SIZE); // Créer un cube
    var loader = new THREE.TextureLoader().load('assets/crate.jpg', // Chargement asynchrone la texture de la caisse
        function ( texture ) {
            var material = new THREE.MeshBasicMaterial({ map: texture });
            CRATES.forEach(crate => {
                var mesh = new THREE.Mesh(geometry, material);
                mesh.position.x = crate.position.x;
                mesh.position.y = crate.position.y;
                mesh.position.z = crate.position.z + (CRATE_SIZE / 2);
                mesh.rotation.x = crate.rotation.x;
                mesh.rotation.y = crate.rotation.y;
                mesh.rotation.z = crate.rotation.z;
                mesh.userData = crate.userData;
                scene.add(mesh);
                collidableMeshList.push(mesh);
            });
        },        
        function (xhr) { // Function called when download progresses
            console.log( (xhr.loaded / xhr.total * 100) + '% loaded' );
        },
        function (xhr) { // Function called when download errors
            console.log( 'An error happened' );
        }
    );

    this.detectCrateCollision = function (NAV) {
        const vectorVehicle = new THREE.Vector3(NAV.x, NAV.y, NAV.z);
        var crateDetected = undefined;

        for (var i = 0; i < CRATES.length; i++ ) {            
            const crate = CRATES[i];
            const vectorCrate = new THREE.Vector3(crate.position.x, crate.position.y, crate.position.z);           
            var raycaster = new THREE.Raycaster(vectorVehicle, vectorCrate.sub(vectorVehicle).normalize()); // On créé un rayon depuis le vehicule jusqu'à la caisse
            var intersects = raycaster.intersectObjects(collidableMeshList); // On détecte les objets qui coupent ce rayon
            
            if (intersects.length > 0) {
                var crateMesh = intersects[0];
                var minDistance = crateMesh.distance;
                for (var j = 1; j < intersects.length; j++) { // Le ray peut parcourir plusieurs caisses
                    if (Math.min(minDistance, intersects[j].distance) < minDistance) {
                        minDistance = intersects[j].distance;
                        crateMesh = intersects[j]; // On récupère donc la caisse la plus proche, cad celle qui est potentiellement touchée
                    }                   
                }
                
                if (minDistance <= CRATE_SIZE) { // Si la caisse la plus proche est touchée par le véhicule
                    if(crateMesh.object.visible) {
                        crateMesh.object.visible = false;
                        crateDetected = crateMesh.object.userData;
                        break;
                    }
                }
            }
        }

        return crateDetected;
    };
}