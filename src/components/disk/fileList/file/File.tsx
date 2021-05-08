import React from 'react';
import './file.scss';
import dirLogo from '../../../../assets/img/dir.svg';
import fileLogo from '../../../../assets/img/file.svg';
import {useDispatch, useSelector} from 'react-redux';
import {pushToStack, setCurrentDir} from '../../../../reducers/file/fileReducer';
import {deleteFile, downloadFile} from '../../../../api/file';
import {sizeFormat} from '../../../../utils/sizeFormat';

type FileProps = {
  file: any;
};

const File: React.FC<FileProps> = ({file}) => {
  const dispatch = useDispatch();
  const currentDir = useSelector((state: any) => state.files.currentDir);
  const fileView = useSelector((state: any) => state.files.view);

  function openDirHandler(file: any) {
    if (file.type === 'dir') {
      dispatch(pushToStack(currentDir));
      dispatch(setCurrentDir(file._id));
    }
  }

  function downloadClickHandler(e: any) {
    e.stopPropagation();
    downloadFile(file);
  }

  function deleteClickHandler(e: any) {
    e.stopPropagation();
    dispatch(deleteFile(file));
  }

  if (fileView === 'list') {
    return (
      <div className="file" onClick={() => openDirHandler(file)}>
        <img
          src={file.type === 'dir' ? dirLogo : fileLogo}
          alt=""
          className="file__img"
        />
        <div className="file__name">{file.name}</div>
        <div className="file__date">{file.date.slice(0, 10)}</div>
        <div className="file__size">{sizeFormat(file.size)}</div>
        {file.type !== 'dir' && (
          <button
            onClick={(e) => downloadClickHandler(e)}
            className="file__btn file__download">
            download
          </button>
        )}
        <button onClick={(e) => deleteClickHandler(e)} className="file__btn file__delete">
          delete
        </button>
      </div>
    );
  }

  if (fileView === 'plate') {
    return (
      <div className="file-plate" onClick={() => openDirHandler(file)}>
        <img
          src={file.type === 'dir' ? dirLogo : fileLogo}
          alt=""
          className="file-plate__img"
        />
        <div className="file-plate__name">{file.name}</div>
        <div className="file-plate__btns">
          {file.type !== 'dir' && (
            <button
              onClick={(e) => downloadClickHandler(e)}
              className="file-plate__btn file-plate__download">
              download
            </button>
          )}
          <button
            onClick={(e) => deleteClickHandler(e)}
            className="file-plate__btn file-plate__delete">
            delete
          </button>
        </div>
      </div>
    );
  }

  return <div>File</div>;
};

export default File;
