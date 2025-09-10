import { Sequelize } from "sequelize";

const db = new Sequelize({
  host: process.env.HOST,
  username: "root",
  password: "",
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
