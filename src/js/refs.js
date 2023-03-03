export const refs = {
  playground: document.querySelector('#playground'),
  controller: document.querySelector('#controller'),
  controllerBtns: function () {
    return [...this.controller.children].reduce((controllerBtns, controler) => {
      controllerBtns[controler.className] = controler;

      return controllerBtns;
    }, {});
  },
  stop: document.querySelector('.stopPlayer'),
};
