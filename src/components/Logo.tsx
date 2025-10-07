import { ShoppingBag } from "lucide-react";


const Logo = () => {
  return (
    <div className="flex items-center gap-2">
      <ShoppingBag className="size-8 text-primary" />
      <h1 className="text-3xl font-bold">
        Alizon<span className="text-primary">Store</span>
      </h1>
    </div>
  );
};

export default Logo;
