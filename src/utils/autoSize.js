// 适配方案
export function autoSize() {
    //设计稿的宽度
    let psdWidth = 750;
  
    //预设字体值
    let preFontSize = 100;
  
    //当前屏幕宽度
    let curScreenWidth = document.documentElement.clientWidth;
    //当前屏幕对应的html字体值
    let curFontSize = (curScreenWidth * preFontSize) / psdWidth;
  
    //设备宽度在750px 
    if (curScreenWidth > 750) {
      curScreenWidth = 750;
    }
    console.log(2222)
    //把计算下来的当前屏幕html字体值 赋值给html元素 documentElement属性会获取到html根元素 然后为之设置字体值
    document.documentElement.style.fontSize = curFontSize + "px";
  }
  