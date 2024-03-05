import { IExampleFileNodeModel } from "../../types/files";
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
}

