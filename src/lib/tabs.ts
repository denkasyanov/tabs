export const updateTabCount = async () => {
  const tabs = await chrome.tabs.query({})
  chrome.storage.local.set({ tabCount: tabs.length })
  return tabs.length
}

export const getTabCountByWindowId = async (windowId: number) => {
  const tabs = await chrome.tabs.query({ windowId })
  return tabs.length
}

export const getTabCount = async () => {
  const result = await chrome.storage.local.get("tabCount")
  return result.tabCount || 0
}
