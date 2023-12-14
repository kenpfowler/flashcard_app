"use client";
import { Tree } from "react-arborist";

export const BasicTree = ({ data }: any) => {
  return <Tree width={600} height={1000} initialData={data} />;
};
