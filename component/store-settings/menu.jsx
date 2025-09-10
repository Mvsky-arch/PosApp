"use client";
import { useRouter } from "next/navigation";
import PrimaryButton from "@/component/item/button/PrimaryButton";

const StoreSettingsMenu = ({ bisnisList }) => {
  const router = useRouter();
  return (
    <div className="flex flex-row space-x-2 w-full items-end">
      <PrimaryButton
        classType="primary-button"
        label="Add Bisnis"
        clickAction={() => router.push("/store-settings/add-bisnis")}
      />

      {JSON.parse(bisnisList).length > 0 && (
        <PrimaryButton
          classType="primary-button"
          label="Add Branch"
          clickAction={() => router.push("/store-settings/add-branch")}
        />
      )}
    </div>
  );
};

export default StoreSettingsMenu;
