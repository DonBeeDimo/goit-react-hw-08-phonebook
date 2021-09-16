import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import s from './LoaderComponent.module.css';

export default function LoaderComponent() {
  return (
    <div className={s.overlay}>
      <Loader type="ThreeDots" color="#ff0000" height="32" />
    </div>
  );
}
