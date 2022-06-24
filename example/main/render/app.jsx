import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

function Root() {
  const [list_menu, setListMenu] = useState([
    { id: "1", title: "vue3", path: "/vue3", description: "Vue3" },
    { id: "2", title: "viteapp", path: "/viteapp", description: "viteapp" },
    { id: "3", title: "react18", path: "/react18", description: "react18" },
    { id: "4", title: "v3sub", path: "/v3sub", description: "v3sub" },
  ]);

  function push(path) {
    history.pushState(null, path, path);
  }
  async function getMenuList() {
    const baseUrl = process.env.APP_API_URL || "http://localhost:3456";
    const config = {
      method: "GET",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
    };
    const response = await fetch(baseUrl + "/menu", config);
    console.log(response, " wwwwwwwwwwwwwww");
    return response;
  }
  function MenuList(list) {
    console.log(list, 'listlistlist');
    const items = list.map((item, index) => {
      return <li onClick={() => push(item.path)}> {item.title}</li>;
    });
    return <ul className="app-sidemenu">{items}</ul>;
  }
  useEffect(() => {
    getMenuList().then(res => {
      console.log(res, list_menu, 'wwwxxxxxxxxxxxxxaaaaaaaaaaaaa');
      setListMenu(menuList);
      MenuList(list_menu);
      console.log(list_menu, menuList, "哈哈哈哈");
    })
  }, []);
  return (
    <div className="app">
      <header className="app-header">
        <h1>范宇</h1>
      </header>
      <div className="app-main">
        {list_menu.length ? "Loading" : <MenuList />}
        <main id="subapp-container"></main>
      </div>
    </div>
  );
}

const root = document.querySelector("#all-root");
ReactDOM.render(<Root />, root);
