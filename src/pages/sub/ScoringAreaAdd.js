import React, { useEffect, useState, createRef } from "react";
import {
  HiChevronLeft,
  HiChevronRight,
  HiChevronDown,
  HiPlus,
  HiRefresh,
  HiReply,
} from "react-icons/hi";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'
import { FaChevronLeft, FaChevronRight, FaPlus, FaBackspace, FaDownload } from "react-icons/fa";
import Select from 'react-select'
import { Link } from "react-router-dom";
import styles from '../../css/ScoringAreaAdd.module.scss'

const ScoringAreaAdd = ({ mode, isOpen }) => {
  const [firstCalendar, onFirstChange] = useState(new Date());
  const [secondCalendar, onSecondChange] = useState(new Date());
  const [categories, setCategories] = useState(null)
  const [category, setCategory] = useState(null)

  function onCategoryChange (e) {
    setCategory(e.value)
    setSubcategory(null)
  }

  return (
    <div>
      <div className={isOpen === true ? styles.open_main : styles.hide_main}>
        <div className={styles.navbar} style={mode === "light" ? { background: "#F3F5F7" } : { background: "#2B2E44" }}>
          <div>
            <Link to="/" style={ mode === "light" ? { color: "#ACB2CB" } : { color: "#6F738E" }}> 
              <div>
                <FaChevronLeft size={24} />{" "}
              </div>
              돌아가기
            </Link>
          </div>
          <div>
            <button style={ mode === "light" ? { color: "#ACB2CB" } : { color: "#6F738E" }}>  
              <div>
                <FaChevronRight size={24} />{" "}
              </div>
              다음으로
            </button>
          </div>
        </div>
        <div className={styles.listHeader} style={mode === 'light' ? {color: '#191919'} : {color: '#fff'}}>
          <div className={styles.title}> 관리자 페이지/점수 영역관리/ <span style={{color: '#0684c4'}}>추가하기</span>
          </div>
        </div>
        <div className={styles.listBox}>
          <div className={styles.Box} style={mode === 'light' ? {background: '#FFF', color: '#ACB2CB'} : {background: '#2F3146', color: '#6F738E'}}>
            <div className={styles.listBoxHeader}>
              <div style={mode === 'light' ? {color: '#191919'} : {color: '#FFF'}}>
                신청하기
              </div>
            </div>
            <div className={styles.inputForm}>
              <div className={styles.first}>
              <div className={styles.name}>
                <div className={styles.type}>
                  <p>종류 이름</p>
                  <input />
                </div>
                <div className={styles.classification}>
                  <p>분류 이름</p>
                  <input />
                </div>
              </div>
              <div className={styles.maxScore}>
                <p>최대 점수</p>
                <input type='number' />
              </div>
            </div>
            <div className={styles.second}>
              <div className={styles.select}>
                <p>관리자 선택</p>
                <Select
                styles={{
                  control: (provided) => ({
                    cursor: 'pointer',
                    ...provided,
                    ...(mode == "light"
                      ? {
                          border: "1px solid #ACB2CB",
                          backgroundColor: "#F3F5F7",
                        }
                      : {
                          border: "1px solid #6F738E",
                          backgroundColor: "#2B2E44",
                        }),
                  }),
                  singleValue: (provided) => ({
                    ...provided,
                    ...(mode == "light"
                    ? { color: "#8993A7" }
                    : { color: "#8C8EA0" }),
                  }),
                  menuList: (provided) => ({
                    ...provided,
                    ...(mode == "light"
                      ? {
                        border: "1px solid #ACB2CB",
                      }
                      : {
                        border: "1px solid #6F738E",
                      }),

                  }),
                  menu: (provided) => ({
                    ...provided,
                    ...(mode == "light"
                      ? {
                        color: "black",
                        backgroundColor: "#F3F5F7",
                      }
                      : {
                        color: "white",
                        backgroundColor: "#383850",
                      }),
                  }),
                  option: (provided, state) => ({
                    ...provided,
                    zIndex: 50,
                    ...(mode == "light"
                      ? {
                        color: state.isFocused ? 'white' : "black",
                        backgroundColor: state.isFocused ? 'rgb(6, 132, 196)' :  "#F3F5F7",
                      }
                      : {
                        color: state.isFocused ? 'white' : "white",
                        backgroundColor: state.isFocused ? 'rgb(6, 132, 196)' : "#383850",
                      }),
                  }),
                  placeholder: (provided) => ({
                    ...provided,
                    ...(mode == "light"
                      ? {
                        color: '#8993A7'
                      }
                      : {
                        color: '#8C8EA0'
                      }),
                  }),
                  container: (provided) => ({
                    ...provided,
                    zIndex: 50,
                  }),
                }}
                isSearchable={false}
                onChange={onCategoryChange}
                options={categories?.map((v) => ({ value: v.categoryId, label: v.label })) || []}
                placeholder="카테고리를 선택하세요."/>
                </div>
              </div>
            </div>

            <div className={styles.btn}>
              <Link to="/">
                <button className={styles.cancelbtn} style={{ alignSelf: 'center', cursor: 'pointer', border: 'none', backgroundColor: 'gray', color: 'white', padding: 10, fontSize: 16, borderRadius: 4}}>
                  취소
                </button>
              </Link>
              <button className={styles.submitbtn} style={{ marginLeft: 10, cursor: 'pointer', alignSelf: 'center', border: 'none', backgroundColor: 'rgb(6, 132, 196)', color: 'white', padding: 10, fontSize: 16, borderRadius: 4}}>
                다음
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ScoringAreaAdd