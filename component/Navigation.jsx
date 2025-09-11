"use server";
import LogoutBtn from "@/component/item/LogoutBtn";
import NavLink from "@/component/item/NavLink";
import getAuthUser from "@/lib/GetAuthUser";
import { DropDownMenu } from "@/component/Menu";

const Navigation = async () => {
  // const authUser = await getAuthUser();

  const StoreMenuList = [
    { label: "Add Bisnis", href: "/store-settings/add-bisnis" },
  ];

  return (
    <div className="flex flex-row justify-between w-full px-8 items-center">
      {/* {JSON.stringify(authUser)} */}
      <NavLink href="/" label="Home" />
      <div className="space-x-4 items-center">
        {/* {authUser ? ( */}
        <div className="flex flex-row items-center space-x-2">
          <NavLink href="/dashboard" label="Dashboard" />
          <DropDownMenu
            href="/store-settings"
            label="Store Settings"
            menuList={StoreMenuList}
          />
          <NavLink href="/product" label="Product" />
          <NavLink href="/staff" label="Staff" />
          <NavLink href="/sales" label="Sales" />
          <NavLink href="/settings" label="Settings" />
          <LogoutBtn />
        </div>
        {/* ) : ( */}
        <div className="flex flex-row items-center space-x-2">
          <NavLink href="/register" label="Register" />
          <NavLink href="/login" label="Login" />
        </div>
        {/* )} */}
      </div>
    </div>
  );
};

export default Navigation;
