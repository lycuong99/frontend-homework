function getSubtotal(items: { quantity: number; price: number }[]) {
  return items.reduce((total, item) => total + item.quantity * item.price, 0);
}
function getTotal(subtotal: number, taxInPercent: number) {
  return subtotal + taxInPercent * subtotal;
}

export { getSubtotal, getTotal };
