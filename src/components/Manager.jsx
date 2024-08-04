import React from "react";
import { useRef, useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { v4 as uuidv4 } from "uuid";

const Manager = () => {
  const ref = useRef();
  const passwordRef = useRef();

  const [form, setForm] = useState({ site: "", username: "", password: "" });
  const [passwordarray, setPasswordarray] = useState([]);

  const getPasswords = async () => {
    let req = await fetch("http://localhost:3000/");
    let passwords = await req.json();

    setPasswordarray(passwords);
  };

  useEffect(() => {
    getPasswords();
  }, []);

  const showPassword = () => {
    passwordRef.current.type = "text";
    // alert("show")
    if (ref.current.src.includes("/icons/eyeclosed.png")) {
      ref.current.src = "/icons/eye.png";
      passwordRef.current.type = "password";
    } else {
      ref.current.src = "/icons/eyeclosed.png";
      passwordRef.current.type = "text";
    }
  };

  const copytext = (text) => {
    toast("Copied To Clipboard!", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    navigator.clipboard.writeText(text);
  };

  const savePassword = async() => {
    await fetch("http://localhost:3000/", {
      method: "DELETE",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ id:form.id }),
    });
    setPasswordarray([...passwordarray, { ...form, id: uuidv4() }]);
    await fetch("http://localhost:3000/", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ ...form, id: uuidv4() }),
    });
   
    setForm({ site: "", username: "", password: "" });
  };

  const deletePassword = async(id) => {
    console.log("deleting password with id", id);
    let c = confirm("Are You Sure?");
    if (c) {
      setPasswordarray(passwordarray.filter((item) => item.id !== id));
      // localStorage.setItem(
      //   "passwords",
      //   JSON.stringify(passwordarray.filter((item) => item.id !== id))
      // );
      let res = await fetch("http://localhost:3000/", {
        method: "DELETE",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({id }),
      });
    }
  };

  const editPassword = (id) => {
    console.log("Editing password with id", id);
    setForm({...passwordarray.filter((i) => i.id === id)[0],id:id});
    setPasswordarray(passwordarray.filter((item) => item.id !== id));
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition="Bounce"
      />
      {/* Same as */}
      <ToastContainer />

      <div className=" mb-20 p-2 md:p-0 md:mycontainer ">
        <h1 className="text-4xl text-center  font-bold mt-5">
          <span className="text-orange-500  ">&lt;</span>
          LOCK
          <span className="text-orange-500">BOX/&gt;</span>
        </h1>
        <p className="text-orange-900 text-lg text-center  font-bold ">
          Your Password Manager
        </p>
        <div className="flex flex-col p-4 text-black gap-6 items-center ">
          <input
            value={form.site}
            onChange={handleChange}
            placeholder="Enter Website URL"
            className="rounded-full border border-orange-600 w-full p-4 py-1"
            type="text"
            name="site"
            id="site"
          />
          <div className="flex flex-col md:flex-row  my-2 w-full gap-8">
            <input
              value={form.username}
              onChange={handleChange}
              placeholder="Enter Username"
              className="rounded-full border border-orange-600 w-full p-4 py-1"
              type="text"
              name="username"
              id="username"
            />
            <div className="relative">
              <input
                ref={passwordRef}
                value={form.password}
                onChange={handleChange}
                placeholder="Enter Password"
                className="rounded-full border border-orange-600 w-full p-4 py-1"
                type="password"
                name="password"
                id="password"
              />
              <span
                className="absolute right-0 top-0 cursor-pointer"
                onClick={showPassword}
              >
                <img
                  ref={ref}
                  className="p-2 mr-2"
                  width={35}
                  src="/icons/eye.png"
                  alt=""
                />
              </span>
            </div>
          </div>
          <button
            onClick={savePassword}
            className="flex justify-center  font-semibold gap-4 items-center  bg-orange-400 hover:bg-orange-500 rounded-full px-3 py-2 w-fit border-2 border-orange-900"
          >
            <lord-icon
              src="https://cdn.lordicon.com/jgnvfzqg.json"
              trigger="hover"
            ></lord-icon>
            Save
          </button>
        </div>
        <div className="password">
          <h2 className=" text-2xl font-bold py-2">Your Password</h2>
          {passwordarray.length === 0 && <div>No Passwords To Show</div>}
          {passwordarray.length != 0 && (
            <table className="table-auto w-full rounded-md overflow-hidden">
              <thead className="bg-orange-900 text-white">
                <tr>
                  <th className="py-2">Site</th>
                  <th className="py-2">Username</th>
                  <th className="py-2">Password</th>
                  <th className="py-2">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-purple-200">
                {passwordarray.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td className="  py-2 border border-purple-300 text-center ">
                        <div className="flex  items-center justify-center gap-1">
                          <a href={item.site} target="_blank">
                            {item.site}
                          </a>
                          <div
                            className=" lordiconcopy size-8 cursor-pointer"
                            onClick={() => {
                              copytext(item.site);
                            }}
                          >
                            <lord-icon
                              src="https://cdn.lordicon.com/uecgmesg.json"
                              trigger="hover"
                              stroke="bold"
                              state="hover-squeeze"
                              colors="primary:#000000,secondary:#e83a30"
                            ></lord-icon>
                          </div>
                        </div>
                      </td>
                      <td className="  py-2 border border-purple-300 text-center  ">
                        <div className="flex  items-center justify-center gap-1">
                          {item.username}
                          <div
                            className=" lordiconcopy size-8 cursor-pointer"
                            onClick={() => {
                              copytext(item.username);
                            }}
                          >
                            <lord-icon
                              src="https://cdn.lordicon.com/uecgmesg.json"
                              trigger="hover"
                              stroke="bold"
                              state="hover-squeeze"
                              colors="primary:#000000,secondary:#e83a30"
                            ></lord-icon>
                          </div>
                        </div>
                      </td>
                      <td className="  py-2 border border-purple-300 text-center  ">
                        <div className="flex  items-center justify-center gap-1">
                          <span>{"*".repeat(item.password.length)}</span>
                          <div
                            className=" lordiconcopy size-8 cursor-pointer"
                            onClick={() => {
                              copytext(item.password);
                            }}
                          >
                            <lord-icon
                              src="https://cdn.lordicon.com/uecgmesg.json"
                              trigger="hover"
                              stroke="bold"
                              state="hover-squeeze"
                              colors="primary:#000000,secondary:#e83a30"
                            ></lord-icon>
                          </div>
                        </div>
                      </td>
                      <td className="  py-2 border border-purple-300 text-center  ">
                        <span
                          className="cursor-pointer mx-2"
                          onClick={() => {
                            editPassword(item.id);
                          }}
                        >
                          <lord-icon
                            src="https://cdn.lordicon.com/zfzufhzk.json"
                            trigger="loop-on-hover"
                            colors="primary:#ffffff,secondary:#000000,tertiary:#0a2e5c,quaternary:#c69cf4,quinary:#66a1ee"
                          ></lord-icon>
                        </span>
                        <span
                          className="cursor-pointer  mx-2"
                          onClick={() => {
                            deletePassword(item.id);
                          }}
                        >
                          <lord-icon
                            src="https://cdn.lordicon.com/xekbkxul.json"
                            trigger="loop-on-hover"
                            stroke="bold"
                            colors="primary:#ffffff,secondary:#000000,tertiary:#646e78,quaternary:#0a2e5c"
                          ></lord-icon>
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default Manager;
