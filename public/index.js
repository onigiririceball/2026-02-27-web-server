// public/index.js
window.addEventListener('DOMContentLoaded', (event) => {
    // ユーザー名をクリックしたらアラートを表示
    document.querySelectorAll('.user-name').forEach((elem) => {
      elem.addEventListener('click', (event) => {
        alert(event.target.innerHTML);
      });
    });

    // 送信ボタンをクリックしたらユーザー名を送信
    document.querySelector('.send-button').addEventListener('click', (event) => {
        const inputName = document.querySelector('.input-name').value;
        const inputAge = document.querySelector('.input-age').value;
        if (!inputName || !inputAge) {
            alert('name and age are required');
            return;
        }
        fetch('/api/user', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name: inputName, age: inputAge }) })
    });

    // 検索ボタンをクリックしたら検索結果を表示
    document.querySelector('.search-button').addEventListener('click', (event) => {
        const query = document.querySelector('.search').value;
        location.href = `/search?query=${query}`;
    })
    
  });