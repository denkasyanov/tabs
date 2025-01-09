import { useEffect, useState } from "react"

import Stats from "~sidepanel"

function AudioTabButton() {
  const [isSearching, setIsSearching] = useState(false)
  const [hasAudioTabs, setHasAudioTabs] = useState(false)

  // Check for audio tabs periodically
  useEffect(() => {
    const checkAudioTabs = async () => {
      const tabs = await chrome.tabs.query({ audible: true })
      setHasAudioTabs(tabs.length > 0)
    }

    // Initial check
    checkAudioTabs()

    // Set up periodic checking
    const interval = setInterval(checkAudioTabs, 1000)

    return () => clearInterval(interval)
  }, [])

  const findAudioTab = async () => {
    setIsSearching(true)
    try {
      const tabs = await chrome.tabs.query({ audible: true })
      if (tabs.length > 0) {
        await chrome.tabs.update(tabs[0].id, { active: true })
        await chrome.windows.update(tabs[0].windowId, { focused: true })
      }
    } catch (error) {
      console.error("Failed to find audio tab:", error)
    }
    setIsSearching(false)
  }

  return (
    <button
      onClick={findAudioTab}
      disabled={isSearching || !hasAudioTabs}
      className="flex w-32 flex-col rounded-lg border-2 border-gray-200 bg-slate-500 px-4 py-2 text-slate-50 hover:bg-slate-600 disabled:bg-slate-300 disabled:hover:bg-slate-300">
      {isSearching
        ? "Searching..."
        : hasAudioTabs
          ? "Go to tab with audio"
          : "No tabs with audio"}
    </button>
  )
}

function IndexPopup() {
  return (
    <div className="p-4">
      <div>
        <Stats />
      </div>
      <div className="mt-4">
        <AudioTabButton />
      </div>
    </div>
  )
}

export default IndexPopup
