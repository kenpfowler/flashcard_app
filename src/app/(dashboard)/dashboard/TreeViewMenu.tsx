import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar";
import Link from "next/link";

export const TreeViewMenu = () => {
  return (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>New Subject</MenubarTrigger>
        <MenubarContent>
          <MenubarItem asChild>
            <Link href={"/subjects/create"}>
              Add Subject <MenubarShortcut>⌘T</MenubarShortcut>
            </Link>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
};
