import LoginForm from "@/component/auth/LoginForm";
import { isLogin } from "@/lib/LogCheck";

const LoginPage = async () => {
  await isLogin();
  return (
    <div>
      <LoginForm />
    </div>
  );
};

export default LoginPage;
