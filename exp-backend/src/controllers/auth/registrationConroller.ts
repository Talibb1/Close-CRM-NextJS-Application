import { Request, Response } from "express";
import bcrypt from "bcrypt";
import prisma from "../../prisma/prismaClient";
import { SALT } from "../../constants";

const RegisterUser = async (req: Request, res: Response): Promise<Response> => {
  const { firstName, lastName, email, password } = req.body;

  if (!firstName || !lastName || !email || !password) {
    return res.status(400).json({
      status: "failed",
      message: "All fields are required.",
    });
  }

  try {
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      if (existingUser.authProviders.includes("LOCAL")) {
        return res.status(400).json({
          status: "failed",
          message: "Email already registered with local credentials.",
        });
      }

      if (!existingUser.password && password) {
        const hashedPassword = await bcrypt.hash(password, Number(SALT));

        await prisma.user.update({
          where: { email },
          data: {
            password: hashedPassword,
            authProviders: {
              push: "LOCAL",
            },
          },
        });

        return res.status(200).json({
          status: "success",
          message: "Account updated with local credentials.",
        });
      }

      return res.status(400).json({
        status: "failed",
        message: "User already exists with the given email.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, Number(SALT));

    const newUser = await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        password: hashedPassword,
        authProviders: ["LOCAL"], 
      },
    });

    return res.status(201).json({
      status: "success",
      message: "User registered successfully.",
    });

  } catch (error) {
    console.error("Registration error:", error);
    return res.status(500).json({
      status: "failed",
      message: "Server error. Please try again later.",
    });
  }
};

export default RegisterUser;
