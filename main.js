fetch('https://eulsoo.github.io/list.json')
  .then(function (res) {
    return res.json();
  })
  .then(function (obj) {
    inOutHistory(obj);
  });

function inOutHistory(obj) {
  const ulElem = document.querySelector('.list');
  for (let i = 0; i < obj.length; i++) {
    // 1. li 만들기
    const li = document.createElement('li');
    const itemName = document.createElement('span');
    const price = document.createElement('span');
    // 2. item 값 가져와서 li에 넣기
    itemName.textContent = obj[i].item;
    price.textContent = obj[i].price;
    // 4. span > li > ul 순으로 넣음

    li.appendChild(itemName);
    li.appendChild(price);
    ulElem.appendChild(li);
  }
}
