/*
/////////////////////////////////////////////////////////////////////////////////////////////////////////

{{ CityScopeJS }}
Copyright (C) {{ 2018 }}  {{ Ariel Noyman }}

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.

/////////////////////////////////////////////////////////////////////////////////////////////////////////

CityScopeJS -- decoding 2d array of black and white LEGO bricks, parsing and sending to remote server.
"@context": "https://github.com/CityScope/", "@type": "Person", "address": {
"@type": "75 Amherst St, Cambridge, MA 02139", "addressLocality":
"Cambridge", "addressRegion": "MA",}, 
"jobTitle": "Research Scientist", "name": "Ariel Noyman",
"alumniOf": "MIT", "url": "http://arielnoyman.com", 
"https://www.linkedin.com/", "http://twitter.com/relno",
https://github.com/RELNO]

///////////////////////////////////////////////////////////////////////////////////////////////////////
*/

import "babel-polyfill";
import { setupSVG, stats, loadImg } from "./Modules";
import { setupWebcam } from "./CV/Webcam";
import { cityIOinit, cityIOstop } from "./CITYIO/cityio";
import { datGUI } from "./UI/DATGUI";
import { webWorkerListener } from "./CV/WebWorkerListener";
import * as logo from "../media/logo.png";

//Import Storage class
import "./Storage";

async function init() {
  //UI menu
  datGUI();

  loadImg(logo.default, 80, 80, "logo");
  Storage.console = "Starting CityScopeJS applet...";
  stats();
  //declare WebWorker as global
  window.CVworker = new Worker("./CV/CVwebworker.js");

  //setup and start webcam
  setupWebcam();
  //make the UI
  setupSVG();

  //start the WW listener before initial send
  webWorkerListener();

  // [WIP] POST to cityIO rate in MS
  var sendRate = 1000;
  //make sure to clear sending from before
  cityIOstop();
  Storage.console = "starting cityIO";
  //start sending to cityIO
  cityIOinit(sendRate);
}

//start app after HTML load
window.onload = function() {
  init();
};