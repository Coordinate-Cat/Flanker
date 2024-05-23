import { GithubButtonSVG } from "./GithubButtonSVG";

export const GithubButton = () => {
  return (
    <a
      href="https://github.com/Coordinate-Cat/watchpoint-gui"
      target="_blank"
      rel="noreferrer noopener"
      className="w-5 h-5 rounded-sm rounded-tr-md hover:bg-neutral-800 flex items-center justify-center cursor-pointer"
    >
      <GithubButtonSVG />
    </a>
  );
};
