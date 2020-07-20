const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");
const router = express.Router();

const app = express();

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended: false}));

app.use(express.static('client'));

app.all('*', (req, res, next) => {
	console.log(req.url);
	console.log(req.method);
	next();
});

app.use('/', router);

app.listen(3000, () => {
	console.log("Сервер начал прослушивание запросов на порту 3000");
});

router.get('/', (req, res) => {;
	res.sendFile(path.resolve("./client/HTML/index.html"));
});

router.get('/original', (req, res) => {;
	fs.readFile("OriginalArray.json", (err, data) => {	
		if (err) {
			console.log(err.message);
		}
		res.send(JSON.parse(data));
	});
});

router.get('/fixed', (req, res) => {;
	fs.readFile("FixedArray.json", (err, data) => {
		if (err) {
			console.log(err.message);
		}
		res.send(JSON.parse(data));
	});

});

router.post('/', (req, res) => {
	const original = parse(req.body.arr);
	fs.writeFile("OriginalArray.json", JSON.stringify(original), () => {});

	const fixed = fix(original);
	fs.writeFile("FixedArray.json", JSON.stringify(fixed), () => {});
	
	res.status(200).end();
})

function parse(str) {
	return str.split('\n');
};

function fix(arr) {
	let result = arr.map((item) => {
		return item.charAt(0).toUpperCase() + item.substr(1);
	});
	return result.sort();
}