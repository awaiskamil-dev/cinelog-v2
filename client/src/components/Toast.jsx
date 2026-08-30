import useToast from '../context/ToastContext/useToast';
import './Toast.css';

const Toast = function(){
  const {toast} = useToast();
  if(!toast) return null;

  return(
    <div className={`
        toast ${toast.type === 'success' && 'toast--success'} ${toast.type === 'info'}
        ${toast.type === 'info' && 'toast--info'}
      `}
      >
      <i className={`fa-solid 
        ${toast.type === 'success' && 'fa-circle-check'}  
        ${toast.type === 'error' && 'fa-circle-xmark'}
        ${toast.type === 'info' && 'fa-circle-info'}
        `}>
      </i>
      {toast.message}
    </div>
  );
};

export default Toast;