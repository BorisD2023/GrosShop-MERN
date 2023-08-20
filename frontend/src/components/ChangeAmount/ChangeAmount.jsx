import "./ChangeAmount.css"
import { useContext, useState } from "react"
import { userShoppingCartContext } from "../../context/Context"
import { useEffect } from "react"
import { useLocation } from "react-router-dom"

const ChangeAmount = ({product,setFavorites,favItem}) => {
    const {userShoppingCart,setUserShoppingCart} = useContext(userShoppingCartContext)
    const [shoppingCartItem, setShoppingCartItem] = useState(undefined)
    const [tempShoppingCartItem, setTempShoppingCartItem] = useState(undefined)
    const [updateTotal,setUpdateTotal] = useState(false) //toogle refresher
    const [stop,setStop] = useState(false)

    const findShoppingItemBy = (prodID) => {
        return userShoppingCart.find(cartItem => cartItem._id === prodID);
    };

    const location = useLocation()
    const detailProduct = "/" + location.pathname.split('/')[1]; //useParams id

    useEffect(()=> {
      if(location.pathname == "/shoppingcart" || detailProduct == "/detailproduct"){
        const foundCartItem = userShoppingCart.find(cartItem => cartItem.id === product._id);
        setShoppingCartItem(foundCartItem)
      }
    },userShoppingCart)


    const increaseAmountCart = (incOrDecrement) => {
        setUserShoppingCart(prevCartItem => {
            return prevCartItem.map(cartItem => {
                if (cartItem.id === product._id) {
                    return { ...cartItem, amount: cartItem.amount + incOrDecrement <= 0 ? 1 : cartItem.amount + incOrDecrement  };
                }
                return cartItem;
            });
        });
        increaseTempAmountCart(incOrDecrement)
        setUpdateTotal(prev => !prev)
      }

      const increaseTempAmountCart = (incOrDecrement) => {
        setTempShoppingCartItem(prevCartItem => {
                if (prevCartItem.id === product._id) {
                    return { ...prevCartItem, amount: prevCartItem.amount + incOrDecrement <= 0 ? 1 : prevCartItem.amount + incOrDecrement  };
                }
                return prevCartItem;
            });
            setUpdateTotal(prev => !prev)
      }

      const increaseAmountFav = (incOrDecrement) => {
        setFavorites(prevFavorites => {
            return prevFavorites.map(fav => {
                if (fav.id === product._id) {
                    return { ...fav, amount: fav.amount + incOrDecrement <= 0 ? 1 : fav.amount + incOrDecrement  };
                }
                return fav;
            });
        });
        setUpdateTotal(prev => !prev)
    };



    const getTempShoppingCartItem = () => {
        if(tempShoppingCartItem == undefined) {
            const amount = 1;
            setTempShoppingCartItem({id:product._id,amount:amount})
            setStop(false)
        }
    }


    useEffect(()=>{
        getTempShoppingCartItem() 
        if(location.pathname == "/shoppingcart" || detailProduct == "/detailproduct" ){
            if(shoppingCartItem != undefined && tempShoppingCartItem.amount != shoppingCartItem.amount && stop == false){
                setTempShoppingCartItem({id:product._id,amount:shoppingCartItem.amount}) //TODO
                setStop(true);
            }
        }  
    },[tempShoppingCartItem])


    return (
        <>
                  { // Wenn Favoriten oder ShoppingCart Page >> Füge - + hinzu
        location.pathname == "/favorites" || location.pathname == "/shoppingcart" || detailProduct == "/detailproduct" ? 
          <div className="product-card-amount">
            <button onClick={() => location.pathname=="/favorites"?
                increaseAmountFav(-1)
                :!shoppingCartItem?
                    increaseTempAmountCart(-1)
                    :detailProduct=="/detailproduct"?
                        increaseTempAmountCart(-1)
                        :increaseAmountCart(-1)}>
            -</button>
            <p>{location.pathname=="/favorites"?
                    favItem?
                        favItem.amount
                        :null 
                    :tempShoppingCartItem?
                        tempShoppingCartItem.amount
                        :0 
                }
            </p>
            <button onClick={() => 
                location.pathname=="/favorites"?
                    increaseAmountFav(+1)
                    :!shoppingCartItem?
                        increaseTempAmountCart(+1)
                        :detailProduct=="/detailproduct"?
                            increaseTempAmountCart(+1)
                            :increaseAmountCart(+1)}>
            +</button>
          </div>
        : null}
        <div>
            {detailProduct == "/detailproduct"?
                shoppingCartItem?
                    <button>UPDATE CART</button>
                    :<button>PUT IN CART</button>
            :null}
        </div>
        </>
    );
}

export default ChangeAmount;