"use server";
import Users from "@/models/TableModel.js";
import { createRandomString } from "@/lib/MyLib";
import { RegisterFormSchema } from "@/lib/Rules";
import bcrypt from "bcrypt";

// import { Resend } from "resend";

// const resend = new Resend(process.env.RESEND_SERVER_API);

const RegisterAction = async (state, formData) => {
  const name = formData.get("name");
  const email = formData.get("email").toLowerCase();
  const password = formData.get("password");
  const confirmPassword = formData.get("confirmPassword");

  const validateFields = RegisterFormSchema.safeParse({
    name,
    email,
    password,
    confirmPassword,
  });

  if (!validateFields.success) {
    return {
      errors: validateFields.error.flatten().fieldErrors,
      name,
      email,
      password,
      confirmPassword,
    };
  }

  const isEmailExists = await Users.findOne(
    {
      where: { email: formData.get("email") },
    },
    { attributes: ["id", "email", "name"] }
  );

  if (isEmailExists != null) {
    return {
      errors: {
        email: ["Cannot Register Users, Email Has Been Registered !!!"],
      },
      name,
      email,
      password,
      confirmPassword,
    };
  }

  const salt = await bcrypt.genSalt();
  const hashPassword = await bcrypt.hash(password, salt);
  const verifyToken = createRandomString(20);

  Users.create({
    id: Date.now(),
    name,
    email,
    password: hashPassword.toString(),
    isVerified: 0,
    verifyToken,
  });

  // await SendingEmail(email);

  return {
    errors: {},
    success: {
      message: "Registered Completed....",
    },
  };
};

export { RegisterAction };

// const SendingEmail = async (email) => {
//   const { data, error } = await resend.emails.send({
//     from: "No-Reply <admin@admin.saniapps.com>",
//     to: [email],
//     subject: "Hello World",
//     html: "<strong>It works!</strong>",
//   });

//   if (error) {
//     return console.error({ error });
//   }

//   console.log({ data });
// };
