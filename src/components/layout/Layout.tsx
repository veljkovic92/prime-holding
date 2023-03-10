import classes from "./Layout.module.scss"
import Body from "./Body/Body";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";

type LayoutProps = {
  children?: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <main className={classes.layout}>
      <Header />
      <Body children={children} />
      <Footer />
    </main>
  );
};

export default Layout;
