import React from "react";
import Icon from "./Icon";

export default function Home() {
  return <div className="px-6 py-8 sm:py-16 lg:px-8">
    <div className="mx-auto max-w-2xl text-center">
      <div className="my-3 divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow">
        <div className="px-4 py-5 sm:px-6">
          <span className="px-2"><Icon kind="octopus" color="purple"></Icon> <a href="/pandapandabear">pandapandabear</a></span>
        </div>
        <div className="px-4 py-5 sm:p-6">
          <span className="px-2"><Icon kind="ghost" color="gray"></Icon> <a href="/ghostlybones">ghostlybones</a></span>
        </div>
      </div>
    </div>
  </div>


}