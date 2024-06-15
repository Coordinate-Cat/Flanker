import { alwaysOnTop } from "../../shared/utils/alwaysOnTop";
import { ReloadButton } from "../Buttons/ReloadButton/ReloadButton";
import { SettingButton } from "../Buttons/SettingButton/SettingButton";
import { SideMenuBarButton } from "../Buttons/SideMenuBarButton/SideMenuBarButton";
import { TitleBarButton } from "../Buttons/TitleBarButton/TitleBarButton";
// import { TrafficLightButton } from "../Buttons/TrafficLightButton/TrafficLightButton";

type HeaderProps = {
  // setSideMenuWidth: (value: number) => void;
  sideMenuView: boolean;
  setSideMenuView: (value: boolean) => void;
  titlebarView: boolean;
  setTitlebarView: (value: boolean) => void;
  alwaysOnTopView: boolean;
  setAlwaysOnTopView: (value: boolean) => void;
  isPrivacyMode: boolean;
  setIsPrivacyMode: (value: boolean) => void;
  isOpenSetting: boolean;
  setIsOpenSetting: (value: boolean) => void;
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
  isOpenSetting,
  setIsOpenSetting,
}: HeaderProps) => {
  return (
    <header
      id="Header"
      data-tauri-drag-region
      className="z-50 mr-1 mt-0.5 flex h-6 items-center justify-between"
    >
      {/* <TrafficLightButton /> */}
      {/* --------------- left side --------------- */}
      <div className="flex pl-20">
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
        {/* setting button */}
        {!isPrivacyMode ? (
          <SettingButton
            isOpenSetting={isOpenSetting}
            setIsOpenSetting={setIsOpenSetting}
          />
        ) : (
          <div className="flex h-5 w-5 cursor-not-allowed items-center justify-center rounded-sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 -960 960 960"
              fill="#505050"
            >
              <path d="m370-80-16-128q-13-5-24.5-12T307-235l-119 50L78-375l103-78q-1-7-1-13.5v-27q0-6.5 1-13.5L78-585l110-190 119 50q11-8 23-15t24-12l16-128h220l16 128q13 5 24.5 12t22.5 15l119-50 110 190-103 78q1 7 1 13.5v27q0 6.5-2 13.5l103 78-110 190-118-50q-11 8-23 15t-24 12L590-80H370Zm70-80h79l14-106q31-8 57.5-23.5T639-327l99 41 39-68-86-65q5-14 7-29.5t2-31.5q0-16-2-31.5t-7-29.5l86-65-39-68-99 42q-22-23-48.5-38.5T533-694l-13-106h-79l-14 106q-31 8-57.5 23.5T321-633l-99-41-39 68 86 64q-5 15-7 30t-2 32q0 16 2 31t7 30l-86 65 39 68 99-42q22 23 48.5 38.5T427-266l13 106Zm42-180q58 0 99-41t41-99q0-58-41-99t-99-41q-59 0-99.5 41T342-480q0 58 40.5 99t99.5 41Zm-2-140Z" />
            </svg>
          </div>
        )}
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
