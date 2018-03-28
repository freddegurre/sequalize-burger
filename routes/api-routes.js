var db = require("../models");
var express = require("express");

module.exports = function (app) {
    //get all burgers
    app.get("/", function (req, res) {
        db.Burger.findAll({}).then(function (result) {

            var devoured = [];
            var burger = [];
            for (var i = 0; i < result.length; i++) {
                if (result[i].devoured === true) {
                    devoured.push(result[i]);
                }
                else {
                    burger.push(result[i]);
                }
            }
            res.render("index", { burgers: burger, eaten: devoured});
        })
    });

    //create new burger
    app.post("/api/burger", function (req, res) {
        db.Burger.create({
            burger_name: req.body.name
        }).then(function (data) {
            res.json(data);
        }).catch(function (error) {
            res.send(error);
        });
    });

    app.put("/api/burger", function (req, res) {
        db.Burger.update({ devoured: true }, {
            where: {
                id: req.body.id
            }
        }).then(function (data) {
            res.end();
        })
    })





}