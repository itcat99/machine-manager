import { FC, PropsWithChildren, useState } from "react";
import { Layout as LayoutAntd, Menu, MenuProps } from "antd";

import classes from "./style.module.scss";
import { useRouter } from "next/router";
import Link from "next/link";
import {
  AppstoreOutlined,
  BarsOutlined,
  SwitcherOutlined,
} from "@ant-design/icons";

const { Header, Sider, Footer, Content } = LayoutAntd;

const items: MenuProps["items"] = [
  {
    label: <Link href="/product-templates">产品模板</Link>,
    key: "product-templates",
    icon: <SwitcherOutlined />,
  },
  {
    label: <Link href="/products">产品列表</Link>,
    key: "products",
    icon: <BarsOutlined />,
  },
  {
    label: <Link href="/category">产品分类</Link>,
    key: "category",
    icon: <AppstoreOutlined />,
  },
  // {
  //   label: <Link href="/about">关于我们</Link>,
  //   key: "about",
  // },
];

export const Layout: FC<PropsWithChildren> = (props) => {
  const { pathname } = useRouter();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <LayoutAntd id={classes.layout}>
      <Sider
        className={classes.sidebar}
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <h1 className={classes.title}> {collapsed ? "机械" : "机械项目"}</h1>
        <Menu
          items={items}
          selectedKeys={[`${pathname.slice(1)}`]}
          theme="dark"
        ></Menu>
      </Sider>
      <LayoutAntd className={classes.main}>
        <Header className={classes.header}></Header>
        <Content className={classes.content}>{props.children}</Content>
        {/* <Footer></Footer> */}
      </LayoutAntd>
    </LayoutAntd>
  );
};
