import Head from "next/head";
import Link from "next/link";

type Props = {
  children?: React.ReactNode;
  keywords?: string;
};

const MainContainer: React.FC<Props> = ({ children, keywords }) => {
  return (
    <>
      <Head>
        <meta name="keywords" content={`shop, admin, testCase, ${keywords}`} />
        <title>Главная страница</title>
      </Head>
      <nav className="navbar">
        <Link className="link" href="/">
          Home
        </Link>
        <Link className="link" href="/shop">
          Magazine
        </Link>
        <Link className="link" href="/auth">
          Auth
        </Link>
        <Link className="link" href="/admin">
          Admin
        </Link>
      </nav>
      <main className="inner">{children}</main>
    </>
  );
};

export default MainContainer;
