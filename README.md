# Tabs

Chrome extension for counting open tabs and windows.

[![UV4C4ybeBTsZt43U4xis](https://github.com/denkasyanov/tabs/assets/34678129/2a1923c1-5cfa-4588-9e47-c66ce7877218)](https://chromewebstore.google.com/detail/tabs-%C2%B7-count-tabs-and-win/jkofdipdkamnoabbchfggdkahnhdaeel)

Features:
· Counts tabs in current window
· Counts total tabs across all windows
· Counts total open windows
· Displays information in popup or sidebar

## Development

First, run the development server:

```bash
pnpm dev
# or
npm run dev
```

Open your browser and load the appropriate development build. For example, if you are developing for the chrome browser, using manifest v3, use: `build/chrome-mv3-dev`.

You can start editing the popup by modifying `popup.tsx`. It should auto-update as you make changes. To add an options page, simply add a `options.tsx` file to the root of the project, with a react component default exported. Likewise to add a content page, add a `content.ts` file to the root of the project, importing some module and do some logic, then reload the extension on your browser.

For further guidance, [visit Plasmo Documentation](https://docs.plasmo.com/)

## Making production build

Run the following:

```bash
pnpm build
# or
npm run build
```

This should create a production bundle for the extension, ready to be zipped and published to the stores.
