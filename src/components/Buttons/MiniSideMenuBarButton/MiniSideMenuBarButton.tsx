export const MiniSideMenuBarButton = ({
  setFullContentBodyView,
  fullContentBodyView,
}: any) => {
  return (
    <button
      className="fixed bottom-[50%] top-[50%] z-50 h-[25px] w-2 translate-y-[-50%] rounded-full border-2 border-neutral-800 bg-[#d95e00] hover:bg-[#c68031]"
      onClick={() => {
        setFullContentBodyView(!fullContentBodyView);
      }}
    ></button>
  );
};
