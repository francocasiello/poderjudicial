const express = require("express");
const app = express();
const path = require("path")
const fs = require('fs');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = (n) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');

const mainController = {
    index: (req, res) => { 
        res.render("index");
},
   
    login: (req, res) => { return res.render("login")},
    productCart: (req, res) => { return res.render("productCart")},
    register: (req, res) => { return res.render("register")},
};

// Acá exportamos el resultado
module.exports= mainController