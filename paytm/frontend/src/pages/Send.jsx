import React, { useRef } from "react";
import Heading from "../components/Heading";
import Button from "../components/Button";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import Signin from "./Signin";

function Send() {
  const amount = useRef();
  const [params] = useSearchParams();
  const id = params.get("id");
  const name = params.get("name");
  const navigate = useNavigate();
  if (!localStorage.getItem("authorization")) {
    return (
      <div className="flex justify-center rounded bg-slate-300 h-screen">
        <div className="flex flex-col justify-center">
          <Button onClick={()=>{
            navigate("/signin");
          }} label={'signin'}></Button>
        </div>
      </div>
    );
  }
  return (
    <div className="">
      <div className="flex justify-center rounded bg-slate-300 h-screen">
        <div className="flex flex-col justify-center">
          <div className="bg-white w-96 h-max rounded-lg text-center py-2 px-3">
            <Heading label={"Send Money"}></Heading>
            <div className="flex mt-20">
              <div className="flex flex-col h-full justify-center">
                <div className="bg-green-500 h-12 w-12 rounded-full flex justify-center mr-3 ">
                  <div className="flex flex-col justify-center h-full text-center text-2xl">
                    {name[0].toUpperCase()}
                  </div>
                </div>
              </div>
              <div className=" min-h-full justify-center flex font-semibold text-xl flex-col">
                {name}
              </div>
            </div>
            <div className="flex text-right mt-2 font-semibold">
              Amount (in Rs)
            </div>
            <input
              ref={amount}
              type="text"
              id="first_name"
              className="shadow border border-gray-300 text-gray-900 text-sm rounded-lg w-full focus:border-blue-500 block p-2 mt-2"
              placeholder="Enter Amount"
            />
            <button
              onClick={async () => {
                const response = await axios.post(
                  "http://localhost:3000/api/v1/account/transfer",
                  {
                    amount: amount.current.value,
                    to: id,
                  },
                  {
                    headers: {
                      authorization: localStorage.getItem("authorization"),
                    },
                  }
                );
                navigate("/dashboard");
              }}
              type="button"
              className=" mt-3 text-white w-full bg-green-500 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-500 dark:hover:bg-green-600 dark:focus:ring-green-600 dark:border-green-600"
            >
              initiate transfer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Send;
