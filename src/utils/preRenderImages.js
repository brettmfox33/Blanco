/**
 * Ghost images for HTML5 drag and drop need to be pre-rendered or else they don't
 * show up the first time they are needed.
 *
 * I tried rendering them dynamically but it doesn't solve the issue. Hard coding seems to work.
 **/
export default function preRenderImages() {
  // BLUE
  let dragImage = new Image();
  dragImage.src = require(`../images/tiles/ghost/1/blue.png`);

  dragImage = new Image();
  dragImage.src = require(`../images/tiles/ghost/2/blue.png`);

  dragImage = new Image();
  dragImage.src = require(`../images/tiles/ghost/3/blue.png`);

  dragImage = new Image();
  dragImage.src = require(`../images/tiles/ghost/4/blue.png`);

  dragImage = new Image();
  dragImage.src = require(`../images/tiles/ghost/5/blue.png`);

  // BLACK
  dragImage.src = require(`../images/tiles/ghost/1/black.png`);

  dragImage = new Image();
  dragImage.src = require(`../images/tiles/ghost/2/black.png`);

  dragImage = new Image();
  dragImage.src = require(`../images/tiles/ghost/3/black.png`);

  dragImage = new Image();
  dragImage.src = require(`../images/tiles/ghost/4/black.png`);

  dragImage = new Image();
  dragImage.src = require(`../images/tiles/ghost/5/black.png`);

  // PURPLE
  dragImage.src = require(`../images/tiles/ghost/1/purple.png`);

  dragImage = new Image();
  dragImage.src = require(`../images/tiles/ghost/2/purple.png`);

  dragImage = new Image();
  dragImage.src = require(`../images/tiles/ghost/3/purple.png`);

  dragImage = new Image();
  dragImage.src = require(`../images/tiles/ghost/4/purple.png`);

  dragImage = new Image();
  dragImage.src = require(`../images/tiles/ghost/5/purple.png`);

  // RED
  dragImage.src = require(`../images/tiles/ghost/1/red.png`);

  dragImage = new Image();
  dragImage.src = require(`../images/tiles/ghost/2/red.png`);

  dragImage = new Image();
  dragImage.src = require(`../images/tiles/ghost/3/red.png`);

  dragImage = new Image();
  dragImage.src = require(`../images/tiles/ghost/4/red.png`);

  dragImage = new Image();
  dragImage.src = require(`../images/tiles/ghost/5/red.png`);

  // YELLOW
  dragImage.src = require(`../images/tiles/ghost/1/yellow.png`);

  dragImage = new Image();
  dragImage.src = require(`../images/tiles/ghost/2/yellow.png`);

  dragImage = new Image();
  dragImage.src = require(`../images/tiles/ghost/3/yellow.png`);

  dragImage = new Image();
  dragImage.src = require(`../images/tiles/ghost/4/yellow.png`);

  dragImage = new Image();
  dragImage.src = require(`../images/tiles/ghost/5/yellow.png`);

}