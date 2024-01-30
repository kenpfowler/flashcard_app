"use client";

import { ComponentWithChildren, Result } from "@/types/types";
import { TreeViewMenu } from "./TreeViewMenu";
import { BasicTree } from "./TreeView";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Subject } from "@/types/entities";

type ResizableViewProps = {
  result: Result<Subject[]>;
};

export const ResizableView = ({ result }: ResizableViewProps) => {
  return (
    <ResizablePanelGroup direction="horizontal">
      <ResizablePanel>
        <div className="flex flex-col px-4 max-h-screen">
          <TreeViewMenu />
          {result.ok ? (
            <BasicTree data={result.value} />
          ) : (
            <h1>Cannot Display Menu</h1>
          )}
        </div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel></ResizablePanel>
    </ResizablePanelGroup>
  );
};

{
}
