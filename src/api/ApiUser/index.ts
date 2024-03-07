import { UserProfile } from "firebase/auth";
import { AppLogger } from "../../logsApp";
import { ServiceResponseErrorCodes } from "../../types/server";
import { ApiBase } from "../ApiBase";
import { MethodsHelper } from "../methods";
import { IUserProfile } from "../../users";


//create class ApiUserNode
export class ApiUserNode {

   public static async loginWithEmailNode(email: string): Promise<number> {
    AppLogger.log('ApiUser.loginWithEmail NODE()', 'Start Request' + email);

    const res = await ApiBase.runBaseRequest(
      {
        email: email
      },
      MethodsHelper.loginWithEmailNode
    );
    console.log('res', res);

    if (res.status !== ServiceResponseErrorCodes.NoError)
      return Promise.reject(res.message);

    return  Promise.resolve(res.data);
   }

   public static async getProfile(userId: string): Promise<IUserProfile> {
    AppLogger.log('ApiUser.getProfile NODE()', 'Start Request' + userId);
    const numberId = parseInt(userId);
    const res = await ApiBase.runBaseRequest(
      {
        userId: numberId
      },
      MethodsHelper.getProfileNode
    );
    console.log('res', res);

    if (res.status !== ServiceResponseErrorCodes.NoError)
      return Promise.reject(res.message);

    return  Promise.resolve(res.data);
   }
}
