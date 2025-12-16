import mongoose from "mongoose";

try {
  await mongoose.connect(
    "mongodb://admin:admin@localhost:27017/todos?authSource=admin"
  );
  console.log("Connected to Database")
} catch (error) {
    console.log(error.message)
    process.exit(1);
}

process.on("SIGINT", async () => {
  mongoose.disconnect();
  console.log("Client Disconnected");
  process.exit(0);
});
