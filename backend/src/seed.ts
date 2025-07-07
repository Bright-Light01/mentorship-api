import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./models/user.models"

dotenv.config();

const users: any[] = [];

const seedUsers= async() =>{
    await mongoose.connect(process.env.MONGO_URI || "");
    for (let i=1; i<=10; i++){
        users.push({
            name: 'Mentee i',
            email: 'mentee{i}@example.com',
            password: 'pass1234',
            role: "mentee",
        });
    }

    for (let i=1; i<=10; i++) {
        users.push({
            name: 'mentor i',
            email: 'mentor{i}@example.com',
            password: 'mentor1234',
            role: "mentor"
        })
    }

    for (let i=1; i<=2; i++) {
        users.push({
            name: 'Admin i',
            email: 'admin{i}@example.com',
            password: 'admin123',
            role: "admin",
        });
    }
    await User.insertMany(users);
    console.log("Users seeded");
    process.exit();
};
seedUsers();