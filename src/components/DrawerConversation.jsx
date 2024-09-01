// components/DrawerConversation.jsx
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription } from "../components/ui/drawer";
import { Avatar, AvatarImage, AvatarFallback } from "../components/ui/avatar";

export default function DrawerConversation({
  isConversationPanelOpen,
  setIsConversationPanelOpen,
  conversations,
}) {
  return (
    <Drawer
      open={isConversationPanelOpen}
      onOpenChange={(isOpen) => setIsConversationPanelOpen(isOpen)}
      position="right"
      className="w-full max-w-[300px]"
    >
      <DrawerContent className="p-5">
        <DrawerHeader>
          <DrawerTitle>Previous Conversations</DrawerTitle>
          <DrawerDescription>
            Select a previous conversation to continue.
          </DrawerDescription>
        </DrawerHeader>
        <div>
          {conversations.map((conversation, index) => (
            <div
              key={index}
              className="flex items-center m-2 p-3 rounded-lg hover:bg-slate-200"
            >
              <div>
                <Avatar>
                  <AvatarImage src={conversation.avatarSrc} alt="Avatar" />
                  <AvatarFallback>{conversation.initials}</AvatarFallback>
                </Avatar>
              </div>
              <div className="ml-3">
                <div className="font-semibold">{conversation.title}</div>
                <div>{conversation.description}</div>
              </div>
            </div>
          ))}
        </div>
      </DrawerContent>
    </Drawer>
  );
}
