import mongoose from 'mongoose';

const todoSchema = new mongoose.Schema({
	title: { type: String, require: true },
	author: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Author',
		require: true,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

const Todo = mongoose.models.Todo || mongoose.model('Todo', todoSchema);

export default Todo;
