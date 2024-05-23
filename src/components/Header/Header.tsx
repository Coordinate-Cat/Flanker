import { alwaysOnTop } from "../../shared/utils/alwaysOnTop";
import { ReloadButton } from "../Buttons/ReloadButton/ReloadButton";
import { SideMenuBarButton } from "../Buttons/SideMenuBarButton/SideMenuBarButton";
import { TitleBarButton } from "../Buttons/TitleBarButton/TitleBarButton";

type HeaderProps = {
  // setSideMenuWidth: (value: number) => void;
  sideMenuView: boolean;
  setSideMenuView: any;
  titlebarView: boolean;
  setTitlebarView: any;
  alwaysOnTopView: boolean;
  setAlwaysOnTopView: any;
  isPrivacyMode: boolean;
  setIsPrivacyMode: any;
};

export const Header = ({
  // setSideMenuWidth,
  sideMenuView,
  setSideMenuView,
  titlebarView,
  setTitlebarView,
  alwaysOnTopView,
  setAlwaysOnTopView,
  isPrivacyMode,
  setIsPrivacyMode,
}: HeaderProps) => {
  return (
    <header
      id="Header"
      data-tauri-drag-region
      className="mr-1 mt-0.5 flex h-6 items-center justify-between pl-20"
    >
      {/* --------------- left side --------------- */}
      <div className="flex">
        {/* sidemenu button */}
        {!isPrivacyMode ? (
          <SideMenuBarButton
            sideMenuView={sideMenuView}
            setSideMenuView={setSideMenuView}
          />
        ) : (
          <div className="flex h-5 w-5 cursor-not-allowed items-center justify-center rounded-sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 -960 960 960"
              width="16"
              height="16"
              fill="#505050"
            >
              <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm120-80v-560H200v560h120Zm80 0h360v-560H400v560Zm-80 0H200h120Z" />
            </svg>
          </div>
        )}
        {/* titlebar button */}
        <TitleBarButton
          titlebarView={titlebarView}
          setTitlebarView={setTitlebarView}
        />
      </div>
      {/* --------------- right side --------------- */}
      <div className="flex items-center justify-between">
        {/* privacy mode */}
        <button
          onClick={() => {
            setIsPrivacyMode(!isPrivacyMode);
          }}
          className="flex h-5 w-5 cursor-pointer items-center justify-center rounded-sm hover:bg-neutral-800"
        >
          {isPrivacyMode ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 -960 960 960"
              height="16px"
              width="16px"
              fill="#EBDCB2"
            >
              <path d="M80-120v-80h80v-640h640v640h80v80H550q0 29-20.5 49.5T480-50q-29 0-49.5-20.5T410-120H80Zm160-240h480v-400H240v400Zm0 160h200v-80H240v80Zm280 0h200v-80H520v80ZM240-760h480-480Z" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 -960 960 960"
              height="16px"
              width="16px"
              fill="#EBDCB2"
            >
              <path d="M80-120v-80h80v-640h640v640h80v80H80Zm160-400h480v-240H240v240Zm0 320h480v-240H520v72q14 10 22 25t8 33q0 29-20.5 49.5T480-240q-29 0-49.5-20.5T410-310q0-18 8-32.5t22-24.5v-73H240v240Zm0-560h480-480Z" />
            </svg>
          )}
        </button>
        {/* reload button */}
        <ReloadButton />
        {/* always on top button */}
        <button
          onClick={() => alwaysOnTop(alwaysOnTopView, setAlwaysOnTopView)}
          className="flex h-5 w-5 cursor-pointer items-center justify-center rounded-sm rounded-tr-md hover:bg-neutral-800"
        >
          {alwaysOnTopView ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 -930 960 960"
              fill="#EBDCB2"
            >
              <path d="M680-840v80h-40v327l-80-80v-247H400v87l-87-87-33-33v-47h400ZM480-40l-40-40v-240H240v-80l80-80v-46L56-792l56-56 736 736-58 56-264-264h-6v240l-40 40ZM354-400h92l-44-44-2-2-46 46Zm126-193Zm-78 149Z" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 -930 960 960"
              fill="#EBDCB2"
            >
              <path d="m640-480 80 80v80H520v240l-40 40-40-40v-240H240v-80l80-80v-280h-40v-80h400v80h-40v280Zm-286 80h252l-46-46v-314H400v314l-46 46Zm126 0Z" />
            </svg>
          )}
        </button>
        {/* <GithubButton /> */}
      </div>
    </header>
  );
};
