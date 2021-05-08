import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getFiles, uploadFile} from '../../api/file';
import FileList from './fileList/FileList';
import Popup from './Popup';
import {
  setCurrentDir,
  setFileView,
  setPopupDisplay,
} from '../../reducers/file/fileReducer';
import './disk.scss';
import Uploader from './uploader/Uploader';

const Disk: React.FC = () => {
  const dispatch = useDispatch();
  const currentDir = useSelector((state: any) => state.files.currentDir);
  const loader = useSelector((state: any) => state.app.loader);
  const dirStack = useSelector((state: any) => state.files.dirStack);
  const [dragEnter, setDragEnter] = useState(false);
  const [sort, setSort] = useState('type');

  useEffect(() => {
    dispatch(getFiles(currentDir, sort));
  }, [currentDir, sort]);

  function showPopupHandler() {
    dispatch(setPopupDisplay('flex'));
  }

  function backClickHandler() {
    const backDirId = dirStack.pop();
    dispatch(setCurrentDir(backDirId));
  }

  function fileUploadHandler(event: any) {
    const files = [...event.target.files];
    files.forEach((file) => dispatch(uploadFile(file, currentDir)));
  }

  function dragEnterHandler(event: any) {
    event.preventDefault();
    event.stopPropagation();
    setDragEnter(true);
  }

  function dragLeaveHandler(event: any) {
    event.preventDefault();
    event.stopPropagation();
    setDragEnter(false);
  }

  function dropHandler(event: any) {
    event.preventDefault();
    event.stopPropagation();
    let files = [...event.dataTransfer.files];
    files.forEach((file) => dispatch(uploadFile(file, currentDir)));
    setDragEnter(false);
  }

  if (loader) {
    return (
      <div className="loader">
        <div className="lds-dual-ring"></div>
      </div>
    );
  }

  return !dragEnter ? (
    <div
      className="disk"
      onDragEnter={dragEnterHandler}
      onDragLeave={dragLeaveHandler}
      onDragOver={dragEnterHandler}>
      <div className="disk__btns">
        {currentDir && (
          <button className="disk__back" onClick={() => backClickHandler()}>
            Назад
          </button>
        )}

        <button className="disk__create" onClick={() => showPopupHandler()}>
          Создать папку
        </button>

        <div className="disk__upload">
          <label htmlFor="disk__upload-input" className="disk__upload-label">
            Загрузить файл
          </label>
          <input
            multiple={true}
            onChange={(event) => fileUploadHandler(event)}
            type="file"
            id="disk__upload-input"
            className="disk__upload-input"
          />
        </div>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="disk__select">
          <option value="name">По имени</option>
          <option value="type">По типу</option>
          <option value="date">По дате</option>
        </select>
        <button className="disk__plate" onClick={() => dispatch(setFileView('plate'))} />
        <button className="disk__list" onClick={() => dispatch(setFileView('list'))} />
      </div>
      <FileList />
      <Popup />
      <Uploader />
    </div>
  ) : (
    <div
      className="drop-area"
      onDrop={dropHandler}
      onDragEnter={dragEnterHandler}
      onDragLeave={dragLeaveHandler}
      onDragOver={dragEnterHandler}>
      Перетащите файлы сюда
    </div>
  );
};

export default Disk;
