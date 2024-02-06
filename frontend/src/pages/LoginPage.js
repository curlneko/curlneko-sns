import Main from "../components/login/Main";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

//APIでデータを取得

export default function LoginPage() {
  //   const navigate = useNavigate();

  //   const [isLogined, setIsLogined] = useState(false);
  //   const url = "http://localhost:8083/auth/verify";

  //JWTを取得
  //   const jwtToken =
  //     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwibmFtZSI6Im5la28iLCJlbWFpbCI6InRlc3RjYXRAY2F0LmNvbSIsImV4cCI6MTcwNzIwNTIzOSwiaWF0IjoxNzA3MjAxNjM5fQ.WH8wkllfKSoIKK73vpcDleoqEDGl9umDM5HwRCOpcNA";

  //   if (jwtToken.length === 0) {
  //     return <Main />;
  //   }else{
  //     navigate("/contact");
  //     return;
  //   };

  //   useEffect(() => {
  //     fetch(url, { method: "GET" })
  //       .then((res) => res.json())
  //       .then((data) => {
  //         setIsLogined(true);
  //       })
  //       .catch((err) => {
  //         //
  //       });
  //   }, []);

  return <Main />;
}
