import Head from "next/head";
import type { ReactNode } from "react";

type Props = {
  description?: string;
  children: ReactNode;
  title?: string;
};

const PageContainer = ({ title, description, children }: Props) => (
  <>
    <Head>
      {title ? <title>{title}</title> : null}
      {description ? <meta name="description" content={description} /> : null}
    </Head>
    {children}
  </>
);

export default PageContainer;
