
import { BounceLoader } from 'react-spinners';

const LoaderFallback = () => {
  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <BounceLoader color="#30671a" loading size={80} />
    </div>
  );
};

export default LoaderFallback;