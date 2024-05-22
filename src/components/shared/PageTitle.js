"use client";

import Head from "next/head";
import React, { useEffect } from "react";

const BASE_TITLE = "Cootle";

export default function PageTitle({ title = "Cootle – Designer" }) {
  useEffect(() => {
    window.document.title = `${BASE_TITLE} - ${title}`;
  }, []);
  return (
    <Head>
      <title>{`${BASE_TITLE} - ${title}`}</title>
    </Head>
  );
}
