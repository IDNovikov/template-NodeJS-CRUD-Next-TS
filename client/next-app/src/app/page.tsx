import styles from "./page.module.css";
import MainContainer from "./ui/MainContainer";

export default function Home() {
  return (
    <MainContainer>
      <div className={styles.page}>The main page</div>
    </MainContainer>
  );
}
