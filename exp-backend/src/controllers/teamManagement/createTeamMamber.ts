import { Request, Response } from "express";
import prisma from "../../prisma/prismaClient";

const createTeam = async (req: Request, res: Response): Promise<Response> => {
  const { email, role, organizationId } = req.body; 
  
  const userId = parseInt(req.cookies.userId || "", 10);
  if (!email || !role || isNaN(userId) || !organizationId) {
    return res.status(400).json({
      status: "failed",
      message: "Email, role, valid user ID, and organization ID are required.",
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

    // Check if the organization is valid for the current user (the admin)
    const userOrganizationRole = await prisma.organizationRole.findFirst({
      where: {
        userId: userId,
        organizationId: organizationId,
      },
    });

    if (!userOrganizationRole || userOrganizationRole.role !== 'ADMIN') {
      return res.status(403).json({
        status: "failed",
        message: "Only admins can assign roles to users in this organization.",
      });
    }

    // Check if the user already has access to the lead
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

    // Create the new lead access for the user
    const newLeadAccess = await prisma.leadAccess.create({
      data: {
        userId: existingUser.id,
        leadId: req.body.leadId,
        role, // Set the role assigned to the user
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

export default createTeam;
