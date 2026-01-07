import React, { useState } from "react";
import { Link } from "react-router-dom";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaDownload } from "react-icons/fa";
import ContextMenu from "./ContextMenu";
import { BaseUrl } from "../App";

function DirItemListing({
  listingItem,
  listType,
  isContextMenu,
  setIsContextMenu,
  handleDelete,
  setIsPortalOpen,
  setInputValue,
  setRenameId,
}) {
  return listingItem.map(({ name, _id: id }, index) => (
    <div
      key={id}
      className="flex justify-between items-center border-solid relative border-[#E5E7EB] border-[1px] pl-4 pr-2 my-2 bg-[#f4f2f5] rounded-md font-normal text-[16px]  hover:bg-blue-100 transition-all ease-in-out"
    >
      <Link
        to={
          listType === "directory"
            ? `/directory/${id}`
            : `${BaseUrl}/files/${id}`
        }
        className=" w-full pt-2 pb-3"
      >
        <span>{name}</span>
      </Link>
      <div className="flex items-center justify-around gap-4">
        {listType === "files" && (
          <Link to={`${BaseUrl}/files/${id}?action=download`}>
            <FaDownload size={24} />
          </Link>
        )}
        <BsThreeDotsVertical
          className="cursor-pointer"
          size={24}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            if (isContextMenu.index === -1 || isContextMenu.index !== index)
              setIsContextMenu({ index, listType });
            else setIsContextMenu({ index: -1, listType: null });
          }}
        />
      </div>

      <ContextMenu
        isOpen={
          isContextMenu.index === index && isContextMenu.listType === listType
        }
        setIsContextMenu={setIsContextMenu}
        handleDelete={handleDelete}
        id={id}
        setIsPortalOpen={setIsPortalOpen}
        name={name}
        setInputValue={setInputValue}
        listType={listType}
        setRenameId={setRenameId}
      />
    </div>
  ));
}
export default DirItemListing;
