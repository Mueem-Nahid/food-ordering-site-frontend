export interface IUserInfo {
  _id: string;
  id: string;
  email: string;
  name: string;
  role: string;
  address?: string;
}

export interface IUser {
  userInfo: IUserInfo | null;
  accessToken: string | null;
}

export interface IComment {
  _id: string;
  commentedBy: {
    _id: string;
    name: string;
  };
  comment: string;
  createdAt: Date;
  updatedAt: string;
}

export interface IPostedBy {
  _id: string;
  email: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ILikes {
  user:string;
  _id:string
}

export interface IDislikes {
  user:string;
  _id:string
}

export interface IPost {
  _id:string;
  post:string;
  totalLikes: number;
  totalDislikes:number;
  user: IPostedBy;
  likes:ILikes[];
  dislikes: IDislikes[];
  createdAt: Date;
  updatedAt:Date;
  comments: IComment[]
}

export type IProduct = {
  _id: string;
  name: string;
  productImage: string;
  desc: string;
  price: number;
  categoryId: string;
  comment?: [];
  availability?: string[];
  category: {
    _id: string;
    name: string;
  }
  catId?: {
    _id: string;
    name: string;
  };
};

export interface IOrderProductItem {
  product: {
    _id: string;
    title: string;
    name: string;
    price: number;
    deliveryDay: string;
  };
  quantity: number;
}

export interface IOrderUser {
  _id: string;
  name: string;
  email: string;
}

export interface ICoupon {
  _id: string;
  code: string;
  isActive: boolean;
  discountType: "percent" | "flat";
  discountValue: number;
  maxDiscountAmount?: number | null;
  expiresAt: string;
  usageLimit?: number | null;
  usedCount?: number;
  minOrderValue?: number | null;
  applicableCategories?: string[] | null;
  applicableProducts?: string[] | null;
}

export interface ICouponApplyResult {
  discountedAmount: number;
  discount: number;
  coupon: {
    _id: string;
    code: string;
    discountType: "percent" | "flat";
    discountValue: number;
    minOrderValue?: number | null;
    expiresAt: string;
  };
}

export type Order = {
  _id: string;
  product: IOrderProductItem[];
  user: IOrderUser;
  email: string;
  payment_status: string;
  amount: number;
  subtotal?: number;
  discount?: number;
  discountedAmount?: number;
  coupon?: string | { _id: string; code: string } | null;
  couponCode?: string | null;
  total_items: number;
  payment_method: string;
  delivery_address: string;
  delivery_fee: number;
  phone_no: string;
  order_status: string;
  createdAt: string;
  updatedAt: string;
};