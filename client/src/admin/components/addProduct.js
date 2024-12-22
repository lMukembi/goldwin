import React, { Fragment, useEffect, useState } from "react";
import "../../styles/addProduct.css";
import axios from "axios";
import { redirect, useNavigate } from "react-router-dom";
import { Login } from "../../components/login";
import { Header } from "../../components/header";
import { AdminMenu } from "./adminMenu";
import { BiCloudDownload } from "react-icons/bi";
import Coming from "../../assets/images/Coming.png";
import { toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const goldwinAPI = process.env.SERVER_URL;

export const AddProduct = () => {
  const userData = JSON.parse(localStorage.getItem("JSUD"));

  const [imageName, setImageName] = useState("");
  const [product, setProduct] = useState([]);

  const navigate = useNavigate();

  const handleImage = async (e) => {
    setImageName(e.target.files[0]);
  };

  useEffect(() => {
    const updateProduct = async () => {
      const adminInfoData = JSON.parse(localStorage.getItem("JSUD"));
      if (!adminInfoData) {
        return redirect("/login");
      }
      const id = adminInfoData.SESSID;

      const adminUsername = "ceo";
      const expireTime = new Date().setHours(24, 0, 0, 0);

      try {
        await axios.patch(`${goldwinAPI}/api/whatsapp/${id}/update-product`, {
          productID: adminUsername,
          expireAt: expireTime,
        });
      } catch (error) {
        console.log(error.message);
      }
    };
    const currentTime = new Date().getTime();

    const expectedTime = new Date().setHours(24, 0, 0, 0);

    let remainingTime;

    if (currentTime < expectedTime) {
      remainingTime = expectedTime - currentTime;
    } else {
      remainingTime = expectedTime + 86400000 - currentTime;
    }

    const timer = setTimeout(() => {
      updateProduct();
    }, remainingTime);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    const getProduct = async () => {
      const productID = "ceo";
      try {
        const res = await axios.get(
          `${goldwinAPI}/api/whatsapp/${productID}/whatsapp-product`
        );

        if (res.data) {
          setProduct(res.data);
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    getProduct();
  }, []);

  const addProduct = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("imageName", imageName);

    if (userData === null) {
      return navigate("/login");
    }

    const id = userData.SESSID;

    try {
      const res = await axios.post(
        `${goldwinAPI}/api/whatsapp/${id}/whatsapp-product`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (res.data) {
        return toast.success("Product uploaded successfully.", {
          position: "top-right",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
      }
    } catch (error) {
      return toast.error("Product upload failed.", {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }
  };
  return (
    <>
      {userData !== null ? (
        <div className="addproduct">
          {window.innerWidth > 768 && <AdminMenu />}

          <Header />
          <form onSubmit={addProduct}>
            <h3>Add Product</h3>

            <input
              type="file"
              name="imageName"
              accept="image/*"
              onChange={handleImage}
              required
            />

            <button>Upload Product</button>
          </form>
          <div className="product">
            <h3>Today's product</h3>

            {product && product.length > 0 ? (
              product.length > 0 &&
              product.map((data, index) => {
                return (
                  <Fragment key={index + "." + data._id}>
                    <img
                      src={require(`../../assets/images/${data.imageName}`)}
                      alt="Goldwin Adverts"
                    />
                  </Fragment>
                );
              })
            ) : (
              <img src={Coming} alt="Goldwin Adverts" />
            )}

            {product && product.length > 0 ? (
              <button>
                <a
                  href={require(`../../assets/images/${product[0].imageName}`)}
                  download={product[0].imageName}
                >
                  Download Product <BiCloudDownload className="downloadicon" />
                </a>
              </button>
            ) : (
              <button>Dounload Product</button>
            )}
          </div>
        </div>
      ) : (
        <Login />
      )}
    </>
  );
};
