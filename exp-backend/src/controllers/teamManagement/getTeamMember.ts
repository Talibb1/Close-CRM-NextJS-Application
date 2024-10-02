import { Request, Response } from "express";
import prisma from "../../prisma/prismaClient";

const getTeamMemberData = async (req: Request, res: Response): Promise<Response> => {
  const { email } = req.params;

  if (!email) {
    return res.status(400).json({
      status: "failed",
      message: "Email is required.",
    });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email },
      include: {
        leads: {
          include: {
            contacts: true,
            notes: true,
            tasks: true, 
            opportunities: true, // Fetch related opportunities for each lead
            activityLogs: true, // Fetch related activity logs for each lead
          },
        },
        leadAccess: {
          include: {
            Lead: true, // Include lead details
          },
        },
      },
    });

    if (!user) {
      return res.status(404).json({
        status: "failed",
        message: `No user found with the email "${email}".`,
      });
    }

    return res.status(200).json({
      status: "success",
      data: user,
    });
  } catch (error) {
    console.error("Error fetching team member data:", error);
    return res.status(500).json({
      status: "failed",
      message: "Server error. Please try again later.",
    });
  }
};

export default getTeamMemberData;
