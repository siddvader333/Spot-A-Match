const express = require('express');
const app = express();
const bodyParser = require('body-parser');

//middleware, converts requests from string to js object
app.use(bodyParser.json());

const port = process.env.PORT || 5000;

//Hello World Route
app.get('/', (req, res) => {
	res.send('Hello world!');
});
app.listen(port, () => {
	console.log(`server running on port ${port}`);
});
