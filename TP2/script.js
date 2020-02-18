window.addEventListener("load", function () {
	
	var horloge = document.getElementById('horloge');
	
	var newDiv = document.createElement("div");
	var buttonAdd = document.createElement("input");
	var arrayAlarme = new Array();
	var countArray = 0;
	buttonAdd.type="submit";
	buttonAdd.value="+";
	buttonAdd.class="ajoutAlarme";
	buttonAdd.addEventListener("click",createAlarme);
	horloge.appendChild(newDiv);
	horloge.appendChild(buttonAdd);
	
	var date = new Date();
	var hours = date.getHours();
	var minutes = date.getMinutes();
	var secondes = date.getSeconds();
	if (hours <10)hours="0"+hours;
	if (minutes <10)minutes="0"+minutes;
	if (secondes <10)secondes="0"+secondes;
	var content = document.createTextNode(""+hours+":"+minutes+":"+secondes);
	newDiv.appendChild(content);
	
	getActualTime();
	
	function getActualTime(){
		newDiv.removeChild(content); 
		var date = new Date();
		var hours = date.getHours();
		var minutes = date.getMinutes();
		var secondes = date.getSeconds();
		
		if (hours <10)hours="0"+hours;
		if (minutes <10)minutes="0"+minutes;
		if (secondes <10)secondes="0"+secondes;
		
		content = document.createTextNode(""+hours+":"+minutes+":"+secondes);
		newDiv.appendChild(content);
		
		for (let i=0;i<countArray;i++){
			if (arrayAlarme[i].children[0].checked){
				if (arrayAlarme[i].children[1].selectedIndex==hours){
					if (arrayAlarme[i].children[2].selectedIndex==minutes){
						if (secondes==0){
							document.body.style.background = "red";
						}
					}
				}
			}
			//if (arrayAlarme[i])
		}
		
		setTimeout(getActualTime,1000);
	}
	
	function createAlarme(){
		var newAlarme = document.createElement("div");
		var check = document.createElement("input");
		check.type = "checkbox";
		var hours = document.createElement("select");
		for (let i=0;i<24;i++){
			var opt = document.createElement("option");
			opt.textContent = ""+i;
			hours.appendChild(opt);
		}
		hours.selectedIndex = (new Date()).getHours();
		var minutes = document.createElement("select");
		for (let i=0;i<60;i++){
			var opt = document.createElement("option");
			opt.textContent = ""+i;
			minutes.appendChild(opt);
		}
		minutes.selectedIndex = (new Date()).getMinutes()+1;
		var name = document.createElement("input");
		name.type = "text";
		name.placeholder = "Nom de l'alarme";
		var sounds = document.createElement("select");
		var sounds1 = document.createElement("option");
		sounds1.textContent = "tic tac";
		var sounds2 = document.createElement("option");
		sounds2.textContent = "musique douce";
		var buttonSuppr = document.createElement("input");
		buttonSuppr.type = "submit";
		buttonSuppr.value = "-";
		buttonSuppr.idTab = countArray;
		buttonSuppr.addEventListener("click",supprAlarme);
		
		arrayAlarme[countArray] = newAlarme;
		console.log(arrayAlarme[countArray]);
		horloge.insertBefore(newAlarme,buttonAdd);
		countArray ++;
		
		newAlarme.appendChild(check);
		newAlarme.appendChild(hours);
		newAlarme.appendChild(minutes);
		newAlarme.appendChild(name);
		newAlarme.appendChild(sounds);
		newAlarme.appendChild(buttonSuppr);
		
		sounds.appendChild(sounds1);
		sounds.appendChild(sounds2);
		aff();
	}
	
	function aff(){
		for(let i=0;i<countArray;i++){
			
			console.log(arrayAlarme[i]);
		}
	}
	
	function supprAlarme(){
		horloge.removeChild(arrayAlarme[event.target.idTab]);
		for(let i=0;i<countArray;i++){
			if (i==event.target.idTab){
				for(let j=i+1;j<countArray;j++){
					arrayAlarme[i]=arrayAlarme[j];
					i++;
				}
				countArray--;
				aff();
				return;
			}
		}
	}});