import React,{useEffect,useRef} from 'react'
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';


function Meetingroom() {
  const roomId='1234'
 const videocontainerRef = useRef<HTMLDivElement| null>(null);
  const mymeeting=()=>{
       const appID = 704835633;
      const serverSecret = "a349c1095b022eafdb7d770fdd9dd942";
      const kitToken =  ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, roomId, Date.now().toString(),'your name');
        const zp = ZegoUIKitPrebuilt.create(kitToken);

        zp.joinRoom({
        container:videocontainerRef.current,
        sharedLinks: [
          {
            name: 'Personal link',
            url:
             window.location.protocol + '//' + 
             window.location.host + window.location.pathname 
          },
        ],
        scenario: {
          mode: ZegoUIKitPrebuilt.OneONoneCall, // To implement 1-on-1 calls, modify the parameter here to [ZegoUIKitPrebuilt.OneONoneCall].
        },
      });
  }
  useEffect(()=>{
  mymeeting()
  },[])
  return (
    <div ref={videocontainerRef}></div>
  )
}

export default Meetingroom