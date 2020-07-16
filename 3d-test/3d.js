var displacementFilter;
window.addEventListener('load', (event) => {
  const app = new PIXI.Application({
    width: window.innerWidth, height: window.innerHeight, backgroundColor: 0x1099bb, resolution: window.devicePixelRatio || 1,
  });
  document.body.appendChild(app.view);

  let img = new PIXI.Sprite.from("Liga_de_Quito.png");
  img.width = 400;
  img.height = 400;

  app.stage.addChild(img);

  let deepMap = new PIXI.Sprite.from("Deep_Map_Liga_de_Quito.jpg");
  app.stage.addChild(img);

  displacementFilter = new PIXI.filters.DisplacementFilter(deepMap);
  app.stage.filters = [displacementFilter];
});

window.onmousemove = function (e) {
  displacementFilter.scale.x = (window.innerWidth / 2 - e.clientX) / 90;
  displacementFilter.scale.y = (window.innerHeight / 2 - e.clientY) / 90;
};