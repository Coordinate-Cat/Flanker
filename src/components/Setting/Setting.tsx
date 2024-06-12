import { invoke } from "@tauri-apps/api/tauri";
import { useState, useEffect } from "react";
interface SystemInfo {
  cpu: string;
  mem: string;
  used_mem: string;
  total_swap: string;
  used_swap: string;
  name: string;
  kernel: string;
  brand: string;
  long_os_version: string;
  host_name: string;
  uptime: string;
  display_info: string;
  mhz: string;
}
// jsonでくるpc情報を表示
const displaySystemInfo = async (
  setSystemInfo: React.Dispatch<React.SetStateAction<SystemInfo | null>>
) => {
  try {
    const systemInfo = await invoke<string>("get_system_info");
    setSystemInfo(JSON.parse(systemInfo));
    console.log("systemInfo", JSON.parse(systemInfo));
  } catch (e) {
    console.error("Error fetching system info:", e);
  }
};

export const Setting = () => {
  const [systemInfo, setSystemInfo] = useState<SystemInfo | null>(null);
  // toggle
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [isBackgroundImage, setIsBackgroundImage] = useState<boolean>(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const toggleBackgroundImage = () => {
    setIsBackgroundImage(!isBackgroundImage);
  };

  // id: "Setting";の幅をResizeObserverで取得し、200px未満の場合はtrueにする
  // const [isSettingWidthLessThan220, setIsSettingWidthLessThan220] =
  //   useState(false);

  // useEffect(() => {
  //   const setting = document.getElementById("Setting");
  //   if (setting) {
  //     const observer = new ResizeObserver((entries) => {
  //       for (const entry of entries) {
  //         if (entry.contentRect.width < 320) {
  //           setIsSettingWidthLessThan220(true);
  //         } else {
  //           setIsSettingWidthLessThan220(false);
  //         }
  //       }
  //     });
  //     observer.observe(setting);
  //     return () => observer.disconnect();
  //   }
  // }, []);

  useEffect(() => {
    displaySystemInfo(setSystemInfo);
  }, []);
  return (
    <div
      id="Setting"
      data-tauri-drag-region
      className="flex h-fit w-full cursor-default select-none flex-col items-center truncate px-0.5 text-[10px]"
    >
      <div className="flex w-full items-center">
        <img src="src/assets/setting.svg" alt="setting" className="h-4 w-4" />
        <div className="ml-0.5 cursor-default select-none truncate text-base text-[#EBDCB2]">
          Setting
        </div>
      </div>

      <fieldset className="mt-1 w-full rounded border border-[#EBDCB2] px-1 pb-1">
        <legend className="px-1 text-xs">System Info</legend>
        <div className="flex flex-col px-1">
          {systemInfo &&
            Object.entries(systemInfo).map(([key, value], index) => (
              <div key={index} className="flex w-full justify-between">
                <div className="mr-1 overflow-hidden text-right text-[10px] capitalize">
                  {key.replace(/_/g, " ")}
                </div>
                <div className="w-full flex-1 items-center justify-center py-2">
                  <div className="h-[1px] w-full border-b border-dashed border-[#EBDCB2]"></div>
                </div>
                <div className="ml-1 w-[72px] text-[10px]">
                  {/* cpu_info, display_info */}
                  {key === "cpu" || key === "display" || key === "mhz" ? (
                    value.split(", ").map((value: string, index: number) => (
                      <div key={index} className="truncate">
                        {value}
                      </div>
                    ))
                  ) : (
                    <div className="truncate">{value}</div>
                  )}
                </div>
              </div>
            ))}
        </div>
      </fieldset>

      <fieldset className="mt-1 w-full rounded border border-[#EBDCB2] px-1 pb-1">
        <legend className="px-1 text-xs">App Preference</legend>
        <div className="flex items-center justify-between px-1">
          <div className="cursor-default select-none text-[10px]">
            Dark Mode
          </div>
          <div className="flex items-center">
            <button
              className={`relative h-[14px] w-7 cursor-pointer rounded border border-[#EBDCB2] 
                ${isDarkMode ? "bg-[#d95e00]" : ""}`}
              onClick={toggleDarkMode}
            >
              <div
                className={`absolute left-[1px] top-[1px] h-[10px] w-[10px] transform rounded-sm transition-transform duration-300 ${
                  isDarkMode
                    ? "translate-x-[14px] bg-[#EBDCB2]"
                    : "bg-[#EBDCB2]"
                }`}
              ></div>
            </button>
          </div>
        </div>
        <div className="flex items-center justify-between px-1">
          <div className="cursor-default select-none text-[10px]">
            Background Image
          </div>
          <div className="flex items-center">
            <button
              className={`relative h-[14px] w-7 cursor-pointer rounded border border-[#EBDCB2] 
                ${isBackgroundImage ? "bg-[#d95e00]" : ""}`}
              onClick={toggleBackgroundImage}
            >
              <div
                className={`absolute left-[1px] top-[1px] h-[10px] w-[10px] transform rounded-sm transition-transform duration-300 ${
                  isBackgroundImage
                    ? "translate-x-[14px] bg-[#EBDCB2]"
                    : "bg-[#EBDCB2]"
                }`}
              ></div>
            </button>
          </div>
        </div>
      </fieldset>

      <fieldset className="my-1 w-full rounded border border-[#EBDCB2] px-1 pb-1">
        <legend className="px-1 text-xs">Reset</legend>
        <div className="flex items-center justify-between px-1">
          <div className="cursor-pointer select-none text-[10px]">
            Reset Store
          </div>
          <div>
            <button className="h-[14px] w-20 cursor-pointer rounded border border-[#EBDCB2] bg-[#d92800] px-1 text-[10px] leading-tight duration-300 hover:bg-[#EBDCB2] hover:text-[#d92800]">
              Reset
            </button>
          </div>
        </div>
        <div className="flex items-center justify-between px-1">
          <div className="cursor-pointer select-none text-[10px]">
            Default Setting
          </div>
          <div>
            <button className="h-[14px] w-20 cursor-pointer rounded border border-[#EBDCB2] bg-[#d92800] px-1 text-[10px] leading-tight duration-300 hover:bg-[#EBDCB2] hover:text-[#d92800]">
              Default
            </button>
          </div>
        </div>
      </fieldset>
    </div>
  );
};
