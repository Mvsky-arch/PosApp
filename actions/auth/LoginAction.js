"use server";
import bcrypt from "bcrypt";
import Users from "@/models/TableModel.js";
import { LoginFormSchema } from "@/lib/Rules";
import { createSession } from "@/lib/Session";

const LoginAction = async (state, formData) => {
  const email = formData.get("email").toLowerCase();
  const password = formData.get("password");

  const validateFields = LoginFormSchema.safeParse({
    email,
    password,
  });

  if (!validateFields.success) {
    return {
      errors: validateFields.error.flatten().fieldErrors,
      success: false,
      email,
      password,
    };
  }

  try {
    const user = await Users.findOne({ where: { email } });
    if (!user)
      return {
        errors: {
          email: ["User Not Found !!!"],
        },
        success: false,
        email,
        password,
      };

    if (!user.dataValues.isVerified)
      return {
        errors: {
          email: ["User Not Verified !!!"],
        },
        success: false,
        email,
        password,
      };

    const match = await bcrypt.compare(password, user.password);

    if (!match)
      return {
        errors: {
          password: ["Password Not Match !!!"],
        },
        success: false,
        email,
        password,
      };

    await createSession(
      user.dataValues.id,
      user.dataValues.name,
      user.dataValues.email
    );

    return {
      message: "Login Accepted ....",
      success: true,
      email,
      password,
    };
    //    redirect("/dashboard");
  } catch (error) {
    console.log(error);
  }
};

export { LoginAction };
