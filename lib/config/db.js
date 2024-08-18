import mongoose from "mongoose";

export const ConnectDB = async () => {
	await mongoose.connect(
		"mongodb+srv://kominforthewin:d2tZnEjwsItgxcwP@cluster0.wxfij.mongodb.net/blog-app"
	);
	console.log("DB Connected");
};
