export const MiniTitleBarButton = ({ setTitlebarView, titlebarView }: any) => {
  return (
    <button
      className="fixed left-[50%] right-[50%] top-[1px] z-50 h-2 w-[50px] translate-x-[-50%] rounded-full border-2 border-neutral-800 bg-[#d95e00] hover:bg-[#c68031]"
      onClick={() => setTitlebarView(!titlebarView)}
    ></button>
  );
};
