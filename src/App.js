import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [data, setData] = useState([]);
  const [serverIp, setServerIp] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8000") // Django API URL
      .then((response) => {
        console.log(response.data);
        // 데이터와 서버 IP를 상태에 저장
        setData(response.data.data);
        setServerIp(response.data.server_ip);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <div>
      <h1>React App</h1>
      <p>서버 IP: {serverIp}</p>
      {data.length > 0 ? (
        <div>
          <h2>유저 목록</h2>
          <table border="1" style={{ borderCollapse: "collapse", width: "100%" }}>
            <thead>
              <tr>
                <th>ID</th>
                <th>이름</th>
                <th>나이</th>
                <th>성별</th>
                <th>지역</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item.id}>
                  <td style={{ padding: "8px", textAlign: "center" }}>{item.id}</td>
                  <td style={{ padding: "8px", textAlign: "center" }}>{item.name}</td>
                  <td style={{ padding: "8px", textAlign: "center" }}>{item.age}</td>
                  <td style={{ padding: "8px", textAlign: "center" }}>{item.gender}</td>
                  <td style={{ padding: "8px", textAlign: "center" }}>{item.region}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>데이터를 불러오는 중...</p>
      )}
    </div>
  );
}

export default App;
