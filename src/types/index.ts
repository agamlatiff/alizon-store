export type TypeCheckingSignIn = {
  email?: string;
  password?: string;
  message?: string
};

export type TypeCheckingSignUp = {
  email?: string;
  password?: string;
  name?: string;
  message?: string
};

export type ActionResult = {
  error?: string
  success?: string
}

export type Tparams = { id: string };

export type Tedit = { params: Tparams };

export type TProduct = {
  id: number;
  image_url: string;
  name: string;
  category_name: string;
  price: number;
};

export type TCart = TProduct & { quantity: number };
