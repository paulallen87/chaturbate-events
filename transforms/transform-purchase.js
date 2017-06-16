module.exports = {
  event: 'purchase',
  selector: '.purchasealert',
  transform: (dom) => {
    const purchase = dom.find('.purchasealert');

    // TODO: actually parse this.
    return {
      message: purchase.text()
    };
  }
};