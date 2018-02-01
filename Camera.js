
function Camera() {
    var onboard = true;

    this.switch = function (NAV, camera, vehicle, carGeometry) {
        if (onboard) { // On passe sur les caméras circuit
            onboard = false;            
            carGeometry.remove(camera);
            this.update(NAV, camera, vehicle);

            if(playerHasChosenHelico) {
                playerCar.activeParticles(true, true, true);
            }
        }
        else { // On passe en caméra embarquée
            carGeometry.add(camera) ;
            camera.position.x = 0.0 ;
            camera.position.z = 10.0 ;
            camera.position.y = -10.0 ;
            camera.rotation.x = 85.0 * Math.PI/180.0 ;
            camera.rotation.y = 0 * Math.PI/180.0 ;
            camera.rotation.z = 0.0 * Math.PI/180.0 ;
            onboard = true;

            if(playerHasChosenHelico) {
                // On active les particules que sur la turbine du milieu car on ne voit pas les turbines latérales sur la caméra embarquée
                playerCar.activeParticles(false, true, false); 
            }
        }        
    };
    
    this.update = function (NAV, camera, vehicle){
        if(!onboard){
            switch(NAV.active) {
                case "0": case "1":
                    camera.lookAt(NAV);
                    camera.position.x = -220;
                    camera.position.y = -150 ;
                    camera.position.z = 70;
                    camera.rotation.x = 70.0 * Math.PI/180.0;
                    camera.rotation.z = 0.0 * Math.PI/180.0;
                    break;
                case "2": case "3": case "4":
                    camera.lookAt(NAV);
                    camera.position.x = -250 ;
                    camera.position.y = 260 ;
                    camera.position.z = NAV.z+40;
                    camera.rotation.x = -60.0 * Math.PI/180.0;
                    camera.rotation.z = -165.0 * Math.PI/180.0;
                    break;
                case "5": case "6": case "7":
                    camera.lookAt(NAV);
                    camera.position.x = -80;
                    camera.position.y = 260 ;
                    camera.position.z = NAV.z+40;
                    camera.rotation.x = -60.0 * Math.PI/180.0;
                    camera.rotation.z = -165.0 * Math.PI/180.0;
                    break;
                case "8": case "9": case "10":
                    camera.lookAt(NAV);
                    camera.position.x = 30;
                    camera.position.y = 50 ;
                    camera.position.z = 80;
                    camera.rotation.x = 90.0 * Math.PI/180.0;
                    camera.rotation.z = 0.0 * Math.PI/180.0;
                    break;
                case "11": case "12": case "13": case "14":
                    camera.lookAt(NAV);
                    camera.position.x = 230;
                    camera.position.y = 100 ;
                    camera.position.z = 80;
                    camera.rotation.x = 290.0 * Math.PI/180.0;
                    camera.rotation.z = 180.0 * Math.PI/180.0;
                    break;
                case "15": case "16": case "17":
                    camera.lookAt(NAV);
                    camera.position.x = 270;
                    camera.position.y = -200 ;
                    camera.position.z = 80;
                    camera.rotation.x = 90.0 * Math.PI/180.0;
                    camera.rotation.z = 0.0 * Math.PI/180.0;
                    break;
                case "18": case "19": case "20":
                    camera.lookAt(NAV);
                    camera.position.x = 50;
                    camera.position.y = -300 ;
                    camera.position.z = 100;
                    camera.rotation.x = 90.0 * Math.PI/180.0;
                    camera.rotation.z = 0.0 * Math.PI/180.0;
                    break;
                case "21": case "22": case "23": case "24": case "25":
                    camera.lookAt(NAV);
                    camera.position.x = -40;
                    camera.position.y = 20 ;
                    camera.position.z = 160;
                    camera.rotation.x = 290.0 * Math.PI/180.0;
                    camera.rotation.z = 180.0 * Math.PI/180.0;
                    break;
                case "26": case "27": case "28": case "29": case "30":
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
        };
    }
}