import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getFiles} from '../../api/file';
import FileList from './fileList/FileList';
import Popup from './Popup';
import {setPopupDisplay} from '../../reducers/file/fileReducer';
import './disk.scss';

const Disk: React.FC = () => {
  const dispatch = useDispatch();
  const currentDir = useSelector((state: any) => state.files.currentDir);

  useEffect(() => {
    dispatch(getFiles(currentDir));
  }, [currentDir]);

  function showPopupHandler() {
    dispatch(setPopupDisplay('flex'));
  }

  return (
    <div className="disk">
      <div className="disk__btns">
        <button className="disk__back">Назад</button>
        <button className="disk__create" onClick={() => showPopupHandler()}>
          Создать папку
        </button>
      </div>
      <FileList />
      <Popup />
    </div>
  );
};

export default Disk;
