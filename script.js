let ctx = document.getElementById("priceChart").getContext("2d");
let priceData = [];
let labels = [];

let chart = new Chart(ctx, {
  type: "line",
  data: {
    labels: labels,
    datasets: [{
      label: "BTC/USDT Price",
      data: priceData,
      borderColor: "#58a6ff",
      fill: false,
    }]
  },
  options: {
    responsive: true,
    scales: { x: { display: false } }
  }
});

// Fetch live Bitcoin prices
async function fetchPrice() {
  let res = await fetch("https://api.binance.com/api/v3/ticker/price?symbol=BTCUSDT");
  let data = await res.json();
  let price = parseFloat(data.price);

  let time = new Date().toLocaleTimeString();
  labels.push(time);
  priceData.push(price);

  if (labels.length > 20) { labels.shift(); priceData.shift(); }

  chart.update();
}

setInterval(fetchPrice, 3000);

// Trade simulator
function placeOrder(type) {
  let amount = document.getElementById("tradeAmount").value;
  let price = priceData[priceData.length - 1] || 0;
  let li = document.createElement("li");
  li.textContent = `${type.toUpperCase()} $${amount} BTC @ ${price}`;
  document.getElementById("tradeList").prepend(li);
}
