import { Request, Response } from "express";
import prisma from "../../prisma/prismaClient";

const CreateMember = async (req: Request, res: Response): Promise<Response> => {
  const { email, role } = req.body;
  
  const userId = parseInt(req.cookies.userId || "", 10);
  if (!email || !role || isNaN(userId)) {
    return res.status(400).json({
      status: "failed",
      message: "Email, role, and valid user ID are required.",
    });
  }

  try {
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (!existingUser) {
      return res.status(404).json({
        status: "failed",
        message: `No user found with the email "${email}".`,
      });
    }
    const existingAccess = await prisma.leadAccess.findFirst({
      where: {
        userId: existingUser.id,
        leadId: req.body.leadId,
      },
    });

    if (existingAccess) {
      return res.status(400).json({
        status: "failed",
        message: `User already has access to this lead.`,
      });
    }
    const newLeadAccess = await prisma.leadAccess.create({
      data: {
        userId: existingUser.id,
        leadId: req.body.leadId,
        role,
      },
    });
    return res.status(201).json({
      status: "success",
      message: "Member access created successfully.",
      data: newLeadAccess,
    });
  } catch (error) {
    console.error("Member creation error:", error);
    return res.status(500).json({
      status: "failed",
      message: "Server error. Please try again later.",
    });
  }
};

export default CreateMember;
