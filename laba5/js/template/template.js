class Debt {
	constructor(id, name, telephone, debt, address) {
		this.id = id;
		this.name = name;
		this.telephone = telephone;
		this.debt = debt;
		this.address = address;
		this.extra = null;
	}
	getId() {
		return this.id;
	}
	getname() {
		return this.name;
	}
	gettelephone() {
		return this.telephone;
	}
	getdebt() {
		return this.debt;
	}
	getAddress() {
		return this.address;
	}
	setId(id) {
		this.id = id;
	}
	setExtra(add) {
		if (add !== null)
			this.extra = add.split("@");
	}
	getExtra() {
		if (this.extra === null)
			return ["", ""];
		else
			return this.extra;
	}
	toString() {
		var string = "ФИО: " + this.name + "<br>";
		string += "Телефон: " + this.telephone + "<br>";
		string += "Задолженность: " + this.debt + "<br>";
		string += "Адрес: " + this.address + "<br>";
		if (this.extra !== null) {
			string += this.extra[0] + ": " + this.extra[1] + "<br>";
		}
		return string;
	}
}