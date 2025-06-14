// React Hook Form dependencies
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { signUp } from "../utils/queries.js";
import { z } from "zod/v4";
import { zodResolver } from "@hookform/resolvers/zod";
import { NavLink } from "react-router";

function Signup() {
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

  const onSubmit = async (dataInput) => {
    // Email needs to be a valid email, password at least 6 chars
    const email = dataInput.email;
    const password = dataInput.password;
    console.log(`email: ${email} password: ${password}`);
    await signUp(email, password);

    // reset all field values
    resetField("email");
    resetField("password");
  };

  return (
    <div className="flex flex-col text-sm">
      <div>Sign up</div>
      <form action="" onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="">Email:</label>
        <input type="email" {...register("email")} />
        <label htmlFor="">Password:</label>
        <input
          type="password"
          {...register("password", {
            minLength: { value: 6, message: "Password must be 6 characters or more" },
          })}
        />
        <button
          type="submit"
          className="rounded-lg border-2 border-emerald-500 bg-emerald-200 py-[1px] px-2"
        >
          Sign up
        </button>
        <ErrorMessage
          errors={errors}
          name="password"
          render={({ message }) => <p>{message}</p>}
          className="text-red-600"
        />
      </form>
      <NavLink to="/">Back to main</NavLink>
    </div>
  );
}

export default Signup;
