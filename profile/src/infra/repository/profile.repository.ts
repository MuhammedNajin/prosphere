import Profile from "../database/shemas/profile.schema";
import { UserProfile } from "@domain/entities/profile";
import { IUserProfile } from "@domain/entities/interface";
import { redisClient } from '@infra/config/database'


interface UploadProfilePhotoArgs {
   email: string,
   query: any,
}
export default {
  uploadProfilePhoto: async ({email, query}: UploadProfilePhotoArgs) => {
    const updates = { $set: query };
    const profile = await Profile.findOneAndUpdate({ email }, updates, {
      new: true,
    });

    return profile;
  },

  aboutMe: async (description: string, email: string) => {
    const updates = { $set: { about: description } };
    const user = await Profile.findOneAndUpdate({ email }, updates, {
      new: true,
    });
    console.log(user);
    return user;
  },
   
  setCache: async (key: string, url: string) => {
     await redisClient.setEx(`image:${key}`, 36000, url)
  },

  getCache: async (key: string) => {
    return await redisClient.get(`image:${key}`)
  },

  createProfile: async (user: IUserProfile) => {
    const profile = new UserProfile(user);
    console.log("profile", profile);
    return await Profile.build(profile).save();
  },

  getProfile: async (email: string) => {
    return await Profile.findOne({ email });
  },

  updateProfile: async (
    email: string,
    body: Object,
    option: { isArray?: boolean } = {}
  ) => {
    console.log("isArray", option)
    if (option?.isArray) {
      return await Profile.findOneAndUpdate(
        { email },
        {
          $addToSet: { ...body },
        },
        {
          new: true,
        }
      );
    }
    return await Profile.findOneAndUpdate(
      { email },
      {
        $set: { ...body },
      },
      {
        new: true,
      }
    );
  },
};