import type { ReactNode } from "react";

import * as styles from "./atom.header.style";

type Props = {
  children: ReactNode | ReactNode[];
};

export function Header(props: Props) {
  return <header className={styles.header}>{props.children}</header>;
}
