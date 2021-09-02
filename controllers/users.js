const usersService = require("../services/users");

module.exports = {
	async getUsers(req, res) {
		try {
			const users = await usersService.getUsers();
			res.json({
				status: 200,
				data: users,
			});
		} catch (error) {
			res.status(400).json({
				status: 400,
				message: error.message,
			});
		}
	},
	async getUser(req, res) {
		try {
			const id = req.params.id;
			const user = await usersService.getUser(id);
			res.json({
				status: 200,
				data: user,
			});
		} catch (error) {
			res.status(400).json({
				status: 400,
				message: error.message,
			});
		}
	},
	async addUser(req, res, next) {
		const user = req.body;
		try {
			const newUser = await usersService.addUser(user, res);
		} catch (error) {
			res.status(400).json({
				status: 400,
				message: error.message,
			});
		}
	},
	async updateUser(req, res, next) {
		const user = req.body;
		const id = req.params.id;
		try {
			const newUser = await usersService.updateUser(id, user);
			res.json({
				status: 203,
				data: newUser,
			});
		} catch (error) {
			res.status(400).json({
				status: 400,
				message: error.message,
			});
		}
	},
	async removeUser(req, res, next) {
		const id = req.params.id;
		const imageUrl = req.body.imageUrl;
		try {
			const oldUser = await usersService.removeUser(id, imageUrl);
			res.status(207).json({
				data: oldUser,
			});
		} catch (error) {
			res.status(400).json({
				status: 400,
				message: error.message,
			});
		}
	},
};
