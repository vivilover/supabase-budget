import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { z } from "zod/v4";
import { zodResolver } from "@hookform/resolvers/zod";
import { supabase, signIn, signOut } from "../utils/queries";
import { NavLink, Outlet } from "react-router";
import { useContext } from "react";
import { AuthContext } from './AuthContext';

function Login() {
  const { login, logout } = useContext(AuthContext);

  const userSchema = z.object({
    email: z.email({ error: "Invalid email address" }),
    password: z.string().min(6),
  });

  // React Hook Form
  const {
    register,
    handleSubmit,
    watch,
    resetField,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(userSchema),
  });

  const signOutUser = async () => {
    await signOut();
    logout();
  }

  const onSubmit = async (dataInput) => {
    const email = dataInput.email;
    const password = dataInput.password;
    await signIn(email, password);
    
    resetField("email");
    resetField("password");
    const {
      data: { user },
    } = await supabase.auth.getUser();
    login({
      id: user.id,
      email: user.email,
    });
    console.log(`ID: ${user.id}`);
    console.log(`email: ${user.email}`);
  };

  return (
    <div className="flex flex-col">
      <form
        action=""
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col border-2 border-gray-500 mx-auto text-sm w-1/4"
      >
        <label htmlFor="">Email: </label>
        <input type="email" {...register("email")} className="border-2 border-gray-500" />
        <label htmlFor="">Password: </label>
        <input type="password" {...register("password")} className="border-2 border-gray-500" />
        <button type="submit">Login</button>
      </form>
      <NavLink
        to="sign-up"
        className="underline decoration-2 decoration-indigo-500 self-center text-sm"
      >
        Sign up
      </NavLink>
      <button type="button" onClick={signOutUser}>Sign out</button>
    </div>
  );
}

export default Login;
