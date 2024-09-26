"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/ui/input";
import { Button } from "@/components/custom/button";
import * as Switch from "@radix-ui/react-switch";
import { useState } from "react";
import Image from "next/image";
import { ProfileSchema } from "./validationschema";

export default function Profile() {
  const [defaultData] = useState({
    fullName: "Chase Day",
    email: "joana.simonis84@gmail.com",
    phone: "010 1234 5678",
    state: "Virginia",
    country: "China",
    address: "908 Jack Locks",
    city: "Rancho Cordova",
    zipcode: "85807",
    company: "Mraz, Donnelly and Collins",
    role: "Graphic Designer",
    banned: false,
    emailVerified: true,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm({
    resolver: zodResolver(ProfileSchema),
    defaultValues: defaultData,
  });

  const onSubmit = (data: any) => {
    console.log("Form data:", data);
  };

  return (
    <div className="container mx-auto p-3 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl">
      <div className="bg-white rounded-lg p-6 shadow-lg flex flex-col items-center space-y-4">
        <div className="relative w-24 h-24">
          <input
            type="file"
            accept="image/*"
            className="absolute inset-0 opacity-0 cursor-pointer"
          />
          {/* Display uploaded image */}
          <Image
            src="" 
            alt="User avatar"
            width={96}
            height={96}
            className="rounded-full object-cover"
          />
          <div className="absolute inset-0 rounded-full border border-dashed border-gray-300"></div>
        </div>
        <p className="text-sm text-gray-500">
          Allowed *.jpeg, *.jpg, *.png, *.gif
        </p>
        <p className="text-xs text-gray-400">Max size of 3MB</p>

        {/* Banned Toggle */}
        <div className="flex items-center justify-between w-full">
          <p className="text-gray-600">Banned</p>
          <Switch.Root
            className={`${
              watch("banned") ? "bg-green-500" : "bg-gray-200"
            } relative inline-flex h-6 w-11 items-center rounded-full`}
            checked={watch("banned")}
            onCheckedChange={(value) => setValue("banned", value)}
          >
            <Switch.Thumb
              className={`${
                watch("banned") ? "translate-x-6" : "translate-x-1"
              } inline-block h-4 w-4 transform bg-white rounded-full`}
            />
          </Switch.Root>
        </div>

        {/* Email Verified Toggle */}
        <div className="flex items-center justify-between w-full">
          <p className="text-gray-600">Email Verified</p>
          <Switch.Root
            className={`${
              watch("emailVerified") ? "bg-green-500" : "bg-gray-200"
            } relative inline-flex h-6 w-11 items-center rounded-full`}
            checked={watch("emailVerified")}
            onCheckedChange={(value) => setValue("emailVerified", value)}
          >
            <Switch.Thumb
              className={`${
                watch("emailVerified") ? "translate-x-6" : "translate-x-1"
              } inline-block h-4 w-4 transform bg-white rounded-full`}
            />
          </Switch.Root>
        </div>

        {/* Delete User Button */}
        <Button variant="destructive" className="w-full">
          Delete User
        </Button>
      </div>

      {/* Right Panel - Form */}
      <div className="col-span-2 bg-white rounded-lg p-6 shadow-lg space-y-4">
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Two-column layout for form fields */}
          <div className="grid grid-cols-2 gap-4">
            {/* Full Name */}
            <div className="flex flex-col">
              <label htmlFor="fullName" className="text-sm text-gray-600">
                Full Name
              </label>
              <Input id="fullName" type="text" {...register("fullName")} />
              {errors.fullName && (
                <p className="text-red-500 text-xs">
                  {errors.fullName.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div className="flex flex-col">
              <label htmlFor="email" className="text-sm text-gray-600">
                Email Address
              </label>
              <Input id="email" type="email" {...register("email")} />
              {errors.email && (
                <p className="text-red-500 text-xs">{errors.email.message}</p>
              )}
            </div>

            {/* Phone Number */}
            <div className="flex flex-col">
              <label htmlFor="phone" className="text-sm text-gray-600">
                Phone Number
              </label>
              <div className="flex items-center">
                <span className="flex-shrink-0 mr-2">🇨🇳</span>
                <Input id="phone" type="text" {...register("phone")} />
              </div>
              {errors.phone && (
                <p className="text-red-500 text-xs">{errors.phone.message}</p>
              )}
            </div>

            {/* State / Region */}
            <div className="flex flex-col">
              <label htmlFor="state" className="text-sm text-gray-600">
                State / Region
              </label>
              <Input id="state" type="text" {...register("state")} />
            </div>

            {/* Country */}
            <div className="flex flex-col">
              <label htmlFor="country" className="text-sm text-gray-600">
                Country
              </label>
              <div className="flex items-center">
                <span className="flex-shrink-0 mr-2">🇨🇳</span>
                <Input id="country" type="text" {...register("country")} />
              </div>
            </div>

            {/* Address */}
            <div className="flex flex-col">
              <label htmlFor="address" className="text-sm text-gray-600">
                Address
              </label>
              <Input id="address" type="text" {...register("address")} />
            </div>

            {/* City */}
            <div className="flex flex-col">
              <label htmlFor="city" className="text-sm text-gray-600">
                City
              </label>
              <Input id="city" type="text" {...register("city")} />
            </div>

            {/* Zip Code */}
            <div className="flex flex-col">
              <label htmlFor="zipcode" className="text-sm text-gray-600">
                Zip Code
              </label>
              <Input id="zipcode" type="text" {...register("zipcode")} />
            </div>

            {/* Company */}
            <div className="flex flex-col">
              <label htmlFor="company" className="text-sm text-gray-600">
                Company
              </label>
              <Input id="company" type="text" {...register("company")} />
            </div>

            {/* Role */}
            <div className="flex flex-col">
              <label htmlFor="role" className="text-sm text-gray-600">
                Role
              </label>
              <Input id="role" type="text" {...register("role")} />
            </div>
          </div>

          {/* Submit Button */}
          <div className="mt-6">
            <Button type="submit" className="w-full">
              Save Changes
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
