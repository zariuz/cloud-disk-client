import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getFiles, uploadFile} from '../../api/file';
import FileList from './fileList/FileList';
import Popup from './Popup';
import {setCurrentDir, setPopupDisplay} from '../../reducers/file/fileReducer';
import './disk.scss';

const Disk: React.FC = () => {
  const dispatch = useDispatch();
  const currentDir = useSelector((state: any) => state.files.currentDir);
  const dirStack = useSelector((state: any) => state.files.dirStack);

  useEffect(() => {
    dispatch(getFiles(currentDir));
  }, [currentDir]);

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

  return (
    <div className="disk">
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
      </div>
      <FileList />
      <Popup />
    </div>
  );
};

export default Disk;