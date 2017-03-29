const { app, BrowserWindow, TouchBar } = require('electron');
const path = require('path');
const url = require('url');
const ipc = require('electron').ipcMain;

const {TouchBarButton, TouchBarLabel, TouchBarSlider} = TouchBar;

let window;

app.once('ready', () => {
  window = new BrowserWindow({
    width: 300,
    height: 400
  });
  window.loadURL('file://' + __dirname + '/index.html');

  const result = new TouchBarLabel();
  result.label = '30' + ' deg';

  const slider = new TouchBarSlider({
                                    label: 'angle',
                                    minValue: 0,
                                    maxValue: 360,
                                    value: 180,
                                    change: (val) => tbChangeHandler(val) // register event handler here!
                                    });

  const touchBar = new TouchBar([
    slider, // add slider
    result // add display for slider value but doesn't work yet
  ]);

  function tbChangeHandler(val) {
    result.label = val.toString() + ' deg'; // set label on touch bar
    window.webContents.send('tbchange', val); // send event to dom
  }

  ipc.on('dschange', (event, data) => slider.value = Number(data)); // listen for dom events

  window.setTouchBar(touchBar);
});


// Quit when all windows are closed and no other one is listening to this.
app.on('window-all-closed', () => {
    app.quit();
});
