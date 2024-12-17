import CustomLink from "./CustomLink";
import Head from "next/head";

type Props = {
  children?: React.ReactNode;
  keywords?: string;
};

const MainContainer: React.FC<Props> = ({
  children,
  keywords,
}): React.ReactNode => {
  return (
    <>
      <Head>
        <meta
          keywords={`shop with admin example + ${keywords && keywords}`}
        ></meta>
        <title>Главная страница</title>
      </Head>
      <div className="navbar">
        <CustomLink href={"/"} text="Home" />
        <CustomLink href={"/shop"} text="Magazine" />
      </div>
      <div>{children}</div>
      <style jsx>
        {`
          .navbar {
            background: orange;
            padding: 15px;
          }
        `}
      </style>
    </>
  );
};

export default MainContainer;
