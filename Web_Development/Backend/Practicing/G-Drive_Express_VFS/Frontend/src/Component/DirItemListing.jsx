import React, { useState } from "react";
import { Link } from "react-router-dom";
import { BsThreeDotsVertical } from "react-icons/bs";
import ContextMenu from "./ContextMenu";

function DirItemListing({
  listingItem,
  listType,
  isContextMenu,
  setIsContextMenu,
  handleDelete,
  setIsPortalOpen,
  setInputValue,
  setRenameId
}) {
  return listingItem.map(({ name, id }, index) => (
    <Link
      key={index}
      to={
        listType === "directory"
          ? `/directory/${id}`
          : `http://localhost:4000/files/${id}`
      }
      className="text-blue-600"
    >
      <div className="flex justify-between items-center border-solid relative border-[#E5E7EB] border-[2px] pl-4 pr-2 pt-2 pb-3 my-2 bg-[#f4f2f5] rounded-md font-semibold text-[#374151] text-[16px]  hover:bg-blue-100 transition-all ease-in-out">
        <span>{name}</span>
        <BsThreeDotsVertical
          size={24}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            if (isContextMenu.index === -1 || isContextMenu.index!==index)
              setIsContextMenu({ index, listType });
            else setIsContextMenu({ index: -1, listType: null });
          }}
        />

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
    </Link>
  ));
}
export default DirItemListing;
