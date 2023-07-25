import { createContext, useEffect, useState } from "react";
import { API_BASE_URL } from "../lib/constants";
import { addToCartProcess, cartTotalCounts } from "./CartProcess";
import { useRouter } from "next/dist/client/router";

const MainContext = createContext();

const MainProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isTopBar, setIsTopBar] = useState(1);
  const [onScroll_Nav, setOnScrollNav] = useState(false);
  const [OpenAllCat, setOpenAllCat] = useState(0);
  const [CartOpen, setCartOpen] = useState(0);
  const [Loaded, setLoaded] = useState(false);
  const [totalCartItems, setTotalCartItems] = useState(0);

  const [homeRecord, setHomeRecord] = useState([]);
  const [menuRecord, setMenuRecord] = useState([]);
  const [cart, setCart] = useState([]);
  const [cartTotals, setCartTotals] = useState({});

  const router = useRouter();

  const redirectTo = (url) => {
    if (router.asPath != url) {
      setIsLoading(true);
      setTimeout(() => {
        router.push(url);
      }, 300);
    }
  };

  const mainManu = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}left-menu`);
      const resData = await res.json();
      setMenuRecord(resData);
    } catch (error) {
      console.error(error);
    }
  };

  const getData = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}home`);
      const resData = await res.json();
      setHomeRecord(resData);
    } catch (error) {
      console.error(error);
    }
  };

  const getCart = async () => {
    try {
      // Get Cart Lists
      let cart = localStorage.getItem("cart");
      if (cart != null) {
        setCart(JSON.parse(cart));
      } else {
        setCart([]);
      }

      // Get Cart Total Counts such as Shipping, Discount and Subtotal and Totals
      await getCartTotalCounts();
      await countTotalCartSum();
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const getCartTotalCounts = async () => {
    cartTotalCounts();
    let cartCounts = localStorage.getItem("cartTotalCounts");
    if (cartCounts != null) {
      setCartTotals(JSON.parse(cartCounts));
    } else {
      setCartTotals({
        subTotal: 0.0,
        discount: 0.0,
        shipping: 0.0,
        total: 0.0,
      });
    }
  };

  const getProductQty = async (id) => {
    let cartItems = localStorage.getItem("cart");
    if (cartItems != null) {
      cartItems = JSON.parse(cartItems);
      let product = await cartItems.filter((cartItem) => cartItem.id == id);

      if (product.length > 0) {
        return product[0].quantity;
      }
      return 0;
    }
    return 0;
  };

  const addToCart = (product, qty = 0, type = "add") => {
    // Add new item or quantity in cart
    addToCartProcess(product, qty, type);
    getCart();
  };

  const countTotalCartSum = () => {
    let total = 0;
    let cartItems = localStorage.getItem("cart");
    if (cartItems != null) {
      cartItems = JSON.parse(cartItems);
      Object.entries(cartItems).forEach(([key, value]) => {
        total = parseInt(total) + parseInt(value.quantity);
      });
      setTotalCartItems(total);
    } else {
      setTotalCartItems(0);
    }
  };

  const removeCompleteCart = () => {
    localStorage.removeItem("shipping");
    localStorage.removeItem("ses_coupon");
    localStorage.removeItem("cartTotalCounts");
    localStorage.removeItem("cart");
    localStorage.removeItem("ses_free_shipping_coupon");
  };

  useEffect(() => {
    const getCart = async () => {
      try {
        // Get Cart Lists
        let cart = localStorage.getItem("cart");
        if (cart != null) {
          setCart(JSON.parse(cart));
        }

        // Get Cart Total Counts such as Shipping, Discount and Subtotal and Totals
        cartTotalCounts();
        let cartCounts = localStorage.getItem("cartTotalCounts");
        if (cartCounts != null) {
          setCartTotals(JSON.parse(cartCounts));
        }
        countTotalCartSum();
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    getCart();
  }, []);

  return (
    <MainContext.Provider
      value={{
        isLoading,
        setIsLoading,
        redirectTo,
        isTopBar,
        setIsTopBar,
        OpenAllCat,
        setOpenAllCat,
        CartOpen,
        setCartOpen,
        getData,
        homeRecord,
        Loaded,
        setLoaded,
        menuRecord,
        setMenuRecord,
        mainManu,
        cart,
        setCart,
        getCart,
        cart,
        setCart,
        addToCart,
        totalCartItems,
        setTotalCartItems,
        countTotalCartSum,
        cartTotals,
        setCartTotals,
        removeCompleteCart,
        getProductQty,
        onScroll_Nav,
        setOnScrollNav,
        getCartTotalCounts,
      }}
    >
      {children}
    </MainContext.Provider>
  );
};

export { MainProvider, MainContext };
