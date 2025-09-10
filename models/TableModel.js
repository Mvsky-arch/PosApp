import { Sequelize } from "sequelize";
import db from "@/config/DBMysql.js";

const { DataTypes } = Sequelize;

const Users = db.define(
  "__users_table_",
  {
    userUniqeId: DataTypes.STRING,
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    PIN: DataTypes.STRING,
    refresh_token: DataTypes.TEXT,
    isVerified: DataTypes.SMALLINT,
    lostPassReqToken: DataTypes.STRING,
    verifyToken: DataTypes.STRING,
    is_active: DataTypes.INTEGER,
  },
  { freezeTableName: true }
);

export const BisnisTable = db.define(
  "__bisnis_table_",
  {
    businnessName: DataTypes.STRING,
    businnessPhone: DataTypes.STRING,
    businnessAddress: DataTypes.STRING,
    user_id: DataTypes.INTEGER,
    is_active: DataTypes.INTEGER,
  },
  { freezeTableName: true }
);

export const PaymentTable = db.define(
  "__payment_table_",
  {
    payment: DataTypes.STRING,
  },
  { freezeTableName: true }
);

export const BranchTable = db.define(
  "__branch_table_",
  {
    branchName: DataTypes.STRING,
    branchPhone: DataTypes.STRING,
    branchAddress: DataTypes.STRING,
    user_id: DataTypes.INTEGER,
    bisnis_id: DataTypes.INTEGER,
    is_active: DataTypes.INTEGER,
  },
  { freezeTableName: true }
);

export const ProductTable = db.define(
  "__product_table_",
  {
    product_name: DataTypes.STRING,
    product_description: DataTypes.STRING,
    product_price: DataTypes.INTEGER,
    product_base_price: DataTypes.INTEGER,
    product_url: DataTypes.STRING,
    is_active: DataTypes.INTEGER,
    bisnis_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    kategory_id: DataTypes.INTEGER,
  },
  { freezeTableName: true }
);

export const KategoryTable = db.define(
  "__kategory_table_",
  {
    kategory_name: DataTypes.STRING,
    bisnis_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    is_active: DataTypes.INTEGER,
  },
  { freezeTableName: true }
);

export const StaffTable = db.define(
  "__staff_table_",
  {
    id_number: DataTypes.STRING,
    name: DataTypes.STRING,
    phone: DataTypes.STRING,
    email: DataTypes.STRING,
    user_id: DataTypes.INTEGER,
    is_active: DataTypes.INTEGER,
  },
  { freezeTableName: true }
);

export const StaffRoleTable = db.define(
  "__role_table_",
  {
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    PIN: DataTypes.STRING,
    branch_id: DataTypes.INTEGER,
    staff_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    role: DataTypes.STRING,
    is_active: DataTypes.INTEGER,
  },
  { freezeTableName: true }
);

export const SalesTable = db.define(
  "__sales_table_",
  {
    date: DataTypes.DATE,
    time: DataTypes.TIME,
    customer_name: DataTypes.STRING,
    table_number: DataTypes.INTEGER,
    order_list: DataTypes.STRING,
    total_order: DataTypes.INTEGER,
    bisnis_id: DataTypes.INTEGER,
    branch_id: DataTypes.INTEGER,
    staff_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
  },
  { freezeTableName: true }
);

(async () => {
  await db.sync();
})();

export default Users;
