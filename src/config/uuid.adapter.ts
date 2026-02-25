import {v4 as uuid} from "uuid";


export class UuidAdapter{
    public static v4(){
        return uuid();
    }
}