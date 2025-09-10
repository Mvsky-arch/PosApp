import stringprops from "@/config/Const";

export const GetBranchListByBisnisId = (BranchList, bisnisId) => {
  let newArray = [];
  for (let i = 0; i < BranchList.length; i++) {
    if (BranchList[i].bisnis_id === bisnisId) {
      newArray.push(BranchList[i]);
    }
  }
  return newArray;
};

export const GetStaffRoleByBranchId = (StaffRoleList, branch_id) => {
  let newArray = [];
  for (let i = 0; i < StaffRoleList.length; i++) {
    if (StaffRoleList[i].branch_id === branch_id) {
      newArray.push(StaffRoleList[i]);
    }
  }
  return newArray;
};

export const GetFOByBranchId = (staff, branch_id) => {
  for (let i = 0; i < staff.length; i++) {
    if (
      staff[i].role === stringprops.FRONT_OFFICE_ROLE &&
      staff[i].branch_id === branch_id
    ) {
      return staff[i];
    }
  }
  return null;
};

export const GetBOByBranchId = (StaffRoleList, branch_id) => {
  for (let i = 0; i < StaffRoleList.length; i++) {
    if (
      StaffRoleList[i].role === stringprops.BACK_OFFICE_ROLE &&
      StaffRoleList[i].branch_id === branch_id
    ) {
      return StaffRoleList[i];
    }
  }
  return null;
};

export const StaffListFilter = (StaffList, RoleList) => {
  let newArray = StaffList;
  for (let j = 0; j < RoleList.length; j++) {
    const role = RoleList[j];
    newArray = newArray.filter((staff) => staff.id !== role.staff_id);
  }
  return newArray;
};

export const getKategoryLengthByBisnisId = (
  kategoryListObj,
  bisnisIdSelected
) => {
  let newArray = [];
  newArray = kategoryListObj.filter(
    (kategory) => kategory.bisnis_id === bisnisIdSelected
  );

  return newArray.length;
};

export const getProductByBisnisId = (productListObj, bisnis_id) => {
  let products = [];
  products = productListObj.filter(
    (product) => product.bisnis_id === bisnis_id
  );

  return products;
};

export const getProductByKategoryId = (productListObj, kategory_id) => {
  let products = [];
  products = productListObj.filter(
    (product) => product.kategory_id === kategory_id
  );

  return products;
};

export const getKategoryByBisnisId = (kategoryList, bisnis_id) => {
  let kategory = [];
  kategory = kategoryList.filter(
    (kategory) => kategory.bisnis_id === bisnis_id
  );

  return kategory;
};

export const bisnisListSort = (arr) => {
  return arr.sort((a, b) => a.businnessName.localeCompare(b.businnessName));
};

export const kategoryListSort = (arr) => {
  return arr.sort((a, b) => a.kategory_name.localeCompare(b.kategory_name));
};

export const productListSort = (arr) => {
  return arr.sort((a, b) => a.product_name.localeCompare(b.product_name));
};

export const branchListSort = (arr) => {
  return arr.sort((a, b) => a.branchName.localeCompare(b.branchName));
};

export const staffListSort = (arr) => {
  return arr.sort((a, b) => a.name.localeCompare(b.name));
};

export const getSalesDataByBranchId = (salesData, branchId) => {
  let data = [];
  let revenue = 0;
  let modal = 0;
  data = salesData?.filter((data) => data.branch_id === branchId);

  data?.map((item) => {
    revenue += item.total_order;
    const orderlist = item.order_list;
    JSON.parse(orderlist).map((product) => {
      modal = modal + product.product_base_price * product.qty;
    });
  });
  const rows = data?.length;

  return { data, rows, revenue, modal };
};

export const getSalesDataByBisnisId = (salesData, bisnisId) => {
  let data = [];
  let revenue = 0;
  let modal = 0;
  data = salesData?.filter((data) => data.bisnis_id === bisnisId);

  data?.map((item) => {
    revenue += item.total_order;
    const orderlist = item.order_list;
    JSON.parse(orderlist).map((product) => {
      modal = modal + product.product_base_price * product.qty;
    });
  });
  const rows = data?.length;

  return { data, rows, revenue, modal };
};
