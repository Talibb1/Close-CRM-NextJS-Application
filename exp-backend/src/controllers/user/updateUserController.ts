import { Request, Response } from "express";
import prisma from "../../prisma/prismaClient";

const validRoles = ["Admin", "Restricted User", "Super User", "User"];

const UpdateUser = async (req: Request, res: Response): Promise<Response> => {
  const {
    firstName,
    lastName,
    email,
    avatar,
    roles,
    address,   
    phoneNumber, 
  } = req.body;

  const { id } = req.params;

  if (!id) {
    return res.status(400).json({
      status: "failed",
      message: "User ID is required.",
    });
  }

  if (roles && !roles.every((role: string) => validRoles.includes(role))) {
    return res.status(400).json({
      status: "failed",
      message: "Invalid role(s) provided.",
    });
  }

  try {
    const existingUser = await prisma.user.findUnique({
      where: { id: parseInt(id) },
    });

    if (!existingUser) {
      return res.status(404).json({
        status: "failed",
        message: "User not found.",
      });
    }
    const updateData: any = {
      firstName: firstName || existingUser.firstName,
      lastName: lastName || existingUser.lastName,
      email: email || existingUser.email,
      avatar: avatar || existingUser.avatar,
      roles: roles || existingUser.roles,  
      address: address || existingUser.address, 
      phoneNumber: phoneNumber || existingUser.phoneNumber,
      updatedAt: new Date(),
    };
    const updatedUser = await prisma.user.update({
      where: { id: parseInt(id) },
      data: updateData,
    });

    return res.status(200).json({
      status: "success",
      message: "User updated successfully.",
      data: updatedUser,
    });
  } catch (error) {
    console.error("User update error:", error);
    return res.status(500).json({
      status: "failed",
      message: "Server error. Please try again later.",
    });
  }
};

export default UpdateUser;
