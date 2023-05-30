import {SizeProductInterface} from "@/interfaces/SizeProductInterface";

export interface ProductInterface {
    id?: string;
    label: string;
    categoriesproductID: string;
    stockID: string;
    picture?:string;
    sizes?: Array<SizeProductInterface>;
}