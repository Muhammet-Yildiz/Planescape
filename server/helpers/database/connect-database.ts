import mongoose from "mongoose";

const connectDatabase = async (): Promise<void> => {
    try {
        await mongoose.connect(process.env.MONGO_URI as string);
        console.log("MongoDB Connection Successfully");
    } catch (error) {
        console.error("MongoDB Connection Failed", error);
        process.exit(1); 
    }
};

export default connectDatabase;