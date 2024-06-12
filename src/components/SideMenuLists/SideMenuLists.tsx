// const/Category.tsからCategoryを取得し、サイドメニューのリストを作成する
import { Tooltip } from "react-tooltip";

import { Category } from "../../shared/const/Category";
import { useStore } from "../../shared/store/store";

type Place = "right";

export const SideMenuLists = () => {
  const PLACES = ["right"];
  const { setCurrentPage, currentPage } = useStore();
  return (
    <ul>
      {Category.map((category, index) => (
        <li
          key={index}
          data-tooltip-html={category}
          data-tooltip-id="my-tooltip-data-html tooltip-anchor-show"
          data-tooltip-delay-show={1000}
          className={`cursor-pointer rounded-sm px-0.5 text-[10px] hover:text-[#d95e00] ${
            currentPage === category ? "bg-[#484848]" : ""
          }`}
        >
          <button
            onClick={() => setCurrentPage(category)}
            className="w-full truncate text-left"
          >
            {category}
          </button>
          {PLACES.map((place) => (
            <Tooltip
              key={place}
              place={place as Place}
              id="my-tooltip-data-html tooltip-anchor-show"
              style={{
                width: "fit-content",
                maxWidth: "180px",
                fontSize: "10px",
                padding: "4px",
                marginLeft: "0",
                borderRadius: "4px",
                backgroundColor: "#404040",
                color: "#d95e00",
                fontWeight: "bold",
              }}
            />
          ))}
        </li>
      ))}
    </ul>
  );
};
