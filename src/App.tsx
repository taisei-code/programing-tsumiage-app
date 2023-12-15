import { useCallback, useEffect, useState } from "react";
import "./css/App.css";
import "./css/modal.css"
import { Kirokus } from "./types/Kirokus";
import { Today } from "./types/Today";


function App() {
  /* モーダルに表示する日付をリアルタイムで取得 */
  const dateGet = new Date();
  const date: string = dateGet.getFullYear() + "." + (dateGet.getMonth() + 1) + "." + dateGet.getDate();
  console.log(date);

  /* 記録のモックデータ */
  const kiroku1 = new Kirokus("1", "React", "Udemy入門", "3時間");
  const today1 = new Today("1", date, [kiroku1]);

  /* useStateで記録（日付け,カテゴリ、内容、時間）を管理 */
  const [kirokus, setKiroku] = useState([today1]);

  /* useStateでinputに入力された値を管理 */

  // 内容 //
  const [inputCategory, setInputCategory] = useState("");
  const [inputDetail, setInputDetail] = useState("");
  const [inputTime, setInputTime] = useState("");

  /* モーダル */
  const [isModalOpen, setIsModalOpen] = useState(false);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isModalOpen]);

  // 記録を一覧に登録する関数
  const registerKiroku = () => {
    const newKiroku = kirokus.map((kiroku) => {
      return new Today(kiroku.id, kiroku.date, [
        ...kiroku.memories,
        new Kirokus(
          (Math.random() * 10000).toString(),
          inputCategory,
          inputDetail,
          inputTime
        ),
      ]);
    });

    setKiroku(newKiroku);
    setIsModalOpen(false);
  };
  /* モーダル */

  return (
    <>
      <button className="create-button" onClick={() => setIsModalOpen(true)}>
        積み上げを記録する
      </button>
      {isModalOpen && (
        <>
          <div className="modal-bg"></div>
          <div className="modal-box">
            <p className="modal-form-title">積み上げを記録する</p>
            <button className="close-button" onClick={closeModal}>
              Close Modal
            </button>
            {kirokus.map((kiroku) => {
              return (
                <p className="create-date">
                    {kiroku.date}
                </p>
              )
            })}
            <div className="modal-form">
              <div className="modal-label">
                <label>カテゴリ</label>
                <label>内容</label>
                <label>時間</label>
              </div>
              <div className="modal-input-item">
                <input
                  type="text"
                  onChange={(e) => setInputCategory(e.target.value)}
                />
                <input
                  className="input-detail"
                  type="text"
                  value={inputDetail}
                  onChange={(e) => setInputDetail(e.target.value)}
                />
                <input
                  type="text"
                  onChange={(e) => setInputTime(e.target.value)}
                />
              </div>
              <div className="modal-button-wrapper">
                <button
                  className="button-base cancel-button"
                  onClick={closeModal}
                >
                  キャンセル
                </button>
                <button
                  className="button-base register-button"
                  onClick={registerKiroku}
                >
                  登録する
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      <ul className="kiroku-list">
        {kirokus.map((kiroku) => {
          return (
            <li key={kiroku.id}>
              <p className="date">{kiroku.date}</p>
              {kiroku.memories.map((memory) => {
                return (
                  <div key={memory.id} className="kiroku-list-item">
                    <div className="kiroku-left">
                      <p className="category">{memory.category}</p>
                      <p className="contents">{memory.contents}</p>
                    </div>
                    <p className="time">{memory.time}</p>
                  </div>
                );
              })}
            </li>
          );
        })}
        {/* <li className='kiroku-list-item'>
          <div className='kiroku-left'>
            <p className='category'>TypeScript</p>
            <p className='contents'>Udemy「超TypeScript入門」</p>
          </div>
          <p className='time'>3時間</p>
        </li> */}
      </ul>
    </>
  );
}

export default App;
