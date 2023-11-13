let isConnect = false;
import mongoose from 'mongoose';

export const connectToMongoDB = async () => {
	mongoose.set('strictQuery', true);

	if (!process.env.MONGODB_URI) return console.log('MongoDB url is not found!');
	if (isConnect) return console.log('Already connected');

	try {
		await mongoose.connect(process.env.MONGODB_URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
		isConnect = true;
		console.log('Connected to mongoDB');
	} catch (error) {
		console.log(error);
	}
};
