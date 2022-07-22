export interface productModel {
  id: number;
  name: string;
  currentPrice: number;
  description: string;
  available: boolean;
  promotion: boolean;
  quantity:number,
  productImage:string,
  _links:{
    self:{
      href:string
    },
    products:{
      href:string
    },
    cate:string
  }
}
