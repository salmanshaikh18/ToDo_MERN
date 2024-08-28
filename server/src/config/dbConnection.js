import mongoose from "mongoose"
import { handleError } from "../utils/handleError.js"

export const connectToDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            dbName: "ToDo"
        })
        .then((db) => {
            console.log(`Database named ${db.connection.name} is connected to ${db.connection.host} at port ${db.connection.port}`)
        })
    } catch (error) {
        handleError(error, "connectToDB")
    }
}