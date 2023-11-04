import { GUI } from "three/addons/libs/lil-gui.module.min.js";

const gui = new GUI();
// 默认值
const config = {
  position: {
    x: 1,
    y: 100,
    z: 0,
  },
  bool: false,
  color: "#fff",
};

// 添加分组
const positionGroup = gui.addFolder("坐标");

// 收起分组
positionGroup.close();

// 添加数字选择器
positionGroup
  .add(config.position, "x", 0, 100)
  .name("x坐标")
  .step(1)
  .onChange((v) => {
    console.log("x", v);
  });

// 添加下拉列表
positionGroup
  .add(config.position, "y", [-100, 0, 100])
  .name("y坐标")
  .onChange((v) => {
    console.log("y", v);
  });

// 添加label value的下拉菜单
positionGroup
  .add(config.position, "z", {
    left: -100,
    center: 0,
    right: 100,
  })
  .name("z")
  .onChange((v) => {
    console.log("z", v);
  });

// 添加颜色选择器
gui
  .addColor(config, "color")
  .name("颜色")
  .onChange((v) => {
    console.log("color", v);
  });

// 添加单选
gui
  .add(config, "bool")
  .name("是否旋转")
  .onChange((v) => {
    console.log("bool", v);
  });
