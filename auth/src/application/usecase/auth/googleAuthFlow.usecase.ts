import { Dependencies, IUser } from "@domain/entities/interfaces";
import Token from "@infra/libs/token";

export const googleAuthFlowUseCase = (dependencies: Dependencies) => {
  const {
    repository: { userRepository },
  } = dependencies;

  if (!userRepository) {
    throw new Error("dependency required, missing dependency");
  }

  const execute = async ({ phone, jobRole, email}: Pick<IUser, "phone" | "jobRole" | "email">) => {
    const user = await userRepository.googleAuthFlow({ phone, jobRole, email });
    return user
  };

  return {
    execute,
  };
};
