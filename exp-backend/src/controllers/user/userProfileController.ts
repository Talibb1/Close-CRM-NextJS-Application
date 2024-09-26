import { Request, Response } from 'express';



const userProfile = async (req: Request, res: Response)=> {
  try {
    // Check if req.user is populated by a middleware
    if (!req.user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    // Respond with user details
    return res.status(200).json({ user: req.user });
  } catch (error) {
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

export default userProfile;
