import app from "./app";
import mongoose from "mongoose";
import config from "./app/config";
import seedSuperAdmin from "./app/DB";


async function main() {
  try {
    await mongoose.connect(`${config.dbs}`);
    seedSuperAdmin()
    app.listen(config.port, () => {
      console.log(`app is listening on Port ${config.port}`);
    });

  } catch (error) {
    console.log(error);

  }





}

main()
// async function bootstrap() {
//   server = app.listen(config.port, () => {
//     console.log(`app is listening on Port ${config.port}`);
//   });
// }



// bootstrap();