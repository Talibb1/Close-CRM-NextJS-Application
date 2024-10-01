import { Request, Response } from "express";

const userProfile = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    return res.status(200).json({ user: req.user });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export default userProfile;

