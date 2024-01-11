import colors from "colors";
import mongoose from "mongoose";

export function connect() {
          mongoose.connect(process.env.MONGO_URL!, {
                    tls: true,
                    ssl: true,
          }).then(() => {
                    console.log(colors.green.bold.italic(`🌐 Server running on port 3000 🔥`))
                    console.log(colors.green.bold.italic(`🗄️  Database connected ❤️‍🔥`))
          })
                    .catch((err) => console.log(colors.red.bold.italic(`${err}`)));
}