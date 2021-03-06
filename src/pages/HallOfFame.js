import React, { useEffect, useState } from "react";
import ProgressBar from "@ramonak/react-progress-bar";
import { HiRefresh } from "react-icons/hi";
import styles from "../css/HallOfFame.module.scss";

const HallOfFame = ({ mode, isOpen }) => {
  const [items, setItems] = useState(null);

  useEffect(() => {
    (async () => {
      // TODO: 1년뒤에 데이터가 쌓이면 명예의 전당이 보임 (처음 1년은 안보여줌)
      setItems([])
    })()
  }, [])

  return (
    <div className={isOpen === true ? styles.open_main : styles.hide_main}>
      <div className={styles.listBox}>
        <div style={mode === "light" ? { background: "#FFFFFF" } : { background: "#2F3146" }} className={styles.Box}>
          <div className={styles.listBoxHeader}>
            <div style={mode === "light" ? { color: "#191919" } : { color: "#fff" }}>
              명예의 전당
            </div>
          </div>
          <table>
            <thead style={mode === "light" ? { background: "#F3F5F7", color: "#ACB2CB" } : { background: "#2B2E44", color: "#6F738E" }}>
              <tr>
                <td>순위</td>
                <td>이름</td>
                <td>직업</td>
                <td>기수</td>
              </tr>
              <tr>
                <td>달성률</td>
              </tr>
            </thead>
            {items === null && (
              <tbody style={mode === 'light' ? {color: '#8993A7'} : {color: '#8C8EA0'}}>
                <HiRefresh /> 랭킹을 불러오는 중입니다.
              </tbody>
            )}
            {items !== null && items?.length < 1 && (
              <tbody style={mode === 'light' ? {color: '#8993A7'} : {color: '#8C8EA0'}}>
                랭킹이 등록되지 않았습니다. (랭킹은 1년마다 갱신됩니다.)
              </tbody>
            )}
            {items !== null &&
              items?.length > 0 &&
              items.map((item, index) => {
                return (
                  <tbody key={index} style={mode === "light" ? { color: "#ACB2CB" } : { color: "#6F738E" }}>
                    <tr>
                      <td>{item.ranking}위</td>
                      <td style={mode === "light"? { color: "#8993A7" }: { color: "#8C8EA0" }}> {item.name} </td>
                      <td>{item.job}</td>
                      <td>{item.generation}기</td>
                      </tr>
                      <tr>
                      <td>
                        <span>
                          {item.achievement_rate}%
                          <ProgressBar
                            completed={item.achievement_rate}
                            height={"13px"}
                            width={"200px"}
                            labelSize={"0px"}
                            bgColor={"rgba(6, 132, 196, 0.77)"}
                            borderRadius={"3px"}
                            baseBgColor={
                              mode === "light" ? "#f1f1f1" : "#383850"
                            }/>
                        </span>
                      </td>
                    </tr>
                  </tbody>
                );
              })}
          </table>
        </div>
      </div>
    </div>
  );
};

export default HallOfFame;
