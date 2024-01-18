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
import { Resources, client } from "@/lib/dotnetApi";
import { useState } from "react";

export const BasicTree = ({ data }: any) => {
  return (
    <Tree
      width={1200}
      height={1000}
      initialData={data}
      openByDefault={false}
      disableDrag={true}
      disableDrop={true}
      childrenAccessor={(node: any) => {
        if (node.decks) {
          return node.decks;
        }

        return node.cards;
      }}
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

const nodes = [Resources.Subject, Resources.Deck, Resources.Card];

/* This node instance can do many things. See the API reference. */
function Node({
  node,
  style,
  dragHandle,
  ...rest
}: NodeRendererProps<TreeData>) {
  const router = useRouter();
  const [isFetching, setIsFetching] = useState(false);

  const handleDelete = async (id: string, type: NodeType) => {
    const isConfirmed = window.confirm(
      `This action will delete your ${nodes[type]}. Are you sure?`
    );

    if (isConfirmed) {
      const res = client.deleteResource({
        resource: nodes[type],
        body: id,
      });
    }
  };

  const handleGenerate = async (
    parentName: string | undefined,
    deckName: string,
    deckId: string
  ) => {
    if (!parentName) {
      throw new Error("parent does not exist!");
    }
    try {
      setIsFetching(true);
      const res = client.getResource({
        resource: Resources.Generations,
        options: {
          dynamicSegment: "generateMultipleChoiceCards",
          params: { subject: parentName, deck: deckName, id: deckId },
        },
      });

      setIsFetching(false);
    } catch (error) {
      setIsFetching(false);
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
                  <Link href={`/cards/create?deck=${node.id}`}>
                    Create Card
                  </Link>
                </ContextMenuItem>
                <ContextMenuItem asChild>
                  <Button
                    variant={"ghost"}
                    className="w-full justify-start"
                    onClick={async () => {
                      await handleGenerate(
                        node.parent?.data.name,
                        node.data.name,
                        node.id
                      );
                    }}
                  >
                    Generate Multiple Choice
                  </Button>
                </ContextMenuItem>
                <ContextMenuItem asChild>
                  <Link href={`/session?deckId=${node.id}`}>Study Deck</Link>
                </ContextMenuItem>
                <ContextMenuItem asChild>
                  <Link href={`/decks/${node.id}`}>Edit Deck</Link>
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
                    Delete Deck
                  </Button>
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
                  <Button
                    onClick={async () => {
                      await handleDelete(node.id, node.level);
                      router.refresh();
                    }}
                    variant={"ghost"}
                    className="w-full justify-start"
                  >
                    Delete Card
                  </Button>
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
