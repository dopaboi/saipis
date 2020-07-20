function add() {
	let inputs = document.getElementsByTagName("input");
	var name, telephone, debt, address;
	for(i = 0; i < inputs.length; i++) {
		switch(inputs[i].name) {
			case "name":
				name = inputs[i].value;
				break;
			case "telephone":
				telephone = inputs[i].value;
				break;
			case "debt":
				debt = inputs[i].value;
				break;
			case "address":
				address = inputs[i].value;
				break;
		}
	}
	let newDebt = new Debt(null, name, telephone, debt, address);
	addDebt(newDebt);
	getLastId();
}

function addOption(id) {
	var select = document.getElementsByTagName("select")[0];
	let opt = document.createElement("option");
	opt.value = id;
	let optText = document.createTextNode(id);
	opt.appendChild(optText);
	select.appendChild(opt);
}

function addProp() {
	var prop = document.getElementsByTagName("textarea")[0];
	let select = document.getElementsByTagName("select")[0];
	let selected = select.options[select.selectedIndex].value;
	updateExtra(selected, prop.value);
}

function remove() {
	let select = document.getElementsByTagName("select")[0];
	let selected = select.options[select.selectedIndex];
	deleteDebt(selected.value);
	select.removeChild(selected);
}

function showAllAddresses() {
	let inputs = document.getElementsByTagName("input");
	db.transaction(function(tx) {
		tx.executeSql("SELECT * FROM Debt WHERE debt > 0", [],(tx, result) => {
			console.log(result);
			for(let i=0; i<result.rows.length; i++){
				for (let key in result.rows[i]) {
					if (key === 'name') {
						let div = document.createElement('div');
						div.innerHTML = result.rows[i][key];
						document.body.append(div);
					}else continue;
					}
				}
			},
null
					);
				});
}

function reset(){
	document.getElementById("name").value = "";
	document.getElementById("telephone").value = "";
	document.getElementById("debt").value = "";
	document.getElementById("address").value = "";
	
}

function show(button) {
	var tableDiv = document.getElementById("table");
	var table = document.getElementsByTagName("tbody")[0];
	if(tableDiv.style.display === "none"){
		tableDiv.style.display = "initial";
		button.innerHTML = "Спрятать таблицу";
		readData();		
		window.data.forEach(tool => table.appendChild(createRow(tool)));
	} else{
		let rows = table.getElementsByTagName("tr");
		while(rows.length !== 1)
			table.removeChild(rows[1]);
		tableDiv.style.display = "none";
		button.innerHTML = "Показать все записи";		
	}
}

function createRow(tool){
	let row = document.createElement("tr");
	
	let cell = document.createElement("td");
	let text = document.createTextNode(tool.getId());
	cell.appendChild(text);
	row.appendChild(cell);
	
	cell = document.createElement("td");
	text = document.createTextNode(tool.getname());
	cell.appendChild(text);
	row.appendChild(cell);
	
	cell = document.createElement("td");
	text = document.createTextNode(tool.gettelephone());
	cell.appendChild(text);
	row.appendChild(cell);
	
	cell = document.createElement("td");
	text = document.createTextNode(tool.getdebt());
	cell.appendChild(text);
	row.appendChild(cell);
	
	cell = document.createElement("td");
	text = document.createTextNode(tool.getAddress());
	cell.appendChild(text);
	row.appendChild(cell);
	

	cell = document.createElement("td");
	text = document.createTextNode(tool.getExtra()[0]);
	cell.appendChild(text);
	row.appendChild(cell);

	return row;
}

function options(){
	var select = document.getElementsByTagName("select")[0];
	window.data.forEach(tool => {
		let opt = document.createElement("option");
		opt.value = tool.getId();
		let optText = document.createTextNode(tool.getId());
		opt.appendChild(optText);
		select.appendChild(opt);
	});
};

readData();


	var man = {
		name: "Влад",
		sex: "male",
		age: 20
	}
	var student = {
		group: "1",
		university: "bsuir"
	}
	var programmer = {
		qualification: "abc"
	}
	student.__proto__=man;
	programmer.__proto__=man;


	console.log("Возраст студента:" + student.age);
	console.log("Имя студента: " + student.name);
	console.log("Пол программиста: " +student.sex);
