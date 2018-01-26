function ATH(Loader, renderingEnvironment) {
    document.getElementById('infos').style = 'position: absolute; margin-top: 10px;margin-left: 10px;' + cssAthStyle();

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

    function cssMiddle(height, width) {
        return 'left:50%; top:50%; margin-top:-' + (height / 2) + 'px; margin-left:-' + (width / 2) + 'px; position: absolute; height:' + height + 'px; width:' + width + 'px;';
    }
    function cssAthStyle() {
        return 'font-family: Arial; color: white;background-color:rgba(128, 128, 128, .7);padding:4px;';
    }

    this.MainMenu = {
        show : function(callback) {
            document.getElementById('mainMenu').style = cssMiddle(400, 400) + cssAthStyle() + 'visible: true;';    
            document.getElementById("mainMenu").innerHTML = '<div style="text-align:center;">'
                + '<h1 style="font-size: 36px;text-align:center;">MARace</h1>'
                + '<p style="font-size: 24px;"><b>Jouer avec</b>'
                + '<p><input type="radio" id="vehicle_car" name="vehicle">'
                + '<label for="vehicle_car">Le vaisseau</label>'
                + '<input type="radio" id="vehicle_helico" name="vehicle" checked>'
                + '<label for="vehicle_helico">L\'hélico</label></p>'
                + '<p><input type="checkbox" id="ghostEnabled" name="ghostEnabled" checked>'
                + '<label for="ghostEnabled">Activer le fantôme</label></p>'
                + '<p>Commande : ...</p>'
                + '<button style="font-size: 20px;" onClick="ath.MainMenu.submit()">Jouer</button>';
        },     
        submit : function () { 
            changePlayerCar(document.getElementById("vehicle_helico").checked, Loader, renderingEnvironment);
            document.getElementById('mainMenu').style = 'display: none;';
        }
    }

    this.showEnd = function() {
        document.getElementById('fin5Tours').style = cssMiddle(200, 380) + cssAthStyle();    
        document.getElementById("fin5Tours").innerHTML = '<img height="200" src="assets/trophee.gif" style="float:left;">'
            + "<h3>Congratulation ! You won !</h3>"
            + "Score  " + this.score + "<br>"
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