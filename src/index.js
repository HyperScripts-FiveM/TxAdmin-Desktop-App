const { app, BrowserWindow, Menu, Notification, Tray } = require("electron");
function showNotification(NOTIFICATION_TITLE, NOTIFICATION_BODY) {
    new Notification({
        title: NOTIFICATION_TITLE,
        body: NOTIFICATION_BODY,
    }).show();
}

const createWindow = () => {
	const win = new BrowserWindow({
        icon: './logo.png' ,
		width: 800,
		height: 600,
		webPreferences: {
			spellcheck: true,
		},
	});
	win.loadURL("http://144.6.98.52:40120");
};



const dockMenu = Menu.buildFromTemplate([
	{
		label: "Home",
		click() {
			
			const win = new BrowserWindow();
			win.loadURL("http://144.6.98.52:40120/")
            showNotification("Page Changed", "You are now on the Home Page");
		},
	},
    {
        label: "Players",
		click() {
			const win = new BrowserWindow();
			win.loadURL("http://144.6.98.52:40120/player/list");
            showNotification("Page Changed", "You are now on the Players Page");

		},
    },
    {
        label: "Live Console",
		click() {
			const win = new BrowserWindow();
			win.loadURL("http://144.6.98.52:40120/console");
            showNotification("Page Changed", "You are now on the Server Console Page");
		},
    },
    {
        label: "Resources",
		click() {
			const win = new BrowserWindow();
			win.loadURL("http://144.6.98.52:40120/resources");
            showNotification("Page Changed", "You are now on the Resources Page");

		},
    }
]);

app.whenReady().then(() => {
	createWindow();

	if (process.platform === "darwin") {
		app.dock.setMenu(dockMenu);
	}

	app.on("activate", () => {
		if (BrowserWindow.getAllWindows().length === 0) createWindow();
	});
});

app.on("window-all-closed", () => {
	if (process.platform !== "darwin") app.quit();
});
