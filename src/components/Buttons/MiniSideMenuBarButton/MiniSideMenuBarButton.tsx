type MiniSideMenuBarButtonProps = {
  setFullContentBodyView: (value: boolean) => void;
  fullContentBodyView: boolean;
};

export const MiniSideMenuBarButton = ({
  setFullContentBodyView,
  fullContentBodyView,
}: MiniSideMenuBarButtonProps) => {
  return (
    <button
      className="fixed bottom-[50%] left-[1px] top-[50%] z-[9999] h-[25px] w-2 translate-y-[-50%] rounded-full border-2 border-neutral-800 bg-[#d95e00] hover:bg-[#c68031]"
      onClick={() => {
        setFullContentBodyView(!fullContentBodyView);
      }}
    ></button>
  );
};
