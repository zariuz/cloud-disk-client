import React from 'react';
import './fileList.scss';
import {useSelector} from 'react-redux';
import File from './file/File';

const FileList: React.FC = () => {
  const files = useSelector((state: any) => state.files.files).map((file: any) => (
    <File key={file._id} file={file} />
  ));

  return files.length ? (
    <div className="filelist">
      <div className="filelist__header">
        <div className="filelist__name">Название</div>
        <div className="filelist__date">Дата</div>
        <div className="filelist__size">Размер</div>
      </div>
      {files}
    </div>
  ) : (
    <div className="filelist">
      <span className="filelist__empty">
        Тут пока пусто, добавьте файлы, папки или перетяните файлы прямо сюда
      </span>
    </div>
  );
};

export default FileList;
