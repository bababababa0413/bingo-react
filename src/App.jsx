import { useRef, useState } from 'react'
import Title from './components/Title'
import InputForm from './components/InputForm'
import BingoSheet from './components/BingoSheet'
import './App.css'

function App() {
  const [formData, setFormData] = useState({
    size: '4',
    rangeMin: '70',
    rangeMax: '100',
    duplicate: 'duplicate',
    rate: '5',
    participants: ['', '', '', '']
  });

  const [bingoData, setBingoData] = useState([]);

  const ref = useRef();

  // 条件を格納した配列
  const conditions =
    [
      // アーティスト
      'ミセス',
      'ヨルシカ',
      '髭男',
      'まふまふ',
      // ジャンル
      'JPOP',
      'ボカロ',
      'アニソン',
      'Vtuber',
      // 最高音
      'hiA~C',
      'hiC#~E',
      'hiF~G#',
      'hihi域'
    ];
    
  const handleChangeSelect = (i, j, e) => {
    const newBingoData = [...bingoData];

    if (e.target.value === '') {
      newBingoData[i][j].isOpen = false;
      e.target.parentElement.parentElement.style.backgroundColor = '#f8f9fa';
    } else {
      newBingoData[i][j].isOpen = true;
      e.target.parentElement.parentElement.style.backgroundColor = '#F0B9B9';

      if (checkBingo(newBingoData, i, j)) {
        ref.current.classList.add("show");

        // 5秒後にフェードアウト
        setTimeout(() => {
          overlay.classList.remove("show");
        }, 5000);
      }
    }

    setBingoData(newBingoData);
  }

  function randomNum(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function popRandomElement(arr) {
    // 配列が空ならnullを返す
    if (arr.length === 0) return null;
    let index = Math.floor(Math.random() * arr.length);
    // ランダムな要素を取り出し、削除
    return arr.splice(index, 1)[0];
  }

  function createRandomArray(size, min, max, permitDuplicate) {
    // 重複ありの場合は、そのまま配列に乱数を格納して返す
    if (permitDuplicate) {
      const randomArray = new Array();

      while (randomArray.length < size * size) {
        const num = randomNum(min, max);
        randomArray.push(num);
      }

      return randomArray;
    }

    // 重複なしの場合は、セットに乱数を格納して、配列に変換して返す
    const randomSet = new Set();

    while (randomSet.size < size * size) {
      const num = randomNum(min, max);
      randomSet.add(num);
    }

    return Array.from(randomSet);
  }

  function checkBingo(bingoData, y, x) {
    const size = bingoData[0].length;

    // 横チェック
    if (bingoData[y].every(val => val.isOpen === true)) {
      return true;
    }

    // 縦チェック
    let flag = true;
    for (let i = 0; i < size; i++) {
      if (bingoData[i][x].isOpen === false) {
        flag = false;
        break;
      }
    }
    if (flag) {
      return true;
    }

    // 斜めチェック1
    if (y === x) {
      for (let i = 0, j = 0; i < size && j < size; i++, j++) {
        if (bingoData[i][j].isOpen === false) {
          return false;
        }
      }
      return true;
    }

    // 斜めチェック2
    if (y === size - x - 1) {
      for (let i = 0, j = size - 1; i < size && j >= 0; i++, j--) {
        if (bingoData[i][j].isOpen === false) {
          return false;
        }
      }
      return true;
    }

    return false;
  }

  const createBingoSheet = (size, rangeMin, rangeMax, permitDuplicate, noConditionRate, participants) => {
    // シートに入れる値を配列で受け取る
    const randomNumbers = createRandomArray(size, rangeMin, rangeMax, permitDuplicate);
    // イテレータ作成
    const randomNumbersIterator = randomNumbers[Symbol.iterator]();

    // 縛りなしの割合に合わせて、縛り条件を配列に格納
    // 縛りなし('')を決められた分を入れて初期化し、残りの分は条件を格納した配列からランダムで選択
    const randomConditions = new Array(Math.trunc(size * size * noConditionRate / 10)).fill('');
    for (let i = randomConditions.length; i < size * size; i++) {
      randomConditions.push(conditions[randomNum(0, conditions.length - 1)]);
    }

    const newBingoData = new Array(size);
    for (let i = 0; i < size; i++) {
      newBingoData[i] = new Array(size);

      for (let j = 0; j < size; j++) {
        newBingoData[i][j] = {
          score: randomNumbersIterator.next().value,
          condition: popRandomElement(randomConditions),
          isOpen: false
        }
      }
    }

    setBingoData(newBingoData);
  }

  const handleClickGenerateButton = () => {
    if (!confirm('ビンゴシートを生成しますか？')) {
      return;
    }

    const size = parseInt(formData.size);
    const rangeMin = parseInt(formData.rangeMin);
    const rangeMax = parseInt(formData.rangeMax);
    const permitDuplicate = (formData.duplicate === 'duplicate' ? true : false);
    const noConditionRate = parseInt(formData.rate);
    const participants = [...formData.participants];

    // 入力値チェック
    if (size < 1 || size > 10 || isNaN(size)) {
      alert('サイズが不正です。');
      return;
    }
    if (rangeMin < 0 || rangeMin > 100 || isNaN(rangeMin)) {
      alert('点数の下限値が不正です。');
      return;
    }
    if (rangeMax < 0 || rangeMax > 100 || isNaN(rangeMax)) {
      alert('点数の上限値が不正です。');
      return;
    }
    if (rangeMin > rangeMax) {
      alert('点数の範囲が不正です。');
      return;
    }
    if (rangeMax - rangeMin + 1 < size * size && permitDuplicate === false) {
      alert('設定した点数の範囲では、埋めれないセルがあります。');
      return;
    }
    if (noConditionRate < 0 || noConditionRate > 100 || isNaN(noConditionRate)) {
      alert('縛りなしの割合が不正です。');
      return;
    }
    if (participants.includes('')) {
      alert('参加者を設定してください。');
      return;
    }

    createBingoSheet(size, rangeMin, rangeMax, permitDuplicate, noConditionRate, participants);
  }

  return (
    <>
      <Title title="点数ビンゴ"></Title>
      <InputForm formData={formData} setFormData={setFormData}></InputForm>
      <input type="button" id="create-button" value="生成" onClick={handleClickGenerateButton} />
      {bingoData.length !== 0 && <BingoSheet bingoData={bingoData} participants={['', ...formData.participants]} onChange={handleChangeSelect}></BingoSheet>}
      <div id="overlay" ref={ref}>
        <div id="bingo-message">BINGO!!</div>
      </div>
    </>
  );
}

export default App
