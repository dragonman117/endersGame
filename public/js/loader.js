/**
 * Loader.js
 * Entry point that creates and inits our game.
 */

import {Graphics} from "/js/game/graphics.js";
import {Stage} from "/js/game/stage.js";
import {loader} from "/js/toLoad.js";

let initGame = function () {
    let startStage = Stage.genStage();
    startStage.setMap("level-1.map");
    Graphics.init(startStage);

    // Canvas is created at this point, hide for main menu


    const views = [];
    const viewMap = {};
    const addView = function (name, show, hide) {
      hide();
      views.push(name);
      viewMap[name] = {
        show: show,
        hide: hide
      };
    };
    const setVisibleView = function (name) {
      for (var i = 0; i < views.length; i++) {
        const viewName = views[i];
        viewMap[viewName].hide();
      }
      viewMap[name].show();
    };

    addView("game", () => {
      const canvas = document.getElementsByTagName("canvas")[0];
      const menu = document.getElementById("game-menu");
      startStage.resume();
      canvas.style.display = "block";
      menu.style.display = "block";
    }, () => {
      const canvas = document.getElementsByTagName("canvas")[0];
      const menu = document.getElementById("game-menu");
      startStage.pause();
      canvas.style.display = "none";
      menu.style.display = "none";
    });

    addView("main-menu", () => {
      const menu = document.getElementById("main-menu");
      menu.style.display = "block";
    }, () => {
      const menu = document.getElementById("main-menu");
      menu.style.display = "none";
    });

    addView("pause-menu", () => {
      const menu = document.getElementById("pause-menu");
      menu.style.display = "block";
    }, () => {
      const menu = document.getElementById("pause-menu");
      menu.style.display = "none";
    });

    setVisibleView("main-menu");

    const mainMenuButton = document.getElementById("main-menu-start");
    mainMenuButton.onclick = () => {
      setVisibleView("game");
    };

    const unpauseButton = document.getElementById("pause-menu-resume");
    unpauseButton.onclick = () => {
      setVisibleView("game");
    };

    const pauseButton = document.getElementById("game-menu-pause");
    pauseButton.onclick = () => {
      setVisibleView("pause-menu");
    };
};

for(let i = 0; i < loader.length; i++){
    PIXI.loader.add(loader[i][0], loader[i][1]);
}

PIXI.loader.load(initGame);
