import { IExampleFileNodeModel, IUserFileNodeModel } from "../../types/files";
import { ServiceResponseErrorCodes } from "../../types/server";
import { ApiBase } from "../ApiBase";
import { MethodsHelper } from "../methods";

export class ApiUserFilesNode {


    public static async createNewFileNode(
        fileName: string,
        userId: number
        ): Promise<IUserFileNodeModel> {
        try {
            //default post - create file
            const fileData = `{"workbook":{"version":"3.0","useWijmoTheme":true,"sheets":{"Sheet1":{"name":"Sheet1","rowCount":200,"columnCount":20,"rowHeaderData":{"rowCount":200,"colCount":1},"colHeaderData":{"rowCount":1,"colCount":20},"data":{"rowCount":200,"colCount":20,"dataTable":{"0":{"0":{}}}}}},"namedStyles":[{"hAlign":2,"vAlign":2,"name":"styleDefNumber"}]},"charts":[]} `;
            const res = await ApiBase.runBaseRequest({
                file_name: fileName,
                file_data: fileData,
                file_size: 100,
                userId: userId
            }, MethodsHelper.createFileNode);
            if (res.status !== ServiceResponseErrorCodes.NoError)
                return Promise.reject(res.message);

            return Promise.resolve<IUserFileNodeModel>(res.data);
        } catch (error) {
            console.error("createNewFileNode Error: ", error);
            //global error
            return Promise.reject('Network Error');

        }
    }

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
   
    public static async getUserFilesNode(userId: number): Promise<IUserFileNodeModel[]> {
        const res = await ApiBase.runBaseRequest({ userId: userId }, MethodsHelper.findUserFilesNode);
        if (res.status != ServiceResponseErrorCodes.NoError) return Promise.reject(res.message);
        return Promise.resolve<IUserFileNodeModel[]>(res.data)
    }
}

