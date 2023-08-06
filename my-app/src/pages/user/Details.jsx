import { Link, useParams } from 'react-router-dom';
import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import Details from '../../images/Details.jpg';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Details1() {
  const [Products, setProducts] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const Product = useParams();
  const [wishlist, setwishlist] = useState([]);

  const [id, setId] = useState();
  const [cart, setCart] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/Prod/${Product.Product_id}`)
      .then((response) => {
        setProducts(response.data);
      
        axios
          .get('http://localhost:5000/getId')
          .then(function (response) {
            setId(response.data[0].userid);
            console.log(response.data[0].userid);
            axios
            
            .get(`http://localhost:5000/getusercart/${response.data[0].userid}`)
           .then(function (response) {
             setCart(response.data);
              console.log(response.data);
            })
           .catch(function (error) {
              console.log(error);
        });
          })
          .catch(function (error) {
            console.log(error);
          });

        
      })
      .catch((error) => console.log(error.message));
  }, [Product]);

  const addToCart = (product) => {
    console.log(id);
    console.log(product);

    const existingProduct = cart.find((item) => item.product_id === product.product_id);
if(id){
    if (existingProduct) {
      const updatedCart = cart.map((item) => {
        if (item.product_id=== product.product_id) {
            setQuantity( item.quantity + quantity)

            axios.put('http://localhost:5000/updatequa',{ 
              user_id: id,
            product_id: product.product_id,
            quantity: quantity,})
            .then((response) => {
                console.log(response.data); 

                axios
                .get(`http://localhost:5000/getusercart/${id}`)
                .then(function (response) {
                  setCart(response.data);
                  console.log(response.data);
                })
                .catch(function (error) {
                  console.log(error);
                });

                
            })
            .catch((error) => console.log(error.message))


        }
        return item;
      });
      setCart(updatedCart);
      toast.success(`Quantity of ${product.name} has been updated in your cart.`);
    } else {
      axios.post('http://localhost:5000/addToCart', {
        user_id: id,
        product: product,
        quantity: quantity,
      })
      .then((response) => {
        toast.success(`${product.name} has been added to your cart.`);
        axios
        .get(`http://localhost:5000/getusercart/${id}`)
        .then(function (response) {
          setCart(response.data);
          console.log(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
       })
      .catch((error) => {
       console.error('Error adding to cart:', error);
      });
     
    }
  }
  else{
    toast.error(`please login to have you own  cart`);



  }
   
  };
console.log(cart)

  const handleInputChange = (event) => {
    let value = event.target.value;

    if (value < 1) {
      value = 1;
    } else if (value > 10) {
      value = 10;
    }

    setQuantity(value);
  };


  const addTowishlist = (product) => {
    console.log(id);
    console.log(product);
  
    const existingProduct = wishlist.find((item) => item.product_id === product.product_id);
  if(id){
    if (existingProduct) {
      const updatedCart = wishlist.map((item) => {
        if (item.product_id=== product.product_id) {
          toast.success(`Product "${item.name}" has been add from the wishlist.`);
                axios
                .get(`http://localhost:5000/getusercart/${id}`)
                .then(function (response) {
                  setwishlist(response.data);
                  console.log(response.data);
                
                })
                .catch(function (error) {
                  console.log(error);
                });
        }
        return item;
      });
      setwishlist(updatedCart);
    } else {
      toast.success(`${product.name} has been added to your wishlist`);
      axios.post('http://localhost:5000/addTowishlist', {
        user_id: id,
        product: product,
      })  
      
      .then((response) => {
     
        axios
        .get(`http://localhost:5000/getusercart/${id}`)
        .then(function (response) {
          setwishlist(response.data);
          console.log(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
       })
      .catch((error) => {
       console.error('Error adding to cart:', error);
      });
     
    }
  }
  else{
    toast.error(`please login to have you own Wishlist  `);
  }
  };
  return (
    <>
      <ToastContainer />
      <div
        className="bg-cover bg-center h-screen"
        style={{
          backgroundImage: `url(${Details})`,
          height: "400px",
        }}
      >
        <div className="flex items-center justify-center h-full bg-black bg-opacity-50">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white mb-4">Details</h1>

            <nav className="text-white mb-8">
              <ol className="list-none p-0 inline-flex">
                <li className="flex items-center">
                  <Link to="/" onClick={() => window.scrollTo(0, 0)} className="text-red-500">
                    Home
                  </Link>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 mx-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </li>
                <li className="flex items-center">
                  <Link to="/ServicePageAll" onClick={() => window.scrollTo(0, 0)} className="text-red-500">
                    EQUIPMENT
                  </Link>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 mx-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </li>
            
                <li className="flex items-center text-gray-400">
                  <span>Details</span>
                </li>
              </ol>
            </nav>
          </div>
        </div>
      </div>

      <section className="container mx-auto py-16 px-4">
        {Products.map((product) => (
          <div className="flex flex-wrap" key={product.id}>
            <div className="w-full md:w-1/2">
              <img src={`http://localhost:5000/${Products[0]?.photo}`} alt={product.name} className="rounded-lg" />
            </div>
            <div className="w-full md:w-1/2 md:pl-10">
              <h2 className="text-3xl font-bold mb-4">{product.name}</h2>
              <p className="text-xl mb-4">{product.description}</p>
              <p className="text-2xl mb-4"> JD : {product.price}</p>
       {!product.user_id &&(<div className="flex items-center mb-8 ">
                <label htmlFor="quantity" className="mr-4">
                  Quantity:
                </label>
                <input
                  type="number"
                  id="quantity"
                  name="quantity"
                  min="1"
                  max="10"
                  value={quantity}
                  onChange={handleInputChange}
                  className="border border-gray-400 px-2 py-1 w-16 rounded"
                />
              </div>) }
              <button
                className="bg-red-500 text-white px-6 py-2 rounded font-bold text-lg"
                onClick={() => addToCart(product)}
              >
                Add to Cart
              </button>
              <button
                className="bg-red-500 text-white px-6 ms-8 py-2 rounded font-bold text-lg"
                onClick={() => addTowishlist(product)}
              >
                Add to Wishlist
              </button>
            </div>
          </div>
        ))}
      </section>
    </>
  );
}

export default Details1;
