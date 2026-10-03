import Image from "next/image";
import styles from "./page.module.css";
import Counter from "@/components/Counter";
import ApiCalls from "@/components/ApiCall";

export default function Home() {
  return (
    <>

      <div className={styles.page}>
        This is the welcome page.<br />
        You are welcome here
      </div>
      <Counter />
      <ApiCalls />
    </>

  );
}
