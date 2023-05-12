import * as PIXI from "pixi.js";
import { ShaderSystem } from "@pixi/core";
import React, { useEffect } from "react";
import "@pixi/unsafe-eval";
import { install } from "@pixi/unsafe-eval";
import { Spine } from "pixi-spine";
import "./App.css";

install({ ShaderSystem });

/**
 * 指示点击的图标
 */
const iconBase64Data =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAF8AAABgCAMAAABMvl6/AAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAJJUExURf///////////////////vv/+/3//P///wAAAP3/+/////3//P////////////v/+v///////////vv/+v///v7//fv/+v7//v3//fv/+/7//f3/+/3//P3/+////v3/+/////////7//P7//f7//fv/+/3/+/3/+/3/+v3/+/7//vv/+/7//f3//P3//Pv/+////v7/+/3//Pv//P3//P3/+/7//f7//Pv//P3/+/7//P3/+v////v/+/3/+/7//P3/+/7/+/7//v7//v7//f7//f3//P7//v3/+vv/+/v/+////v7//v7//v7//f7//f3//P7//Pv/+/////7//f3//P7//vv/+/3/+/7//P///vv/+/7//fv/+/7//f7//v3/+v///v3//f3//P7//f3/+vv/+/3/+/v/+/7//P7//v////v//P7//v7//f3//P3/+/v/+/v/+/3/+/7//P7//f3//P///vv/+/7//Pv/+/7//P///v3/+v3//P3//P7//f7//P7//P3/+/v/+/3//P7//f3/+/3/+v///v7/+/////3//P///v7//f7//Pv/+/7//f///f///v3/+/7//f7//P7//v7//P7/+////v3//P7//P7//f7/+/////v/+/v/+/7//P7//f7//f7//f7//f7/+/7/+/3//P7//P///v3//P7/+/7//f3//P7//f7//f7//f3//P7//f7//f7//P7//P7//P7//P7//f3//P3/+/7//fv/+v3/+/3/+vv/+/7/++/IWKsAAAC+dFJOU6uArISz/OOtAOt83aaLkvukqrL6tL/9utXgy/3k5brxrq/bzcj5+/L6/L/yweXn/rnf4ePm4MPf3f7X/bDz9dP64sC7z9Hcwvzr+7G5wdfF7d7xscbovPj04rX9xPbAvvu21+DK+fr57tm4su+31er49O3z4NDvB9/h5Ni49vDY09rc9/faG+zzj+EBzKmfguldnLfp1N29i+OYuUVOpaXm4XMmdhYr/uDsIpOHu1NZEGQhsS8+S7CjOApUuwXJs3/JAAAIKElEQVRo3rWah3/aSBbHtSwlxLfHHcU0mQ4BF3Aw4GCqbQwY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";

// 跳过打印LOGO
PIXI.utils.skipHello();
// 初始化PIXI
const app = new PIXI.Application({
  backgroundAlpha: 0,
  // backgroundColor: 0xffffff,
  antialias: true,
  width: 1200,
  height: 720,
});
const loader = app.loader.add(
  "https://webcnstatic.yostar.net/ba_cn_web/prod/web/pc/Arona/Arona.atlas",
  "https://webcnstatic.yostar.net/ba_cn_web/prod/web/pc/Arona/Arona.json"
);
loader.load((l, res) => {
  const spineData = res[Object.keys(res)[0]].spineData!;
  const arona = new Spine(spineData);
  arona.scale.set(0.3);
  arona.state.setAnimation(0, "idle", true);
  arona.x = 1200 / 2;
  arona.y = 620;
  app.stage.addChild(arona);
});

function App() {
  useEffect(() => {
    const aronaContainer = document.getElementById("arona-container")!;
    if (!aronaContainer.hasChildNodes()) {
      aronaContainer.appendChild(app.view);
    }
  }, []);

  return (
    <div className="arona-page">
      <div className="arona-scene-container">
        <div style={{ height: 100 }} />
        <img
          src="https://webcnstatic.yostar.net/ba_cn_web/prod/web/assets/top_bg.b6c61b76.png"
          alt=""
          className="arona-backgroud"
        />
        <div id="arona-container" className="arona-container" />
        <div className="arona-fp-icon" onClick={() => {}}>
          <img alt="" src={iconBase64Data} />
          <img alt="" src={iconBase64Data} />
        </div>
      </div>
    </div>
  );
}

export default App;
