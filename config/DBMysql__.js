import { Sequelize } from "sequelize";

const db = new Sequelize({
  host: "103.197.191.88",
  username: "pos_admin",
  password: "Mysecret8181",
  database: process.env.DATABASE,
  dialect: "mysql",
  dialectModule: require("mysql2"),
  benchmark: true,
  logging: false,
  define: {
    timestamps: false,
  },
});

async () => {
  try {
    await db.authenticate();
    console.log("Database Connection Success ....");
    await db.sync({ alter: true });
  } catch (error) {
    console.log(error);
  }
};

export default db;
