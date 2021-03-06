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
            document.getElementById('mainMenu').style = cssMiddle(420, 420) + cssAthStyle() + 'visible: true;';    
            document.getElementById("mainMenu").innerHTML = '<div style="text-align:center;">'
                + '<h1 style="font-size: 36px;text-align:center;">MARace</h1>'
                + '<p style="font-size: 24px; line-height: 10px;"><b>Jouer avec</b></p>'
                + '<p><input type="radio" id="vehicle_helico" name="vehicle" checked>'
                + '<label for="vehicle_helico">L\'hélico</label>'
                + '<input type="radio" id="vehicle_car" name="vehicle">'
                + '<label for="vehicle_car">Le vaisseau</label></p>'
                + '<p><input type="checkbox" id="ghostEnabled" name="ghostEnabled" checked>'
                + '<label for="ghostEnabled">Activer le fantôme</label><br>'                
                + '<input type="checkbox" id="particlesEnabled" name="particlesEnabled">'
                + '<label for="particlesEnabled">Activer les particules</label><br>'
                + '<input type="checkbox" id="journalistEnabled" name="journalistEnabled">'
                + '<label for="journalistEnabled">Activer les journalistes (courbe de bezier)</label><br>'
                + '<input type="checkbox" id="musicEnabled" name="musicEnabled"'
                + '<label for="musicEnabled">Activer la musique</label></p>'
                + '<p>Commandes :<br>'
                + 'Avancer/Freiner : Z/S<br>'
                + 'Gauche/Droite : Q/D<br>'
                + 'Caméra : P<br>'
                + 'Hack (faire un tour complet) : H</p>'
                + '<button style="font-size: 20px;" onClick="ath.MainMenu.submit()">Jouer</button></div>';
        },     
        submit : function () { 
            document.getElementById('mainMenu').style = 'display: none;';

            // Lancement du chargement du jeu avec les bons assets
            start({
                helico: document.getElementById("vehicle_helico").checked,
                ghost: document.getElementById("ghostEnabled").checked,
                music: document.getElementById("musicEnabled").checked,
                particles: document.getElementById("particlesEnabled").checked,
                journalists: document.getElementById("journalistEnabled").checked
            });
        }
    }

    this.showEnd = function() {
        document.getElementById('fin5Tours').style = cssMiddle(200, 380) + cssAthStyle();    
        document.getElementById("fin5Tours").innerHTML = '<img height="200" src="assets/trophee.gif" style="float:left;">'
            + "<h3>Victoire !</h3>"
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
            + "Meilleur tour : " + ((!bestTour)?"":bestTour) + ((bestTurn >= 0) ? " au tour n°"+ (bestTurn+1) : "") + "<br>"
            + this.showLaps() 
            //+ "<br>Debug:<br> Vehicule pos : " + NAV.x.toFixed(1) + ", " + NAV.y.toFixed(1) + ", " + NAV.z.toFixed(1) + "<br>";
    }
}