
const express = require("express");

const User = require("../models/user.js");

const newFood = (req, res) => {
	res.render("foods/new.ejs", {
		title: "New Food",
	});
};

const foodCreate = async (req, res) => {
		const currentUser = await User.findById(req.params.userId);
		currentUser.pantry.push(req.body);
		await currentUser.save();
		res.redirect(`/users/${currentUser._id}/foods`);

};

const index = async (req, res) => {
		const currentUser = await User.findById(req.params.userId);
		res.render("foods/index.ejs", {
			title: "Food",
			pantry: currentUser.pantry,
		});

};

const show = async (req, res) => {
		const currentUser = await User.findById(req.params.userId);
		const food = currentUser.pantry.id(req.params.foodId);
		res.render("foods/show.ejs", {
			title: food.title,
			food,
		});

};

const deleteFood = async (req, res) => {
		const currentUser = await User.findById(req.params.userId);
		currentUser.pantry.id(req.params.foodId).deleteOne();
		await currentUser.save();
		res.redirect(`/users/${currentUser._id}/foods`);

};

const edit = async (req, res) => {
		const currentUser = await User.findById(req.params.userId);
		const food = currentUser.pantry.id(req.params.foodId);
		res.render("foods/edit.ejs", {
			title: food.title,
			food,
		});

};

const update = async (req, res) => {
		const currentUser = await User.findById(req.params.userId);
		const food = currentUser.pantry.id(req.params.foodId);
		food.set(req.body);
		await currentUser.save();

		res.redirect(`/users/${currentUser._id}/foods/${req.params.foodId}`);

};

module.exports = {
	User,
	newFood,
	index,
	foodCreate,
	show,
	deleteFood,
	edit,
	update,
};
