import { Resizable } from "re-resizable";
import { useEffect, useState } from "react";

import { MiniSideMenuBarButton } from "./components/Buttons/MiniSideMenuBarButton/MiniSideMenuBarButton";
import { MiniTitleBarButton } from "./components/Buttons/MiniTitleBarButton/MiniTitleBarButton";
import { CurrentPage } from "./components/CurrentPage/CurrentPage";
import { Header } from "./components/Header/Header";
import { PrivacyMode } from "./components/PrivacyMode/PrivacyMode";
import { Setting } from "./components/Setting/Setting";
import { SideMenuLists } from "./components/SideMenuLists/SideMenuLists";
import useResizeObserver from "./shared/hooks/useResizeObserver";
import { useStore } from "./shared/store/store";
import { loadImageBase64 } from "./shared/utils/backgroundUtils";

function App() {
  // store
  const {
    sideMenuView,
    // setSideMenuView,
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
    // setCurrentPage,
    isOpenSetting,
    setIsOpenSetting,
  } = useStore();
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const savedImagePath = useStore((state) => state.savedImagePath);

  useEffect(() => {
    const loadImage = async () => {
      if (savedImagePath) {
        const base64 = await loadImageBase64(savedImagePath);
        if (base64) {
          setImageSrc(base64);
        }
      }
    };
    loadImage();
  }, [savedImagePath]);
  // hooks
  useResizeObserver(setSideMenuWidth);
  // useToggleDisplay(titlebarView, setTitlebarView);

  const [isContentBodyWidthLessThan200, setIsContentBodyWidthLessThan200] =
    useState(false);
  // リアルタイムでid:Contentbodyの幅をResizeObserverで取得し、200px未満の場合はtrueにする
  useEffect(() => {
    const contentBody = document.getElementById("ContentBody");
    if (contentBody) {
      const observer = new ResizeObserver((entries) => {
        for (const entry of entries) {
          if (entry.contentRect.width < 182) {
            setIsContentBodyWidthLessThan200(true);
          } else {
            setIsContentBodyWidthLessThan200(false);
          }
        }
      });
      observer.observe(contentBody);
      return () => observer.disconnect();
    }
  }, []);

  // debug
  // getLocalStorageSize();
  return (
    <div className="relative">
      {imageSrc && (
        <img
          src={imageSrc}
          alt="UploadedImage"
          className="absolute inset-0 -top-[1px] left-[1px] z-10 h-[calc(100vh-4px)] w-[calc(100%-2px)] rounded-[6px] object-cover"
        />
      )}
      <div data-tauri-drag-region className="relative z-30">
        {!titlebarView && (
          <Header
            sideMenuView={fullContentBodyView}
            setSideMenuView={setFullContentBodyView}
            titlebarView={titlebarView}
            setTitlebarView={setTitlebarView}
            alwaysOnTopView={alwaysOnTopView}
            setAlwaysOnTopView={setAlwaysOnTopView}
            isPrivacyMode={isPrivacyMode}
            setIsPrivacyMode={setIsPrivacyMode}
            isOpenSetting={isOpenSetting}
            setIsOpenSetting={setIsOpenSetting}
          />
        )}
        {titlebarView && (
          <div className="z-[9999] mt-0">
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
        <div className="flex items-center justify-center p-1">
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
                  className={`z-40 mr-[3px] select-none overflow-y-auto rounded-md p-1 text-xs backdrop-blur-[3px] 
                    ${titlebarView ? "h-[calc(100vh-10px)]" : "h-[calc(100vh-36px)]"}
                    ${fullContentBodyView ? "" : "bg-transparent"}
                  `}
                >
                  {sideMenuWidth < 44 ? (
                    <div className="truncate">test</div>
                  ) : (
                    <div
                      className={`
                      ${fullContentBodyView ? "block" : "hidden"}
                    `}
                    >
                      <SideMenuLists />
                    </div>
                  )}
                </div>
              </Resizable>
            </div>
          )}
          {/* ------------ ContentBody ------------ */}
          <div
            id="ContentBody"
            data-tauri-drag-region
            className={`scrollbar flex flex-1 overflow-y-scroll rounded-md p-1 text-xs backdrop-blur-[3px] 
            ${titlebarView ? "h-[calc(100vh-10px)]" : "h-[calc(100vh-36px)]"} 
            ${fullContentBodyView ? "w-[calc(100%-40px)]" : "fixed w-[calc(100%-12px)]"} 
            ${isPrivacyMode ? "gradient-background fixed left-[50%] right-[50%] ml-0 w-[calc(100vw-10px)] -translate-x-1/2" : "w-[calc(100vw-10px)]"} 
            ${isPrivacyMode && titlebarView ? "h-[calc(100vh-10px)]" : ""}
          `}
          >
            {!isContentBodyWidthLessThan200 &&
              !isPrivacyMode &&
              !isOpenSetting && <CurrentPage currentPage={currentPage} />}
            {isPrivacyMode && <PrivacyMode />}
            {!isContentBodyWidthLessThan200 &&
              isOpenSetting &&
              !isPrivacyMode && <Setting setImageSrc={setImageSrc} />}
            {isContentBodyWidthLessThan200 && (
              <div
                // ど真ん中に表示
                className="flex h-full w-full select-none items-center justify-center text-center text-[10px] italic"
              >
                Tight, Tight, Tight,
                <br />
                Yeah!
                <br />
                ¯\_(ツ)_/¯
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
