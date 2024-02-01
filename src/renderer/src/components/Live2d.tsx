import { useRef, type FC, useLayoutEffect } from 'react'
import { Application } from '@pixi/app';
import { Ticker, TickerPlugin } from '@pixi/ticker';
import { InteractionManager } from '@pixi/interaction';
import { InternalModel, Live2DModel } from 'pixi-live2d-display';
import { Renderer } from '@pixi/core';
import '@pixi/unsafe-eval'

// register Ticker for Live2DModel
Live2DModel.registerTicker(Ticker);

// register Ticker for Application
Application.registerPlugin(TickerPlugin);

// register InteractionManager to make Live2D models interactive
Renderer.registerPlugin('interaction', InteractionManager);

const gitUrl = "https://cdn.jsdelivr.net/gh/levidcd/live2d-model"


const models = {
  usagi: '/usagi/usagi.model3.json',
  chiikawa: '/chiikawa/chiikawa.model3.json',
  cubism2Model: '/shizuku/shizuku.model.json',
  haru: '/haru/haru_greeter_t03.model3.json',
  wsq: '/wsq/WSQ.model3.json'
}



export async function init(dom) {

  const app = new Application({
    view: document.getElementById('canvas'),
    // 背景是否透明
    transparent: true,
    autoDensity: true,
    autoResize: true,
    antialias: true,
    backgroundAlpha: 0,
    // 高度
    height: 600,
    // 宽度
    width: 450
  });

  const url = gitUrl + models.usagi
  const model = await Live2DModel.from(url);

  // // 鼠标跟踪方法
  // model.trackedPointers = [{ id: 1, type: 'pointerdown', flags: true }, { id: 2, type: 'mousemove', flags: true }]
  // 添加模型到舞台
  app.stage.addChild(model)
  // 模型的缩放
  model.scale.set(0.2)
  // 模型的位置,x,y相较于窗口左上角
  model.x = 0
  // 添加模型状态管理器
  const a = new InternalModel(model)
  model.InternalModel = a
}

export const Live2d: FC = ({ }) => {
  const ref = useRef()
  const appRef = useRef()
  useLayoutEffect(() => {
    if (ref.current) {

      init(ref.current);
    }
  }, [appRef.current])
  return <canvas ref={ref} id='canvas'></canvas>
}
export default Live2d
