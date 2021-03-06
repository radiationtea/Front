import React, { useEffect, useState } from "react";
import useSessionStorage from "../components/UseSessionStorage"
import ProgressBar from "@ramonak/react-progress-bar";
import { Link } from "react-router-dom";
import {
  HiChevronLeft,
  HiChevronRight,
  HiChevronDown,
  HiPlus,
  HiRefresh,
  HiReply,
  HiSearch,
  HiCheck,
  HiTrash,
  HiPencil
} from "react-icons/hi";
import { FaCheck, FaPlus, FaTrashAlt } from "react-icons/fa";
import Select from "react-select";
import styles from "../css/AccountList.module.scss";
import StudentSubmitPage from "./sub/StudentSubmitPage"

const ScoringArea = ({ mode, isOpen, page, onChangePage }) => {
  const [lists, setLists] = useSessionStorage("lists", 1)
  const [titles, setTitles] = useSessionStorage("titles", 1)
  const [fullChecked, setFullchecked] = useState(false);
  const [items, setItems] = useState(null);

  useEffect(() => {
    fetchData()
  }, [])
  
  const fetchData = async () => {
    const res = await fetch('/api/auth/v1/roles')
      .then((res) => res.json())
    
    setItems(res.data.map((v) => ({
      keys: v.roleid,
      name: v.label,
      id: v.userid
    })))
  }

  const onCheck = (index) => () => {
    items[index].checked = !items[index].checked;
    setItems([...items]);
    setFullchecked(false);
  };

  const onFullCheck = () => {
    setItems([...items.map((v) => ({ ...v, checked: !fullChecked }))]);
    setFullchecked(!fullChecked);
  };
  
  const onDelete = () => {
    const todo = items.filter((v) => v.checked)

    if (!confirm('다음 역할을 삭제 할까요? (되돌릴 수 없습니다): \n' + todo.map((v) => v.name).join(', '))) {
      return
    }

    for (const item of todo) {
      fetch('/api/auth/v1/roles?roleId=' + item.keys, {
        method: 'DELETE'
      }).then(fetchData)
    }
  }

  return (
    <>
      <div className={styles.navbar} style={mode === 'light' ? {background: '#F3F5F7'} : {background: '#2B2E44'}}>
        <div>
          <a href="" style={mode === 'light' ? {color: '#ACB2CB'} : {color: '#6F738E'}}>
            <div>
              <FaPlus style={{ position: "relative", top: "3px" }} size={22} />{" "}
            </div>
            역할 등록하기
          </a>
          <a href="" style={mode === 'light' ? {color: '#ACB2CB'} : {color: '#6F738E'}}>
            <div>
              <FaTrashAlt style={ { position: "relative", top: "3px" }} size={22} />{" "}
            </div>
            역할 삭제하기
          </a>
        </div>
      </div>
      <div style={
          mode === "light"
            ? { background: "#FFFFFF" }
            : { background: "#2F3146" }
          }
          className={styles.Box}>
        <div className={styles.listBoxHeader}>
          <div
            style={
              mode === "light" ? { color: "#191919" } : { color: "#fff" }
            }>
            역할관리
          </div>
          <div className={styles.div}>
            <button onClick={() => onChangePage(8)}>
              <HiPlus
                style={{ position: "relative", top: "2px" }}
                size={18}
              />{" "}
              역할 추가하기
            </button>
            <button onClick={onDelete}>
              <HiTrash
                style={{ position: "relative", top: "2px" }}
                size={18}
              />{" "}
              삭제하기
            </button>
          </div>
        </div>
        <table>
          <thead
            style={
              mode === "light"
                ? { background: "#F3F5F7", color: "#ACB2CB" }
                : { background: "#2B2E44", color: "#6F738E" }
            }
          >
            <tr>
              <td className={styles.checkBox}>
                <div>
                  <input
                    checked={fullChecked}
                    onChange={onFullCheck}
                    type="checkbox"
                    id="ckeckBox"
                  />
                  <label
                    htmlFor="ckeckBox"
                    className={
                      mode === "light" ? styles.light_ck : styles.dark_ck
                    }
                  >
                    <HiCheck size={18} />
                  </label>
                </div>
              </td>
              <td className={styles.keys}>
                아이디
              </td>
              <td className={styles.name}>역할</td>
              <td className={styles.id}>유저아이디</td>
            </tr>
          </thead>
          {items === null && (
              <tbody style={ mode === "light" ? { color: "#ACB2CB" } : { color: "#6F738E" }}>
                <tr>
                  <td>
                    역할 목록을 불러오는 중 입니다.
                  </td>
                </tr>
              </tbody>
          )}
          {items !== null && items.length < 1 && (
              <tbody style={ mode === "light" ? { color: "#ACB2CB" } : { color: "#6F738E" }}>
                <tr>
                  <td>
                    역할 리스트가 비어있습니다
                  </td>
                </tr>
              </tbody>
          )}
          {items !== null && items.map((item, index) => {
            return (
              <tbody key={index} style={ mode === "light" ? { color: "#ACB2CB" } : { color: "#6F738E" }}>
                <tr>
                  <td className={styles.checkBox}>
                    <div>
                      <input type="checkbox" onChange={onCheck(index)} checked={item.checked} id={index}/>
                      <label htmlFor={index} className={ mode === "light" ? styles.light_ck : styles.dark_ck }>
                        <HiCheck size={18} />
                      </label>
                    </div>
                  </td>{" "}
                  <td className={styles.keys} style={ mode === "light" ? { color: "#8993A7" } : { color: "#8C8EA0" }}>
                    <span>{item.keys}</span>
                  </td>
                  <td className={styles.name}>
                    {item.name}
                  </td>
                  <td className={styles.id}>
                    {item.id}
                  </td>
                </tr>
              </tbody>
            );
          })}
        </table>
      </div>
    </>
  );
};

export default ScoringArea;
