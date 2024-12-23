import React, { Fragment, useEffect, useState } from "react";
import { redirect, useNavigate } from "react-router-dom";
import { BiCloudDownload, BiCloudUpload } from "react-icons/bi";
import { toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Resizer from "react-image-file-resizer";
import { AiFillCloseCircle } from "react-icons/ai";
import Coming from "../assets/images/Coming.png";
import { WhatsappCard } from "./whatsappCard";
import { LuFileUp } from "react-icons/lu";
import "../styles/whatsapp.css";
import { Header } from "./header";
import { Login } from "./login";
import axios from "axios";
import { Menu } from "./menu";

const goldwinAPI = "https://api.goldwinadverts.com";

export const Whatsapp = () => {
  const userData = JSON.parse(localStorage.getItem("JSUD"));

  const [views, setViews] = useState(null);
  const [imageName, setImageName] = useState("");
  const [statusFile, setStatusFile] = useState("");
  const [statusImage, setStatusImage] = useState(null);
  const [whatsappRecords, setWhatsappRecords] = useState([]);
  const [userWhatsappBalance, setUserWhatsappBalance] = useState(null);
  const [userWhatsappExpireAt, setUserWhatsappExpireAt] = useState(null);
  const [userPackageExpireAt, setUserPackageExpireAt] = useState(null);
  const [product, setProduct] = useState([]);
  const [userInfo, setUserInfo] = useState({});

  const navigate = useNavigate();

  const newWhatsappEarning = views * 100;

  const resizeFile = (imageName) =>
    new Promise((resolve) => {
      Resizer.imageFileResizer(
        imageName,
        50,
        50,
        "JPEG",
        50,
        0,
        (uri) => {
          resolve(uri);
        },
        "base64"
      );
    });

  const noPackage = () => {
    if (userPackageExpireAt === null && views !== null) {
      return toast.warn(
        `Hi ${userInfo.username}, to submit your views, kindly purchase one of our available packages and unlock access today.`,
        {
          position: "top-right",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
          icon: false,
        }
      );
    }
  };

  const handleImage = async (e) => {
    setStatusImage(e.target.files[0]);
    const statusFile = e.target.files[0];
    const base64 = await resizeFile(statusFile);
    setStatusFile({ ...statusFile, statusFile: base64 });
  };

  const whatsappEarnings = async (e) => {
    e.preventDefault();

    if (userData === null) {
      return navigate("/login");
    }

    if (userPackageExpireAt === null && userInfo.referralID !== "ceo") {
      return navigate("/whatsapp");
    }

    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${userData.UTKN}`,
    };

    const config = {
      headers: headers,
    };

    const id = userData.SESSID;

    try {
      const res = await axios.post(
        `${goldwinAPI}/api/whatsapp/${id}/whatsapp-earnings`,
        {
          views,
          whatsappBalance: newWhatsappEarning,
          imageName: statusFile,
        },
        config
      );

      if (res.data) {
        return toast.success(
          `Congratulations ${userInfo.username}! Your views submission request has been successfully approved. KES ${res.data.data.whatsappBalance}.00 has been credited to your account. You may withdraw. Happy profits!`,
          {
            position: "top-right",
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
            icon: false,
          }
        );
      }
    } catch (error) {
      return toast.error("Something went wrong!", {
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

  const newUserWhatsappDetails = async (e) => {
    e.preventDefault();

    if (userData === null) {
      return navigate("/login");
    }

    if (userPackageExpireAt === null && userInfo.referralID !== "ceo") {
      return navigate("/whatsapp");
    }

    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${userData.UTKN}`,
    };

    const config = {
      headers: headers,
    };
    try {
      return await axios.patch(
        `${goldwinAPI}/api/user/${userData.SESSID}/whatsapp-details`,
        {
          whatsappBalance: userWhatsappBalance + newWhatsappEarning,
        },
        config
      );
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    const getPackageExpireAt = async () => {
      try {
        const userInfoData = JSON.parse(localStorage.getItem("JSUD"));
        if (!userInfoData) {
          return redirect("/login");
        }
        const userID = userInfoData.SESSID;
        const res = await axios.get(
          `${goldwinAPI}/api/user/${userID}/package-expires`
        );

        if (res) {
          setUserPackageExpireAt(res.data.expireAt);
        }
      } catch (err) {
        console.log(err.message);
      }
    };

    getPackageExpireAt();
  }, []);

  const whatsappExpireAt = async (e) => {
    e.preventDefault();

    if (userData === null) {
      return navigate("/login");
    }

    if (
      (userWhatsappExpireAt !== null || userPackageExpireAt === null) &&
      userInfo.referralID !== "ceo"
    ) {
      return navigate("/whatsapp");
    }

    const id = userData.SESSID;

    try {
      return await axios.post(`${goldwinAPI}/api/user/${id}/whatsapp-expires`);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    if (statusImage) {
      setImageName(URL.createObjectURL(statusImage));
    }
  }, [statusImage]);

  useEffect(() => {
    const getUserData = async () => {
      try {
        const userInfoData = JSON.parse(localStorage.getItem("JSUD"));
        if (!userInfoData) {
          return redirect("/login");
        }
        const userID = userInfoData.SESSID;

        const res = await axios.get(
          `${goldwinAPI}/api/user/${userID}/user-data`
        );
        if (res) {
          setUserInfo(res.data);
        }
      } catch (err) {
        console.log(err.message);
      }
    };

    getUserData();
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

  const getWhatsappRecords = async () => {
    try {
      const userInfoData = JSON.parse(localStorage.getItem("JSUD"));
      if (!userInfoData) {
        return redirect("/login");
      }
      const userID = userInfoData.SESSID;
      const res = await axios.get(
        `${goldwinAPI}/api/whatsapp/${userID}/whatsapp-records`
      );
      if (res.data) {
        setWhatsappRecords(res.data);
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    getWhatsappRecords();
  }, []);

  useEffect(() => {
    const getWhatsappDetails = async () => {
      try {
        const userInfoData = JSON.parse(localStorage.getItem("JSUD"));
        if (!userInfoData) {
          return redirect("/login");
        }
        const userID = userInfoData.SESSID;
        const res = await axios.get(
          `${goldwinAPI}/api/user/${userID}/whatsapp-details`
        );
        if (res) {
          setUserWhatsappBalance(+res.data.whatsappBalance);
        }
      } catch (err) {
        console.log(err.message);
      }
    };

    getWhatsappDetails();
  }, []);

  useEffect(() => {
    const getWhatsappExpireAt = async () => {
      try {
        const userInfoData = JSON.parse(localStorage.getItem("JSUD"));
        if (!userInfoData) {
          return redirect("/login");
        }
        const userID = userInfoData.SESSID;
        const res = await axios.get(
          `${goldwinAPI}/api/user/${userID}/whatsapp-expires`
        );

        if (res) {
          setUserWhatsappExpireAt(res.data.expireAt);
        }
      } catch (err) {
        console.log(err.message);
      }
    };

    getWhatsappExpireAt();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      {userData !== null ? (
        <div className="whatsapp_wrapper">
          {window.innerWidth > 768 && <Menu />}

          <Header />

          <div className="whatsapp_wrap">
            <div className="product">
              <h3>Today's product</h3>

              {product && product.length > 0 ? (
                product.length > 0 &&
                product.map((data, index) => {
                  return (
                    <Fragment key={index + "." + data._id}>
                      <img
                        src={require(`../assets/images/${data.imageName}`)}
                        alt="Goldwin Adverts"
                      />
                    </Fragment>
                  );
                })
              ) : (
                <img src={Coming} alt="Goldwin Adverts" />
              )}

              {userPackageExpireAt === null && userInfo.referralID !== "ceo" ? (
                <button onClick={noPackage}>Download Product</button>
              ) : (
                <>
                  {product && product.length > 0 ? (
                    <button>
                      <a
                        href={require(`../assets/images/${product[0].imageName}`)}
                        download={product[0].imageName}
                      >
                        Download Product
                        <BiCloudDownload className="downloadicon" />
                      </a>
                    </button>
                  ) : (
                    <button>Download Product</button>
                  )}
                </>
              )}
            </div>

            <form
              onSubmit={(e) => {
                whatsappEarnings(e);
                newUserWhatsappDetails(e);
                whatsappExpireAt(e);
              }}
            >
              <h3>Submit to earn</h3>
              <input
                type="number"
                name="statusFile"
                required
                placeholder="Enter number of views"
                onChange={(e) => setViews(+e.target.value)}
              />

              <input
                type="number"
                name="amount"
                required
                placeholder={`Your payout: ${newWhatsappEarning} KES`}
                readOnly
              />

              <input
                type="file"
                name="imageName"
                accept=".jpeg, .png, .jpg"
                onChange={handleImage}
                required
              />

              <div className="statusimage">
                {imageName && statusImage && (
                  <>
                    <span>
                      <img src={imageName} alt={statusImage.name} />

                      <small>
                        <AiFillCloseCircle
                          onClick={() => setStatusImage(!statusImage)}
                        />
                      </small>
                    </span>
                  </>
                )}
              </div>

              {userWhatsappExpireAt !== null && userPackageExpireAt !== null ? (
                <small>
                  Congratulations! We received your screenshot for today. Happy
                  profits, try again after 24 hours.
                </small>
              ) : (
                <i>NB: You can only submit one screenshot per day.</i>
              )}

              {userPackageExpireAt === null && userInfo.referralID !== "ceo" ? (
                <button onClick={noPackage}>Upload Now</button>
              ) : (
                <button disabled={userWhatsappExpireAt !== null ? true : false}>
                  Upload Now
                  <BiCloudUpload className="uploadicon" />
                </button>
              )}
            </form>
          </div>
          <div className="whatsapp_records">
            <p className="whatsapp_records_top">
              <LuFileUp className="whatsapp_records_icon" />
              Uploads
            </p>

            <div className="whatsapp_records_items">
              {whatsappRecords !== null && whatsappRecords.length > 0 ? (
                <>
                  {whatsappRecords.length > 0 &&
                    whatsappRecords.map((whatsappRecord, index) => {
                      return (
                        <Fragment key={index + "." + whatsappRecord._id}>
                          <WhatsappCard whatsappRecord={whatsappRecord} />
                        </Fragment>
                      );
                    })}
                </>
              ) : (
                <small>Your records will appear here!</small>
              )}
            </div>
          </div>
        </div>
      ) : (
        <Login />
      )}
    </>
  );
};
