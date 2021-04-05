import React from "react"
import { DefaultMenuStructure, MenuRoot } from "../utils/menu-structure"

export default function Menu() {
  let menuData = DefaultMenuStructure('main')

  return (<div className="garden-menu">
    <MenuRoot menu={menuData} />
  </div>)
}
