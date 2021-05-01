import React from 'react';
import './file.scss';
import dirLogo from '../../../../assets/img/dir.svg';
import fileLogo from '../../../../assets/img/file.svg';
import {useDispatch, useSelector} from 'react-redux';
import {pushToStack, setCurrentDir} from '../../../../reducers/file/fileReducer';

type FileProps = {
  file: any;
};

const File: React.FC<FileProps> = ({file}) => {
  const dispatch = useDispatch();
  const currentDir = useSelector((state: any) => state.files.currentDir);

  function openDirHandler(file: any) {
    if (file.type === 'dir') {
      dispatch(pushToStack(currentDir));
      dispatch(setCurrentDir(file._id));
    }
  }

  return (
    <div className="file" onClick={() => openDirHandler(file)}>
      <img src={file.type === 'dir' ? dirLogo : fileLogo} alt="" className="file__img" />
      <div className="file__name">{file.name}</div>
      <div className="file__date">{file.date.slice(0, 10)}</div>
      <div className="file__size">{file.size}</div>
    </div>
  );
};

export default File;
