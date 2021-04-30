import axios from 'axios';
import {setFiles} from '../reducers/file/fileReducer';

export function getFiles(dirId: any) {
  return async (dispatch: any) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/files${dirId ? '?parent=' + dirId : ''}`,
        {
          headers: {Authorization: `Bearer ${localStorage.getItem('token')}`},
        },
      );
      dispatch(setFiles(response.data));
    } catch (e) {
      alert(e.response.data.message);
    }
  };
}
