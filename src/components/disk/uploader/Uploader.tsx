import React from 'react';
import UploadFile from './UploadFile';
import './uploader.scss';
import {useDispatch, useSelector} from 'react-redux';
import {hideUploader} from '../../../reducers/upload/uploadReducer';

const Uploader: React.FC = () => {
  const files = useSelector((state: any) => state.upload.files);
  const isVisible = useSelector((state: any) => state.upload.isVisible);
  const dispatch = useDispatch();

  return (
    isVisible && (
      <div className="uploader">
        <div className="uploader__header">
          <div className="uploader__title">Загрузки</div>
          <button className="uploader__close" onClick={() => dispatch(hideUploader())}>
            X
          </button>
        </div>
        {files.map((file: any) => (
          <UploadFile key={file.id} file={file} />
        ))}
      </div>
    )
  );
};

export default Uploader;
