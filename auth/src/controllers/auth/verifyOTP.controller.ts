import { Request, Response, NextFunction } from "express";
import { Dependencies } from "../../libs/entities/interfaces";
import Token from "../../libs/utils/token";
import { BadRequestError } from "@muhammednajinnprosphere/common";

const verifyOTPController = (dependencies: Dependencies) => {
  const {
    useCases: { verifyOtpUseCase, verifyUserUseCase },
  } = dependencies;

  const verifyOtp = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { otp, userId } = req.body;
      console.log(req.body);
      // change: take userId from cokiee or token
      const { message } = await verifyOtpUseCase(dependencies).execute({
        userId,
        otp,
      });


      if (message === "expired") {
        throw new BadRequestError("Otp expired, resent otp");
      } else if(message === "invalid") {
        throw new BadRequestError("Invalid otp, enter valid otp")
      }

      const verified = await verifyUserUseCase(dependencies).execute(userId);

      if (!verified) {
        throw new Error("user not verified");
      }

      const payload = {
        id: verified._id,
        username: verified.username,
        email: verified.email,
        role: "user" as "user"
      };
      const { accessToken, refreshToken} = Token.generateJwtToken(payload);
      res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
      });
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
      });

      res.status(200).json({ verified: true });
      
    } catch (error) {
      console.log(error);
      next(error)
    }
  };

  return verifyOtp;
};

export { verifyOTPController };
