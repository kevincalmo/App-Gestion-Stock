import {SizeProductInterface} from "@/interfaces/SizeProductInterface";

export interface ProductInterface {
    id?: string;
    label: string;
    categoryID: string;
    stockID: string;
    sizes: Array<SizeProductInterface>;
}