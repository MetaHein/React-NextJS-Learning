import { resolve } from "node:dns";
import { title } from "node:process";
import React from "react";
export const metadata = {
  title: {
    absolute: "My Blog",
  },
};

export default async function Blog() {
  await new Promise((resolve) => {
    setTimeout(() => {
      resolve("intentional delay");
    }, 2000);
  });
  return <div>My Blog</div>;
}
