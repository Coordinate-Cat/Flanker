import { Resizable } from "re-resizable";
import { Header } from "./components/Header/Header";
import { useStore } from "./shared/store/store";
import useToggleDisplay from "./shared/hooks/useToggleDisplay";
import { SideMenuLists } from "./components/SideMenuLists/SideMenuLists";
import { PrivacyMode } from "./components/PrivacyMode/PrivacyMode";
import { MiniSideMenuBarButton } from "./components/Buttons/MiniSideMenuBarButton/MiniSideMenuBarButton";
import { MiniTitleBarButton } from "./components/Buttons/MiniTitleBarButton/MiniTitleBarButton";
import useResizeObserver from "./shared/hooks/useResizeObserver";
// import { getLocalStorageSize } from "./shared/debug/getLocalStorageSize";

function App() {
  // store
  const {
    sideMenuView,
    setSideMenuView,
    sideMenuWidth,
    setSideMenuWidth,
    titlebarView,
    setTitlebarView,
    alwaysOnTopView,
    setAlwaysOnTopView,
    isPrivacyMode,
    setIsPrivacyMode,
    fullContentBodyView,
    setFullContentBodyView,
    currentPage,
    setCurrentPage,
  } = useStore();

  // hooks
  useResizeObserver(setSideMenuWidth);
  useToggleDisplay(titlebarView, setTitlebarView);

  // debug
  // getLocalStorageSize();
  return (
    <div data-tauri-drag-region>
      <Header
        sideMenuView={fullContentBodyView}
        setSideMenuView={setFullContentBodyView}
        titlebarView={titlebarView}
        setTitlebarView={setTitlebarView}
        alwaysOnTopView={alwaysOnTopView}
        setAlwaysOnTopView={setAlwaysOnTopView}
        isPrivacyMode={isPrivacyMode}
        setIsPrivacyMode={setIsPrivacyMode}
      />
      {titlebarView && (
        <div className="mt-0.5">
          <MiniTitleBarButton
            setTitlebarView={setTitlebarView}
            titlebarView={titlebarView}
          />
        </div>
      )}
      {!isPrivacyMode && (
        <MiniSideMenuBarButton
          setFullContentBodyView={setFullContentBodyView}
          fullContentBodyView={fullContentBodyView}
        />
      )}
      <div className="flex items-center justify-center p-1 pt-0.5">
        {/* ------------ SideMenuBar ------------ */}
        {sideMenuView && (
          <div id="SideMenu" className="scrollbar" data-tauri-drag-region>
            <Resizable
              defaultSize={{
                width: window.innerWidth - 6,
                height: "100%",
              }}
              minWidth="10px"
              maxWidth="182px"
              enable={{
                top: false,
                right: true,
                bottom: false,
                left: false,
                topRight: false,
                bottomRight: false,
                bottomLeft: false,
                topLeft: false,
              }}
            >
              <div
                id="SideMenuLists"
                data-tauri-drag-region
                className={`z-30 mr-[3px] select-none overflow-y-auto rounded-md bg-neutral-800 p-1 text-xs ${
                  titlebarView ? "h-[calc(100vh-10px)]" : "h-[calc(100vh-36px)]"
                }`}
              >
                {sideMenuWidth < 44 ? (
                  <div className="truncate">test</div>
                ) : (
                  <SideMenuLists />
                )}
              </div>
            </Resizable>
          </div>
        )}
        {/* ------------ ContentBody ------------ */}
        <div
          id="ContentBody"
          data-tauri-drag-region
          className={`flex flex-1 overflow-hidden overflow-y-auto rounded-md bg-neutral-800 p-1 text-xs 
            ${titlebarView ? "h-[calc(100vh-10px)]" : "h-[calc(100vh-36px)]"} 
            ${fullContentBodyView ? "w-[calc(100%-40px)]" : "fixed z-40 w-[calc(100%-12px)]"} 
            ${isPrivacyMode ? "gradient-background fixed left-[50%] right-[50%] z-40 ml-0 w-[calc(100vw-10px)] -translate-x-1/2" : "w-[calc(100vw-10px)]"} 
            ${isPrivacyMode && titlebarView ? "h-[calc(100vh-10px)]" : ""}
          `}
        >
          {!isPrivacyMode ? (
            <div data-tauri-drag-region>
              <div className="flex h-full flex-col items-start justify-start">
                <p className="cursor-default select-none text-[10px]">
                  {currentPage}
                </p>
              </div>
            </div>
          ) : (
            <PrivacyMode />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
