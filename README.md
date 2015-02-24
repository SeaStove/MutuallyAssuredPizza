MutuallyAssuredPizza
====================


=======
![](http://i.imgur.com/BL7qbTF.jpg)

A project for hack mizzou 2014

This is the project made by Peter Dirks, Greg Highland, and Robert Stovall.
>>>>>>> 1efe6ddf3401fe3f57a26b32f89c5eb70764d638
The point of this project is to connect hardware inputs to an Arduino, then use the inputs given from the Arduino to order a pizza.
The Arduino sends an aray of numbers to a local node.js server (server is listening to serial port), the node.js server then builds a Selinium script to navigate the pizza website (Domino's). A selinium server is then created, the script is run, and the pizza is ordered.

ie...

  [ Arduino ] --input string--> [ node.js server ] --selenium script--> [ Selenium ]
  
##Running and troubleshooting
* [Arduino IDE](http://arduino.cc/en/main/software)
* [Node.js](http://nodejs.org/), then to install all the dependencies for this project:
```
npm install
```
* Finally, [Firefox](https://www.mozilla.org/en-US/firefox/new/) and [Selenium IDE](https://addons.mozilla.org/en-US/firefox/addon/selenium-expert-selenium-ide/)


We didn't really document our schematics for the panel wiring, so you're on your own for that.
Our project worked...most of the time. Our main issues were:
* our version of selenium needed to be slow, if it was set to go fast, it risked trying to excecute a command before the page is done loading. We could experiment with some onload command to fix this...
* Communication between the arduino and node.js server was inconsistant. We found that data was sometimes transmitted out of order. We're not sure if that was a arduino problem or a node.js problem
* Selenium is a solution, but maybe not the best solution: the way we have it working with the rest of the program is a bit akward. But, we didn't have any other experience with headless browsers. If this project would be taken further, we'd explore some node.js native headless browsers.
  
---
#File Overview

##arduino_driver.ino
C program that arduino is running. Program waits for the go (kill) switch to be flipped. When set to true, all input is read, and stored into an int array representing the whole order. Each element is then printed on the serial port. There was some wierd issues between the arduino and node.js server talking to each other, so the program waits .3 seconds between each printing action. 

Since the serial printing is in the loop portion of the program, the arduino will continue to print the array over and over as long as the go switch is TRUE. To deal with the looping, the program prints '9' between each iteration of printing the array. Not the best solution, but being that is was a hackathon, that's what worked for us.

##main.js
This was our node.js server that listened for the arduino, then built the Selenium script. Listening for the arduino was done with the 'Serialport' package. Communication between the arduino and node.js server proved to be buggy, so the server waits for a '9' to be read: this signifies the start of the input array is about to be sent over. 

Also, the arduino usb port seemed to jump around from /dev/ttyACM0 to /dev/ttyACM4, not sure what is the reason for this, but the serial port in the node.js server needs to math the one being used in the arduino ide...

After all the input is completely recieved, the server then goes through and builds a selenium script that will place the order. This script is finally saved into a file titles 'pizzapartytime.html'.

##watch.sh
This was a bit of a work around, but this shell script waits for a file 'pizzapartytime.html' to appear. When it is found, the scipt is then excecuted via command line. If the file is not found, the script sleeps for 5 seconds then tries again.
