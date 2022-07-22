import { Client } from "./client.model";
import { itemProduct } from "./itemProduct.model";

export class caddy{
    public client?:Client;
    public item:Map<number,itemProduct>=new Map();
    constructor(name:string){
        this.name = name;
    }
    name:string;
}