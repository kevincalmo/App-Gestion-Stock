type RemiseEpiItem = {
  id?: string;
  productID: string;
  sizeID: string;
  quantity: number;
  description: string;
  remiseEpiID?:string;
};

export interface RemiseEpiInterface {
  id?: string;
  date: string;
  agentID: string;
  stockID?: string;
  items?: Array<RemiseEpiItem>;
  countItems?:number;
}
