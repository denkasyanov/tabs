import React, { useEffect, useState } from "react"

import { getTabCount, getTabCountByWindowId } from "~lib/tabs"
import { getWindowCount, getWindowId } from "~lib/windows"

import "~style.css"

const useTabCount = () => {
  const [totalTabCount, setTotalTabCount] = useState(0)

  useEffect(() => {
    const fetchTabCount = async () => {
      try {
        setTotalTabCount(await getTabCount())
      } catch (error) {
        console.error("Failed to fetch tab count:", error)
      }
    }

    fetchTabCount()

    const listener = (changes, area) => {
      if (area === "local" && "tabCount" in changes) {
        setTotalTabCount(changes.tabCount.newValue)
      }
    }

    chrome.storage.onChanged.addListener(listener)

    return () => chrome.storage.onChanged.removeListener(listener)
  }, [])

  return totalTabCount
}

const useWindowCount = () => {
  const [windowCount, setWindowCount] = useState(0)

  useEffect(() => {
    const fetchWindowCount = async () => {
      try {
        setWindowCount(await getWindowCount())
      } catch (error) {
        console.error("Failed to fetch window count:", error)
      }
    }

    fetchWindowCount()

    const listener = (changes, area) => {
      if (area === "local" && "windowCount" in changes) {
        setWindowCount(changes.windowCount.newValue)
      }
    }

    chrome.storage.onChanged.addListener(listener)

    return () => chrome.storage.onChanged.removeListener(listener)
  }, [])

  return windowCount
}

const useCurrentWindowData = () => {
  const [windowId, setWindowId] = useState(null)
  const [currentWindowTabCount, setCurrentWindowTabCount] = useState(0)

  useEffect(() => {
    const getDataForCurrentWindow = async () => {
      try {
        const id = await getWindowId()
        setWindowId(id)

        const tabCount = await getTabCountByWindowId(id)
        setCurrentWindowTabCount(tabCount)
      } catch (error) {
        console.error("Failed to fetch current window data:", error)
      }
    }

    getDataForCurrentWindow()

    chrome.tabs.onCreated.addListener(getDataForCurrentWindow)
    chrome.tabs.onRemoved.addListener(getDataForCurrentWindow)

    return () => {
      chrome.tabs.onCreated.removeListener(getDataForCurrentWindow)
      chrome.tabs.onRemoved.removeListener(getDataForCurrentWindow)
    }
  }, [])

  return { windowId, currentWindowTabCount }
}

const TabsHelpTooltip = () => {
  const [showTooltip, setShowTooltip] = useState(false)

  return (
    <div>
      <div
        className="relative flex h-5 w-5 rounded-full border-2 border-slate-300 text-slate-300"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}>
        <div className="absolute left-1/2 top-1/2 m-auto -translate-x-1/2 -translate-y-1/2">
          <span>?</span>
        </div>
      </div>
      {showTooltip && (
        <div className="absolute bottom-full left-1/2 mb-2 -translate-x-1/2 whitespace-nowrap rounded-lg bg-slate-700 px-3 py-2 text-sm text-white shadow-lg">
          Current window / Total
          <div className="absolute left-1/2 top-full -translate-x-1/2 border-8 border-transparent border-t-slate-700"></div>
        </div>
      )}
    </div>
  )
}

function Stats() {
  const totalTabCount = useTabCount()
  const windowCount = useWindowCount()
  const { currentWindowTabCount } = useCurrentWindowData()

  return (
    <div className="flex flex-row items-baseline gap-4">
      <div className="relative flex w-32 flex-col rounded-lg border-2 border-gray-200 bg-slate-500 px-4 pb-6 pt-2 text-slate-50">
        <p className="whitespace-nowrap text-3xl">
          {currentWindowTabCount}
          <span className="scale inline-block origin-bottom-left -translate-y-1 scale-50 text-slate-300">
            <span className="mr-1">/</span>
            {totalTabCount}
          </span>
        </p>
        <p className="text-sm leading-3 text-slate-300">
          tab{currentWindowTabCount > 1 ? "s" : ""}
        </p>
        <div className="absolute bottom-3 right-4">
          <TabsHelpTooltip />
        </div>
      </div>
      <div className="flex w-32 flex-col rounded-lg border-2 border-gray-200 bg-slate-500 px-4 pb-6 pt-2 text-slate-50">
        <p className="text-3xl">{windowCount}</p>
        <p className="text-sm leading-3 text-slate-300">
          window{windowCount > 1 ? "s" : ""}
        </p>
      </div>
    </div>
  )
}

export default Stats
