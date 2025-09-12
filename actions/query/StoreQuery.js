"use server";
import { Op } from "sequelize";

import {
  BisnisTable,
  BranchTable,
  StaffTable,
  StaffRoleTable,
  KategoryTable,
  ProductTable,
  SalesTable,
} from "@/models/TableModel";

const GetStoreData = async (user_id) => {
  const bisnisList = await BisnisTable.findAll({
    where: { user_id, is_active: 1 },
    raw: true,
  });

  // console.log(bisnisList);
  const branchList = await BranchTable.findAll({
    where: { user_id, is_active: 1 },
    raw: true,
  });

  const staffList = await StaffTable.findAll({
    where: { user_id, is_active: 1 },
    raw: true,
  });

  const staffRole = await StaffRoleTable.findAll({
    where: { user_id, is_active: 1 },
    raw: true,
  });

  const kategory = await KategoryTable.findAll({
    where: { user_id, is_active: 1 },
    raw: true,
  });

  const productList = await ProductTable.findAll({
    where: { user_id, is_active: 1 },
    raw: true,
  });

  return {
    bisnisList,
    branchList,
    staffList,
    staffRole,
    kategory,
    productList,
  };
};

export const GetSalesDataByTimeRange = async (user_id, TimeRange) => {
  const data = await SalesTable.findAll({
    raw: true,
    where: {
      date: {
        [Op.between]: [
          new Date(TimeRange.startDate),
          new Date(TimeRange.endDate),
        ],
      },
      user_id,
    },
  });
  const dataSales = JSON.stringify(data);
  return { dataSales };
};

export default GetStoreData;
