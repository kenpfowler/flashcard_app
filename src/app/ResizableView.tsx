"use client";

import { ComponentWithChildren } from "@/types/types";
import { TreeViewMenu } from "./TreeViewMenu";
import { BasicTree } from "./TreeView";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

export const ResizableView = ({
  children,
  tree,
}: ComponentWithChildren & { tree: any }) => {
  return (
    <ResizablePanelGroup direction="horizontal">
      <ResizablePanel>
        <div className="flex flex-col px-4 max-h-screen">
          <TreeViewMenu />
          <BasicTree data={tree} />
        </div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel>
        <div>{children}</div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
};

{
}
