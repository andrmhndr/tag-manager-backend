import { Types } from "mongoose";

export abstract class BaseDocument {
    _id: Types.ObjectId | string
    createdAt: Date
    updateAt: Date
}