import { Input } from "antd";
import { FC, PropsWithChildren, ReactNode } from "react";
import classes from "./style.module.scss";

interface PropsI {
  title: string | ReactNode;
  placeholder?: string;
  onSearch: (value: string) => void;
}

export const TableHeader: FC<PropsWithChildren & PropsI> = (props) => {
  return (
    <section className={classes.header}>
      {typeof props.title === "string" ? <h2>{props.title}</h2> : props.title}
      <Input.Search
        className={classes.search}
        placeholder={props.placeholder || "搜索名称"}
        onSearch={props.onSearch}
        allowClear
      />
    </section>
  );
};
