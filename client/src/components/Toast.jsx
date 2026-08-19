import useToast from '../context/useToast';
import './Toast.css';

const Toast = function(){
  const {toast} = useToast();
  if(!toast) return null;

  return(
    <div className={`toast ${toast.type === 'success' ? 'toast--success' : ''}`}>
      <i className={`fa-solid ${toast.type === 'success' ? 'fa-circle-check' : 'fa-circle-xmark'}`}></i>
      {toast.message}
    </div>
  );
};

export default Toast;