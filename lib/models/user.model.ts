import mongoose from 'mongoose';

const authorSchema = new mongoose.Schema({
	id: { type: String, require: true },
	name: { type: String, require: true },
	image: String,
	email: { type: String, require: true },
	todos: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Todo',
		},
	],
	categories: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Category',
		},
	],
});

const Author = mongoose.models.Author || mongoose.model('Author', authorSchema);

export default Author;
