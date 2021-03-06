import React, { useEffect, useState, createRef } from "react";
import ProgressBar from "@ramonak/react-progress-bar";
import { Viewer } from '@toast-ui/react-editor'
import '@toast-ui/editor/dist/toastui-editor-viewer.css'
import '@toast-ui/editor/dist/theme/toastui-editor-dark.css';

import {
  HiChevronLeft,
  HiChevronRight,
  HiChevronDown,
  HiPlus,
  HiRefresh,
  HiReply,
} from "react-icons/hi";
import { FaCheck } from "react-icons/fa";
import Select from 'react-select'
import { useNavigate, Link } from "react-router-dom";

import styles from "../../css/StudentSubmitFilePage.module.scss";

const StudentSubmitView = ({ mode, isOpen }) => {
  const fileRef = createRef()
  const postId = window.location.pathname.split('/')[window.location.pathname.split('/').length - 1]
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [message, setMessage] = useState('')
  const [file, setFile] = useState([])
  const [post, setPost] = useState(null)
  const navigation = useNavigate()

  useEffect(() => {
    fetchData()
  }, [])

  async function fetchData() {
    setLoading(true)
    const data = await fetch('/api/board/v1/posts/' + postId + '/@me').then((res) => res.status === 403 ? (sessionStorage.clear() || window.location.reload()) : res.json())
    if (data.success) {
      setFile(data.data.post.files)
      setPost(data.data.post)
    }
    setLoading(false)
  }

  async function onAdd () {
    const file = fileRef.current.files[0]
    setUploading(true)
    const data = await fetch('/api/board/v1/files/@me', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        postId: parseInt(postId),
        fileName: file.name
      })
    }).then((res) => res.status === 403 ? (sessionStorage.clear() || window.location.reload()) : res.json())

    if (data.success) {
      await fetch(data.data.url, {
        method: 'PUT',
        body: file
      })
      setUploading(false)
      fetchData()
      return
    }

    setUploading(false)
    setMessage('????????? ??????????????????!')
  }

  async function onDelete (fileId) {
    setLoading(true)
    await fetch('/api/board/v1/files/' + fileId + '/@me', {
        method: 'DELETE'
    })
    setLoading(false)
    fetchData()
  }

  return (
      <div>
      {uploading && (
        <div style={{
          position: 'absolute',
          top: 0, left: 0,
          width: '100vw', height: '100vh',
          zIndex: 100, backgroundColor: '#00000099', 
          display: 'flex', justifyContent: 'center', 
          alignItems: 'center', color: 'white' }}>
            ????????? ??? ?????????...
        </div>
      )}
      {loading && (
        <div style={{
          position: 'absolute',
          top: 0, left: 0,
          width: '100vw', height: '100vh',
          zIndex: 100, backgroundColor: '#00000099', 
          display: 'flex', justifyContent: 'center', 
          alignItems: 'center', color: 'white' }}>
            ????????? ?????????...
        </div>
      )}
      <div className={isOpen === true ? styles.open_main : styles.hide_main}>
        <div className={styles.listHeader} style={mode === 'light' ? {color: '#191919'} : {color: '#fff'}}>
          <div className={styles.title}>
            ?????? ?????????/?????? ????????????/<span style={{color: '#0684c4'}}>#{postId}</span>
          </div>
        </div>
        <div className={styles.listBox}>
          <div className={styles.Box} style={mode === 'light' ? {background: '#FFF', color: '#ACB2CB'} : {background: '#2F3146', color: '#6F738E'}}>
            <div className={styles.listBoxHeader}>
              <div style={mode === 'light' ? {color: '#191919'} : {color: '#FFF'}}>?????? ??????</div>
            </div>
            <div className={styles.editor}>
            <div className={mode === 'light' ? styles.light_edit : styles.dark_edit}>
                <div>
                  <p>{post ? post.subCategory.parent.label : '?????????...'}: {post ? post.subCategory.parent.description : '?????????...'}</p>
                </div>
                <div>
                  <p>??????????????????: {post ? post.subCategory.label : '?????????...'}</p>
                </div>
                <div>
                  <p>?????? ?????????: {post ? post.subCategory.parent.manageUser.name : '?????????...'}</p>
                </div>
                <div className={styles.textarea}>
                  <p>??????</p>
                  <p style={mode === 'light' ? styles.light_text : styles.dark_text}><Viewer key={post?.content} initialValue={post ? post.content : '?????????...'} /></p>
                </div>
              <Link to={"/edit/" + postId}>?????? ??????</Link>
              </div>
            </div>
          </div>
          <div className={styles.Box} style={mode === 'light' ? {background: '#FFF', color: '#ACB2CB'} : {background: '#2F3146', color: '#6F738E'}}>
            <div className={styles.listBoxHeader}>
              <div style={mode === 'light' ? {color: '#191919'} : {color: '#FFF'}}>?????? ??????</div>
            </div>
            <div className={styles.fileoplode}>
              <div className={mode === 'light' ? styles.light_fileop : styles.dark_fileop}>
                {file.map((v) => (
                  <a style={mode === 'light' ? {color: '#ACB2CB'} : {color: '#6F738E'}} download target="_blank" href={v.url}>
                    {v.url.split('/')[v.url.split('/').length - 1]}
                  </a>
                ))}
                <div className={styles.fileBtn}>
                  <Link to={"/upload/" + postId}>?????? ??????</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentSubmitView
