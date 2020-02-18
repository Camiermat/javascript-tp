window.addEventListener("load", function () {
	
	document.getElementById('age').addEventListener('input',verifAge);
	document.getElementById('id').addEventListener('input',verifId);
	document.getElementById('realPwd').addEventListener('input',isStrongPwd);
	document.getElementById('confirmPwd').addEventListener('input',verifPwd);
	document.getElementById('cgu').addEventListener('input',verifCGU);
	document.getElementById('btnSubmit').addEventListener('click',verifSubmit);
	var progressBar = document.getElementById('progress');

	var allFill = new Array([6]);
	for(let i = 0; i < allFill.length; i++){
		allFill[i] = false;
	}
	verifSubmit();

	function verifAge(){
		if(this.value<18){
			document.getElementById("textAge").innerHTML = "Age non valide, vous devez être majeur";
			console.log("age invalide");
			allFill[2] = false;
		}else{
			document.getElementById("textAge").innerHTML = "";
			allFill[2] = true;
		}
		verifSubmit();
	}
	
	function verifId(){
		var regexIdCarctere = new RegExp("[^a-zA-Z]");
		if((regexIdCarctere.test(this.value))){
			document.getElementById("textId").innerHTML = "Les caractères spéciaux ne sont pas acceptés";
			console.log("identifiant contient caratère invalide");
			allFill[3] = 0;
		}else if(this.value.length > 12){
			document.getElementById("textId").innerHTML = "Nombre de caractères max : 12";
			console.log("identifiant trop long");
			allFill[3] = false;
		}else{
			document.getElementById("textId").innerHTML = "";
			allFill[3] = true;
		}
		verifSubmit();
	}
	
	function isStrongPwd(){
		var lowerReg = new RegExp("[a-z]");
		var upperReg = new RegExp("[A-Z]");
		var numberReg = new RegExp("[0-9]");
		var specialReg = new RegExp("\\W");	
		var scaling = new Array([5]);
		var errorText = new Array([5]);
		var finalErrorText;
		
		for(let i = 0; i < errorText.length; i++){
			errorText[i] = " ";
		}
		
		if(this.value.length < 8){ // !Taille d'au moins 8 caractères
			console.log("au moins 8 caractère");
			scaling[0] = false;
			errorText[0] = "Au moins 8 caractères";
		}else{
			scaling[0] = true;
			calcStrong(scaling);
		}
		
		if(!lowerReg.test(this.value)){ // !Un caractère en minuscule
			console.log("au moins une minuscule");
			errorText[1] = "Au moins une minuscule";
			scaling[1] = false;
		}else{
			scaling[1] = true;
			calcStrong(scaling);
		}
		
		if(!upperReg.test(this.value)){ // !Un caractère en majuscule
			console.log("au moins une majuscule");
			errorText[2] = "Au moins une majuscule";
			scaling[2] = false;
		}else{
			scaling[2] = true;
			calcStrong(scaling);
		}
		
		if(!numberReg.test(this.value)){ // !Un nombre
			console.log("au moins un nombre");
			errorText[3] = "Au moins un nombre";
			scaling[3] = false;
		}else{
			scaling[3] = true;
			calcStrong(scaling);
		}
		
		if(!specialReg.test(this.value)){ // !Un caractère spécial
			console.log("au moins un caractère spécial");
			errorText[4] = "Au moins un caractère spécial";
			scaling[4] = false;
		}else{
			scaling[4] = true;
			calcStrong(scaling);
		}
		
		var isError = false;
		for(let i = 0; i < errorText.length; i++){
			if(errorText[i] != " "){
				isError = true;
			}
		}
		
		finalErrorText = "Veuillez respecter : </br>";
		for(let i = 0; i < errorText.length; i++){
			if(errorText[i]){
				finalErrorText = finalErrorText + " " + errorText[i] + "</br>";
			}
		}
		
		if(isError){
			document.getElementById('textRealPwd').innerHTML = finalErrorText;
			
		}else{
			document.getElementById('textRealPwd').innerHTML = " ";
		}
		verifSubmit();
	}

	function calcStrong(tab){
		var somme = 0;
		for(let i = 0; i < tab.length; i++){
			if(tab[i]){somme += 20;}
		}
		progressBar.value = somme;
		if(somme == 100){
			allFill[4] = true;
		}else{
			allFill[4] = false;
		}
		verifSubmit();
	}

	function verifPwd(){
		if(this.value != document.getElementById('realPwd').value){
			console.log("mot de passe différent");
			document.getElementById("textConfirmPwd").innerHTML = "Les mots de passe sont différents";
			allFill[4] = false;
		}else{
			document.getElementById("textConfirmPwd").innerHTML = "";
			allFill[4] = true;
		}
		verifSubmit();
	}
	
	function verifCGU(){
		if(!(document.getElementById("cgu").checked)){
			console.log("pas valider");
			allFill[5] = false;
		}else{
			allFill[5] = true;
		}
		verifSubmit();
	}
	
	function verifSubmit(){
		sommeFill = 0;
		for(let i = 0; i < allFill.length; i++){
			if(allFill[i]){
				sommeFill++;
			}
		}
		if(sommeFill == 4){
			document.getElementById("btnSubmit").disabled = false;
			
		}else{
			document.getElementById("btnSubmit").disabled = true;
		}
	}
});