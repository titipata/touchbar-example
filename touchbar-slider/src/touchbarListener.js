var ipc = require('electron').ipcRenderer;

var slider = document.getElementById('slider1');
var slider_val = document.getElementById('sliderval');

// Receive data from tb
ipc.on('tbchange', function(event, data) {
    slider.value = data;
    slider_val.innerHTML = data.toString() + ' deg';
});

// Send back data to tb
slider.onchange = function() {
    ipc.send('dschange', slider.value);
    slider_val.innerHTML = slider.value.toString() + ' deg';
};
