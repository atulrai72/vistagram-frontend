import { LoginForm } from "@/features/authentication/login-form";

export default function Login() {
  return (
    <div className="flex 100vh min-h-screen justify-center items-center">
      <div>
        <img src="./../../home.png" alt="" />
      </div>
      <LoginForm />
    </div>
  );
}
