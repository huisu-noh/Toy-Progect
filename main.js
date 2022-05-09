function dayChange(date) {
  if (date === '2021-10-03') return '오늘';
  if (date === '2021-10-02') return '어제';
  if (date === '2021-10-01') return '그제';
  return date;
}

function numberComma(num, income) {
  num = num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  if (income === 'in') {
    num = `+ ${num}`;
  }
  return num;
}

function sumResult(bankList, date) {
  let sum = bankList.reduce(
    (accumulator, currentValue) => {
      if (date === currentValue.date) {
        if (currentValue.income == 'in') {
          return accumulator + currentValue.price;
        } else {
          return accumulator - currentValue.price;
        }
      } else {
        return accumulator;
      }
    },

    0
  );

  if (sum > 0) {
    sum = `${sum} 원 수입`;
    sum = sum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  } else {
    sum = `${-sum} 원 지출`;
    sum = sum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  return sum;
}

async function fetchList() {
  // josn file에서 자료 가지고 옴
  let response = await fetch(
    `https://s3.us-west-2.amazonaws.com/secure.notion-static.com/f6e4d3d3-c52c-4ea8-b665-968a3b17c5ea/bank.json?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20220509%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20220509T070905Z&X-Amz-Expires=86400&X-Amz-Signature=bdd390d590684649af20dfd5dcb29f6d75f1c96b46d99a7e28f20c187bc56e90&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22bank.json%22&x-id=GetObject`
  );
  const obj = await response.json();

  const bankList = obj.bankList.reverse();

  console.log(obj);

  let beforeDate = '';

  const divElem = document.querySelector('.onDay');
  let ulElem;

  // ul 생성 + 날짜 및 합계 li 생성  반복문
  for (let i = 0; i < bankList.length; i++) {
    if (beforeDate !== bankList[i].date) {
      // date li 생성
      ulElem = document.createElement('ul');
      ulElem.classList.add('list');

      const firstLi = document.createElement('li');
      firstLi.classList.add('day');
      const when = document.createElement('span');
      const sum = document.createElement('span');
      when.classList.add('when');
      sum.classList.add('sum');
      when.innerText = dayChange(bankList[i].date);
      sum.innerText = sumResult(bankList, bankList[i].date);

      firstLi.appendChild(when);
      firstLi.appendChild(sum);
      ulElem.appendChild(firstLi);
      divElem.appendChild(ulElem);

      beforeDate = bankList[i].date;
    }

    // item li 생성
    const li = document.createElement('li');
    li.classList.add('day');
    const itemName = document.createElement('span');
    const price = document.createElement('span');
    itemName.innerText = bankList[i].history;
    price.innerText = numberComma(bankList[i].price, bankList[i].income);
    if (bankList[i].income === 'in') price.style.color = '#FF5F00';

    li.appendChild(itemName);
    li.appendChild(price);
    ulElem.appendChild(li);
    divElem.appendChild(ulElem);
  }
}

fetchList();
