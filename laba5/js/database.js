data = new Set();
lastId = 0;
db = openDatabase("Debt", "1.0", "База должников", 2 * 1024 * 1024);
first = true;

if(!db) {
	alert("Не получилось соединиться с базой данных");
}

function readData() {
	db.transaction(function(tx) {
		tx.executeSql("SELECT * FROM Debt;", [],
						getResults,
						function(tx, error) {
							tx.executeSql("CREATE TABLE Debt (id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, name TEXT, telephone TEXT, debt TEXT, address TEXT, extra TEXT);", [], null, null);
						}
					);
	});
}

function getResults(tx, result) {
	if(result.rows == undefined) {
		return;
	}
	window.data.clear();
	for(var i = 0; i < result.rows.length; i ++){
		let debt = new Debt(result.rows.item(i)['id'], result.rows.item(i)['name'], result.rows.item(i)['telephone'],
							result.rows.item(i)['debt'], result.rows.item(i)['address']);
		debt.setExtra(result.rows.item(i)['extra']);
		window.data.add(debt);
	}
	if(first) {
		options();
		first = false;
	}
}

function getLastId(){
	db.transaction(function(tx) {
		tx.executeSql("SELECT id FROM Debt", [],
			countLastId,
				function(tx, error) {
					tx.executeSql("CREATE TABLE Debt (id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, name TEXT, telephone TEXT, debt TEXT, address TEXT, extra TEXT);", [], null, null);
				}
		);
	});
}

function countLastId(tx, result) {
	if(result.rows.length === 0 || result.rows == undefined){
		return;
	}
	window.lastId = result.rows.item(result.rows.length - 1)['id'];
	addOption(window.lastId);
}
	
function addDebt(newDebt) {
	db.transaction(function(tx) {
		tx.executeSql("INSERT INTO Debt(name, telephone, debt, address) VALUES(?, ?, ?, ?);",
						[newDebt.getname(), newDebt.gettelephone(), newDebt.getdebt(), newDebt.getAddress()], 
						null, null);
	});
}

function updateExtra(id, text) {
	db.transaction(function(tx){
		tx.executeSql("UPDATE Debt SET extra = ? WHERE id = ?;",
						[text, id], 
						null, null);
	});
}

function deleteDebt(DebtId) {
	db.transaction(function(tx) {
		tx.executeSql("DELETE FROM Debt WHERE id = ?;",
						[DebtId], null, null);
	});
}