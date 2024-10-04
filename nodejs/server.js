const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;
const dbPath = path.join(__dirname, 'db.json');

app.use(bodyParser.json());
app.use(express.static('public')); 


const readDb = () => JSON.parse(fs.readFileSync(dbPath, 'utf8'));

const writeDb = (data) => fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));

app.get('/products', (req, res) => {
    const data = readDb();
    res.json(data.addedDataJSON);
});


app.post('/products', (req, res) => {
    const data = readDb();
    const newProduct = req.body;
    data.addedDataJSON.push(newProduct);
    writeDb(data);
    res.status(201).json(newProduct);
});


app.put('/products/:id', (req, res) => {
    const data = readDb();
    const productIndex = data.addedDataJSON.findIndex((product) => product.id === req.params.id);

    if (productIndex !== -1) {
        data.addedDataJSON[productIndex] = { ...data.addedDataJSON[productIndex], ...req.body };
        writeDb(data);
        res.json(data.addedDataJSON[productIndex]);
    } else {
        res.status(404).json({ message: "Product not found" });
    }
});


app.delete('/products/:id', (req, res) => {
    const data = readDb();
    const newProducts = data.addedDataJSON.filter((product) => product.id !== req.params.id);
    data.addedDataJSON = newProducts;
    writeDb(data);
    res.json({ message: "Product deleted" });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
