import { IExampleFileNodeModel, IUserFileNodeModel } from "../../types/files";
import { ServiceResponseErrorCodes } from "../../types/server";
import { ApiBase } from "../ApiBase";
import { MethodsHelper } from "../methods";

export class ApiUserFilesNode {
   /**
     *
     *
     * @static
     * @return {*}  {Promise<IExampleFileNodeModel[]>}
     * @memberof ApiUserFilesNode
     */
    public static async getExamplesFilesNode(): Promise<IExampleFileNodeModel[]> {
        const tokenData = new FormData();
        const res = await ApiBase.runBaseRequest(tokenData, MethodsHelper.getExampleFilesNode);
        if (res.status != ServiceResponseErrorCodes.NoError) return Promise.reject(res.message);
        return Promise.resolve<IExampleFileNodeModel[]>(res.data)
    }

    //get user files
    public static async getUserFilesNode(userId: number): Promise<IUserFileNodeModel[]> {
        const res = await ApiBase.runBaseRequest({userId: userId}, MethodsHelper.findUserFilesNode);
        if (res.status != ServiceResponseErrorCodes.NoError) return Promise.reject(res.message);
        return Promise.resolve<IUserFileNodeModel[]>(res.data)
    }
}

