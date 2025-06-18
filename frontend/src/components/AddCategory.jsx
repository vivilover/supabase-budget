import { HexColorPicker, HexColorInput } from "react-colorful";
import { useState, useContext } from "react";
import { z } from "zod/v4";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { AuthContext } from "./AuthContext";
import { insertCategory } from "../utils/queries.js";

function AddCategory() {
  const { user } = useContext(AuthContext);
  // Q: for color, but is this necessary?
  const [color, setColor] = useState("#aabbcc");

  // React Hook Form
  const {
    register,
    handleSubmit,
    watch,
    resetField,
    formState: { errors },
    control,
    reset,
  } = useForm({
    defaultValues: {
      name: "",
      // color: '#000000',
    },
  });

  // check if the category name already exists (CANNOT ADD in that case)
  const onSubmit = async (dataInput) => {
    console.log(dataInput);
    const name = dataInput.name;
    // const color = dataInput.color;
    const result = await insertCategory(name, user.id);
    // reset all field values
    reset();
  };

  return (
    <form action="" onSubmit={handleSubmit(onSubmit)} className="flex gap-2">
      <label htmlFor="name">Name:</label>
      <input type="text" {...register("name")} className="h-[23px]" />
      {/* <label htmlFor="color">Pick a color: </label> */}
      {/* <HexColorPicker {...register("color")} className="inline" />
      <HexColorInput {...register("color")} /> */}
      {/* <HexColorPicker color={color} onChange={setColor} />;
      <HexColorInput color={color} onChange={setColor} {...register("color")}/> */}
      {/* <Controller
        control={control}
        name="color"
        render={({ field: { onChange, onBlur, value, ref } }) => (
          <HexColorPicker
            onChange={onChange}
            onBlur={onBlur}
            selected={value}
          />
        )}
      /> */}
      <button
        type="submit"
        className="self-start rounded-lg border-2 border-emerald-500 bg-emerald-200 py-[1px] px-2"
      >
        Add
      </button>
    </form>
  );
}

export default AddCategory;
