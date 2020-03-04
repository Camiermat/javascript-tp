var date = new Date();
var hours = date.getHours();
var minutes = date.getMinutes();
var secondes = date.getSeconds();
if (hours <10) hours = "0" + hours;
if (minutes <10) minutes = "0" + minutes;
if (secondes <10) secondes = "0" + secondes;
var content = document.createTextNode("" + hours + ":" + minutes + ":" + secondes);

window.addEventListener("load", function () {
	
	var horloge = document.getElementById('horloge');
	var newDiv = document.createElement("div");
	var buttonAdd = document.createElement("input");
	var arrayAlarm = new Array();
	var countArray = 0;
	var alarmSongs = new Array('never_gonna_give_you_up.mp3', 'petit_ours_brun.mp3');
	

	buttonAdd.type="submit";
	buttonAdd.value="+";
	buttonAdd.class="ajoutAlarme";
	buttonAdd.addEventListener("click",createAlarm);
	horloge.appendChild(newDiv);
	horloge.appendChild(buttonAdd);
	
	newDiv.appendChild(content);
	
	getActualTime();
	
	function getActualTime(){
		newDiv.removeChild(content); 
		var date = new Date();
		var hours = date.getHours();
		var minutes = date.getMinutes();
		var secondes = date.getSeconds();
		
		if (hours < 10) hours = "0" + hours;
		if (minutes < 10) minutes = "0" + minutes;
		if (secondes < 10) secondes = "0" + secondes;
		
		content = document.createTextNode(hours + ":" + minutes + ":" + secondes);
		newDiv.appendChild(content);

		for (let i = 0; i < arrayAlarm.length; i++){
			if (arrayAlarm[i].children[0].checked){
				if (arrayAlarm[i].children[1].selectedIndex == hours){
					if (arrayAlarm[i].children[2].selectedIndex == minutes){
						if (secondes == 0){
							var audioToPlay = new Audio(arrayAlarm[i].children[4].value + '.mp3');
							audioToPlay.play();
							document.body.style.background = "#DC143C";
							setTimeout(function () {
								document.body.style.background = "white";
							}, 3000);
							
						}
					}
				}
			}
			//if (arrayAlarm[i])
		}

		
		setTimeout(getActualTime,1000);
	}
	
	function createAlarm(){
		// Création de la div contenant les options
		var newAlarme = document.createElement("div");
		// Activer / Désactiver l'alame
		var check = document.createElement("input");
		check.type = "checkbox";
		// ComboBox pour les 24H et les 60 Minutes, sélectionne l'heure/minute actuelle
		var hours = document.createElement("select");
		for (let i = 0; i < 24; i++){
			var opt = document.createElement("option");
			if(i < 10){
				opt.textContent = "0"+i;
			}else{
				opt.textContent = i;
			}
			
			hours.appendChild(opt);
		}
		hours.selectedIndex = (new Date()).getHours();
		var minutes = document.createElement("select");
		for (let i=0; i < 60 ;i++){
			var opt = document.createElement("option");
			if(i < 10){
				opt.textContent = "0"+i;
			}else{
				opt.textContent = i;
			}
			minutes.appendChild(opt);
		}
		minutes.selectedIndex = (new Date()).getMinutes()+1;
		// Text contenant le nom de l'alarme
		var name = document.createElement("input");
		name.type = "text";
		name.placeholder = "Nom de l'alarme";
		// Sélection du son à jouer
		var sounds = document.createElement("select");
		var sound1 = document.createElement("option");
		sound1.textContent = "never_gonna_give_you_up";
		var sound2 = document.createElement("option");
		sound2.textContent = "petit_ours_brun";
		var buttonSuppr = document.createElement("input");
		buttonSuppr.type = "submit";
		buttonSuppr.value = "-";
		buttonSuppr.idTab = countArray;
		buttonSuppr.addEventListener("click",supprAlarme);
		
		arrayAlarm[countArray] = newAlarme;
		console.log(arrayAlarm[countArray]);
		horloge.insertBefore(newAlarme,buttonAdd);
		countArray ++;
		
		newAlarme.appendChild(check);
		newAlarme.appendChild(hours);
		newAlarme.appendChild(minutes);
		newAlarme.appendChild(name);
		newAlarme.appendChild(sounds);
		newAlarme.appendChild(buttonSuppr);
		
		sounds.appendChild(sound1);
		sounds.appendChild(sound2);
		aff();
	}
	
	function aff(){
		for(let i = 0 ; i < countArray ; i++){
			console.log(arrayAlarm[i]);
		}
	}
	
	function supprAlarme(){
		horloge.removeChild(arrayAlarm[event.target.idTab]);
		for(let i = 0; i < countArray; i++){
			if (i == event.target.idTab){
				for(let j = i+1; j < countArray; j++){
					arrayAlarm[i] = arrayAlarm[j];
					i++;
				}
				countArray--;
				aff();
				return;
			}
		}
	}});