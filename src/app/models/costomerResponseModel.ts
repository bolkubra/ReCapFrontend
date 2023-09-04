import { Costomer } from "./costomer";
import { ResponseModel } from "./responseModel";

export interface CostomerResponseModel extends ResponseModel{
    data : Costomer[]
}