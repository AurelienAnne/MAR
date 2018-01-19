
function ATH() {
    document.getElementById('infos').style = 'position: absolute; margin-top: 10px;margin-left: 10px; font-family: Arial; color: white;background-color:rgba(128, 128, 128, .7);padding:4px;';

    this.score = 0;

    this.showLaps = function() {
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

    this.showEnd = function() {
        document.getElementById('fin5Tours').style = 'position: absolute; margin-top: 30%;margin-left: 30%; font-family: Arial; color: white;background-color:rgba(128, 128, 128, .7);padding:4px;';    
        document.getElementById("fin5Tours").innerHTML = "Congratulation ! You won ! Score  " + this.score + "<br>"
			+ "Temps total : " + totalTime + "<br>"
			+ "Meilleur tour : " + ((!bestTour)?"":bestTour) + "<br>"
			+ this.showLaps();
    }

    this.update = function (NAV, vehicle, nbLap){
        document.getElementById("infos").innerHTML = "Vitesse : " + vehicle.getVehiculeSpeed() + "<br>"
            + "Tour : " + (nbLap+1) + "<br>" 
            + "Score : " + this.score + "<br>"
            + "Temps total : " + totalTime + "<br>"
            + "Meilleur tour : " + ((!bestTour)?"":bestTour) + "<br>"
            + this.showLaps() 
            + "<label for=\"camera\">Changer camera</label><input type='text' enable=false value='P' size=2><br>"
            //+ "<br>Debug:<br> Vehicule pos : " + NAV.x.toFixed(1) + ", " + NAV.y.toFixed(1) + ", " + NAV.z.toFixed(1) + "<br>";
    }
}