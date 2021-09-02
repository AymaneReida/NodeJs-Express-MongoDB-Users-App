const User = require("../models/user");
const bcrypt = require("bcrypt");
const fs = require("fs");

module.exports = {
	async getUsers() {
		return await User.find({});
	},
	async getUser(id) {
		return await User.findById(id).exec();
	},
	addUser(user, res) {
		const imageUrl = `/images/${user.email}.${user.imageType}`;
		const type =
			user.imageType === "png"
				? /^data:image\/png;base64,/
				: /^data:image\/jpeg;base64,/;
		const base64Data = user.image.replace(type, "");
		const newUser = new User();
		bcrypt
			.hash(user.password, 10)
			.then((hash) => {
				fs.writeFile(
					`images/${user.email}.${user.imageType}`,
					base64Data,
					"base64",
					function (err) {
						console.log(err);
					}
				);
				newUser.username = user.username;
				newUser.password = hash;
				newUser.email = user.email;
				newUser.comment = user.comment;
				newUser.imageUrl = imageUrl;
				newUser
					.save()
					.then(() => {
						res.status(201).json({
							data: newUser,
						});
					})
					.catch((error) => {
						res.status(400).json({
							message: error.message,
						});
					});
			})
			.catch((error) => {
				res.status(400).json({
					message: error.message,
				});
			});
	},
	async updateUser(id, user) {
		const imageUrl = `/images/${user.email}.${user.imageType}`;
		const type =
			user.imageType === "png"
				? /^data:image\/png;base64,/
				: /^data:image\/jpeg;base64,/;
		const base64Data = user.image.replace(type, "");
		const fileName = imageUrl.split("/images/")[1];
		const newUser = await User.findById(id);
		fs.unlink(`images/${fileName}`, () => {
			bcrypt
				.hash(user.password, 10)
				.then((hash) => {
					fs.writeFile(
						`images/${user.email}.${user.imageType}`,
						base64Data,
						"base64",
						function (err) {
							console.log(err);
						}
					);
					newUser.username = user.username;
					newUser.password = hash;
					newUser.email = user.email;
					newUser.comment = user.comment;
					newUser.imageUrl = imageUrl;
					return newUser.save();
				})
				.catch((error) => {
					res.status(400).json({
						message: error.message,
					});
				});
		});
	},
	removeUser(id, imageUrl) {
		const fileName = imageUrl.split("/images/")[1];
		fs.unlink(`images/${fileName}`, async () => {
			return await User.findOneAndDelete({ _id: id });
		});
	},
};
