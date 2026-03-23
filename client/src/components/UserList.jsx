// クエリにマッチした部分を <mark> で囲んで返す
function highlight(text, query) {
    if (!query || !text) return text || '';
    const regex = new RegExp(`(${query})`, 'gi');
    const parts = String(text).split(regex);
    return parts.map((part, i) =>
      part.toLowerCase() === query.toLowerCase()
        ? <mark key={i}>{part}</mark>
        : part
    );
  }
  
  function UserList({ users, query }) {
    return (
      <table>
        <thead>
          <tr>
            <th>name</th>
            <th>age</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{highlight(user.name, query)}</td>
              <td>{highlight(String(user.age ?? ''), query)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
  
  export default UserList;