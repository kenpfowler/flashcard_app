"use client";
import { NodeRendererProps, Tree } from "react-arborist";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export const BasicTree = ({ data }: any) => {
  return (
    <Tree
      width={1000}
      height={2000}
      initialData={data}
      openByDefault={false}
      disableDrag={true}
      disableDrop={true}
    >
      {Node}
    </Tree>
  );
};

type TreeData = {
  id: string;
  name: string;
};

enum NodeType {
  Subject = 0,
  Deck = 1,
  Card = 2,
}

const nodes = ["subjects", "decks", "cards"];

/* This node instance can do many things. See the API reference. */
function Node({
  node,
  style,
  dragHandle,
  ...rest
}: NodeRendererProps<TreeData>) {
  const router = useRouter();

  const handleDelete = async (id: string, type: NodeType) => {
    const isConfirmed = window.confirm(
      "This action will delete your subject, decks, and any cards you have created.  Are you sure?"
    );

    if (isConfirmed) {
      const res = await fetch(`/api/${nodes[type]}`, {
        method: "DELETE",
        body: JSON.stringify({ id }),
      });
    }
  };

  switch (node.level) {
    case NodeType.Subject:
      return (
        <div style={style} ref={dragHandle} {...rest}>
          <div className="flex space-x-2">
            <div onClick={() => node.isInternal && node.toggle()}>
              {node.isLeaf ? "🍁 " : "🗀 "}
            </div>
            <ContextMenu>
              <ContextMenuTrigger>{node.data.name}</ContextMenuTrigger>
              <ContextMenuContent>
                <ContextMenuItem asChild>
                  <Link href={`/decks/create?subject=${node.id}`}>
                    Add deck
                  </Link>
                </ContextMenuItem>
                <ContextMenuItem asChild>
                  <Link href={`/subjects/${node.id}`}>Edit subject</Link>
                </ContextMenuItem>
                <ContextMenuItem asChild>
                  <Button
                    onClick={async () => {
                      await handleDelete(node.id, node.level);
                      router.refresh();
                    }}
                    variant={"ghost"}
                    className="w-full justify-start"
                  >
                    Delete Subject
                  </Button>
                </ContextMenuItem>
              </ContextMenuContent>
            </ContextMenu>
          </div>
        </div>
      );
    case NodeType.Deck:
      return (
        <div style={style} ref={dragHandle} {...rest}>
          <div className="flex space-x-2">
            <div onClick={() => node.isInternal && node.toggle()}>
              {node.isLeaf ? "🍁 " : "🗀 "}
            </div>
            <ContextMenu>
              <ContextMenuTrigger>{node.data.name}</ContextMenuTrigger>
              <ContextMenuContent>
                <ContextMenuItem asChild>
                  <Link href="/cards/generate">Create Card</Link>
                </ContextMenuItem>
                <ContextMenuItem asChild>
                  <Link href={`/cards/generate`}>Generate Card</Link>
                </ContextMenuItem>
                <ContextMenuItem asChild>
                  <Link href={`/session?deck=${node.id}`}>Study Deck</Link>
                </ContextMenuItem>
                <ContextMenuItem asChild>
                  <Link href={`/decks/${node.id}`}>Edit Deck</Link>
                </ContextMenuItem>
                <ContextMenuItem asChild>
                  <Link href={`/decks/${node.id}`}>Delete Deck</Link>
                </ContextMenuItem>
              </ContextMenuContent>
            </ContextMenu>
          </div>
        </div>
      );
    case NodeType.Card:
      return (
        <div style={style} ref={dragHandle} {...rest}>
          <div className="flex space-x-2">
            <div onClick={() => node.isInternal && node.toggle()}>
              {node.isLeaf ? "🍁 " : "🗀 "}
            </div>
            <ContextMenu>
              <ContextMenuTrigger>{node.data.name}</ContextMenuTrigger>
              <ContextMenuContent>
                <ContextMenuItem asChild>
                  <Link href={`/cards/${node.id}`}>Edit Card</Link>
                </ContextMenuItem>
                <ContextMenuItem asChild>
                  <Link href={`/cards/generate`}>Delete Card</Link>
                </ContextMenuItem>
              </ContextMenuContent>
            </ContextMenu>
          </div>
        </div>
      );
    default:
      throw Error("This shouldn't happen.");
  }
}
