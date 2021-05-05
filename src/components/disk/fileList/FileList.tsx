import React from 'react';
import './fileList.scss';
import {useSelector} from 'react-redux';
import File from './file/File';
import {CSSTransition, TransitionGroup} from 'react-transition-group';

const FileList: React.FC = () => {
  const files = useSelector((state: any) => state.files.files);

  if (files.length === 0) {
    return <div className="loader">Файлы не найдены</div>;
  }

  return files.length ? (
    <div className="filelist">
      <div className="filelist__header">
        <div className="filelist__name">Название</div>
        <div className="filelist__date">Дата</div>
        <div className="filelist__size">Размер</div>
      </div>
      <TransitionGroup>
        {files.map((file: any) => (
          <CSSTransition key={file._id} timeout={500} classNames={'file'} exit={false}>
            <File file={file} />
          </CSSTransition>
        ))}
      </TransitionGroup>
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
