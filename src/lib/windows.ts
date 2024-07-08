export const updateWindowCount = async () => {
  const windows = await chrome.windows.getAll()
  console.log(windows)
  chrome.storage.local.set({ windowCount: windows.length })
  return windows.length
}

export const getWindowCount = async () => {
  const result = await chrome.storage.local.get("windowCount")
  return result.windowCount || 0
}

export const getWindowId = async () => {
  const windows = await chrome.windows.getCurrent()
  return windows.id
}
