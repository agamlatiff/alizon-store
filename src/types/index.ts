export type TypeCheckingSignIn = {
  email?: string;
  password?: string;
  error?: string;
};

export type TypeCheckingSignUp = {
  email?: string;
  password?: string;
  name?: string;
  error?: string;
};

export type ActionResult = {
  error?: string;
};

export type TypeCheckingCategories = {
  name?: string;
  description?: string;
  status?: string;
  error?: string;
};

export type TypeCheckingLocations = {
  name?: string;
  address?: string;
  city?: string;
  country?: string;
  error?: string;
};

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
