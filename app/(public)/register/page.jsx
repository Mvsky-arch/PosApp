import RegisterForm from "@/component/auth/RegisterForm";
import { isLogin } from "@/lib/LogCheck.js";

const RegisterPage = async () => {
  await isLogin();
  return (
    <div>
      <RegisterForm />
    </div>
  );
};

export default RegisterPage;
