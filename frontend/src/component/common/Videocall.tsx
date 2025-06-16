import React, { useEffect, useRef } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import { useSelector } from 'react-redux';
import type { RootState } from '../../app/store';

function Meetingroom() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const videocontainerRef = useRef<HTMLDivElement | null>(null);

  const role = params.get('role');
  const userId = params.get('userId');
  const roomId = window.location.pathname.split('/video/')[1]?.split('?')[0] || 'default';

  const user = useSelector((state: RootState) => state.user.userInfo);
  const doctor = useSelector((state: RootState) => state.doctor.doctorInfo);

  useEffect(() => {
    if (!role || !userId) {
      navigate('/login');
    } else if (role === 'user' && !user?._id) {
      navigate('/login');
    } else if (role === 'doctor' && !doctor?._id) {
      navigate('/doctor/login');
    }
  }, [role, userId, user, doctor, navigate]);

  const mymeeting = () => {
    const appID = 704835633;
    const serverSecret = 'a349c1095b022eafdb7d770fdd9dd942';
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID,
      serverSecret,
      roomId,
      Date.now().toString(),
      `${role}-${userId}`
    );

    const zp = ZegoUIKitPrebuilt.create(kitToken);
    zp.joinRoom({
      container: videocontainerRef.current,
      sharedLinks: [
        {
          name: 'Personal link',
          url:
            window.location.protocol +
            '//' +
            window.location.host +
            window.location.pathname +
            window.location.search,
        },
      ],
      scenario: {
        mode: ZegoUIKitPrebuilt.OneONoneCall,
      },
    });
  };

  useEffect(() => {
    if (
      (role === 'user' && user?._id === userId) ||
      (role === 'doctor' && doctor?._id === userId)
    ) {
      mymeeting();
    }
  }, [role, userId, user, doctor]);

  return <div ref={videocontainerRef} />;
}

export default Meetingroom;
