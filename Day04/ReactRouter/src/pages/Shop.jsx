/* eslint-disable no-unused-vars */

import React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const registrationSchema = z.object({
  firstName: z.string().min(3, "First name must be at least 3 characters long"),

  lastName: z.string().min(3, "Last name must be at least 3 characters long"),

  email: z.string().email("Please enter a valid email address"),

  password: z.string().min(6, "Password must be at least 6 characters long"),

  country: z.string().min(1, "Please select a country"),

  city: z.string().min(2, "City is required"),

  address: z.string().min(5, "Address is required"),

  state: z.string().min(2, "State is required"),

  zipCode: z.string().min(3, "ZIP code is required"),
});

function Shop() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      country: "",
      city: "",
      address: "",
      state: "",
      zipCode: "",
    },
  });

  const onSubmit = (data) => {
    console.log("Registration Data:", data);
    alert("Form Submitted Successfully!");
    reset();
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-6">
      <div className="w-full max-w-5xl rounded-2xl bg-white p-8 shadow-xl">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="border-b border-gray-200 pb-8">
            <h2 className="text-2xl font-bold text-gray-900">
              Shop What You Want
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              Fill in your details below.
            </p>

            <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
              {/* First Name */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  First Name
                </label>

                <input
                  type="text"
                  {...register("firstName")}
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500"
                />

                {errors.firstName && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.firstName.message}
                  </p>
                )}
              </div>

              {/* Last Name */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Last Name
                </label>

                <input
                  type="text"
                  {...register("lastName")}
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500"
                />

                {errors.lastName && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.lastName.message}
                  </p>
                )}
              </div>

              {/* Email */}
              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Email Address
                </label>

                <input
                  type="email"
                  {...register("email")}
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500"
                />

                {errors.email && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Password */}
              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Password
                </label>

                <input
                  type="password"
                  {...register("password")}
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500"
                />

                {errors.password && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Country */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Country
                </label>

                <select
                  {...register("country")}
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="">Select Country</option>
                  <option value="United States">United States</option>
                  <option value="Canada">Canada</option>
                  <option value="Mexico">Mexico</option>
                </select>

                {errors.country && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.country.message}
                  </p>
                )}
              </div>

              {/* City */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  City
                </label>

                <input
                  type="text"
                  {...register("city")}
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-indigo-500"
                />

                {errors.city && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.city.message}
                  </p>
                )}
              </div>

              {/* Address */}
              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Street Address
                </label>

                <input
                  type="text"
                  {...register("address")}
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-indigo-500"
                />

                {errors.address && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.address.message}
                  </p>
                )}
              </div>

              {/* State */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  State / Province
                </label>

                <input
                  type="text"
                  {...register("state")}
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-indigo-500"
                />

                {errors.state && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.state.message}
                  </p>
                )}
              </div>

              {/* ZIP */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  ZIP / Postal Code
                </label>

                <input
                  type="text"
                  {...register("zipCode")}
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-indigo-500"
                />

                {errors.zipCode && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.zipCode.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="mt-8 flex justify-end gap-4">
            <button
              type="button"
              onClick={() => reset()}
              className="rounded-lg border border-gray-300 px-5 py-2 hover:bg-gray-50"
            >
              Reset
            </button>

            <button
              type="submit"
              className="rounded-lg bg-indigo-600 px-6 py-2 text-white shadow-md hover:bg-indigo-700"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Shop;
