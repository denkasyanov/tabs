import { updateTabCount } from "./lib/tabs"
import { updateWindowCount } from "./lib/windows"

const updateStatsAndBadge = async () => {
  const tabsCount = await updateTabCount()
  await chrome.action.setBadgeText({ text: tabsCount.toString() })

  await updateWindowCount()
}

chrome.runtime.onInstalled.addListener(updateStatsAndBadge)

chrome.tabs.onCreated.addListener(updateStatsAndBadge)
chrome.tabs.onRemoved.addListener(updateStatsAndBadge)

chrome.windows.onCreated.addListener(updateWindowCount)
chrome.windows.onRemoved.addListener(updateWindowCount)

export {}
