import { urlencoded } from "express";
import { envVars } from "../../config/config";
import { ISSL } from "./ssl.interface";
import axios from "axios";

export const sslINIT = async (payload: ISSL) => {
  const data = {
    store_id: envVars.SSL.SSL_STORE_ID,
    store_passwd: envVars.SSL.SSL_STORE_PASSWORD,
    total_amount: payload.ammount,
    currency: "BDT",
    tran_id: payload.transactionId,
    product_category: "N/A",
    success_url: `${envVars.SSL.SSL_BACKEND_SUCCESS}?transactionId=${payload.transactionId}`,
    fail_url: `${envVars.SSL.SSL_BACKEND_FAILED}?transactionId=${payload.transactionId}`,
    cancel_url: `${envVars.SSL.SSL_BACKEND_CANCEL}?transactionId=${payload.transactionId}`,
    shipping_method: "N/A",
    product_name: "",
    product_profile: "N/A",

    cus_name: payload.name,
    cus_email: payload.email,
    cus_add1: payload.address,
    cus_add2: payload.address,
    cus_city: "Dhaka",
    cus_state: "Mirpur",
    cus_postcode: "1216",
    cus_country: "Bangladesh",
    cus_phone: payload.phone,
  };
  const response = await axios({
    method: "post",
    url: envVars.SSL.SSL_PAYMENT_API,
    data: data,
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
  });

  return {
    payment_URL: response.data.GatewayPageURL,
  };
};
