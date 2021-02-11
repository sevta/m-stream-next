import { useStoreState } from 'easy-peasy';
import { useEffect, useRef, useState } from 'react';
import YTPlayer from 'yt-player';
import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css';
import RangeSlider from 'react-bootstrap-range-slider';

export default function Player() {
  const { data } = useStoreState((state) => state.track);
  const [trackState, setTrackState] = useState('pause');
  const [volume, setVolume] = useState(50);
  const ytplayerRef = useRef(null);
  const ytplayer = useRef(null);

  useEffect(() => {
    data.id !== '' && playTrack(data);
  }, [data]);

  useEffect(() => {
    ytplayer.current?.setVolume(volume);
  }, [volume]);

  useEffect(() => {
    ytplayer.current?.pause();
  }, []);

  useEffect(() => {
    if (trackState == 'pause') {
      ytplayer.current?.play();
    }
    if (trackState == 'playing') {
      ytplayer.current?.pause();
    }
  }, [trackState]);

  function setup() {
    ytplayer.current = new YTPlayer(ytplayerRef.current, {
      width: 0,
      height: 0,
    });
    ytplayer.current.load(data.id);
    ytplayer.current.setVolume(volume);
    ytplayer.current.play();
  }

  function playTrack() {
    console.log('ytplayer', ytplayer);
    if (ytplayer.current) {
      ytplayer.current.destroy();
      setup();
    } else {
      setup();
    }
  }

  function togglePlayPause() {
    setTrackState((prev) => (prev == 'pause' ? 'playing' : 'pause'));
  }

  function renderIcon() {
    switch (trackState) {
      case 'pause':
        return (
          <svg
            className='w-10 h-10 text-pink-500'
            fill='currentColor'
            viewBox='0 0 20 20'
            xmlns='http://www.w3.org/2000/svg'>
            <path
              fillRule='evenodd'
              d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z'
              clipRule='evenodd'></path>
          </svg>
        );
      case 'playing':
        return (
          <svg
            className='w-10 h-10 text-pink-500'
            fill='currentColor'
            viewBox='0 0 20 20'
            xmlns='http://www.w3.org/2000/svg'>
            <path
              fillRule='evenodd'
              d='M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z'
              clipRule='evenodd'></path>
          </svg>
        );

      default:
        break;
    }
  }

  return (
    <div className='fixed flex bottom-0 left-0 w-full p-5 bg-gray-200'>
      <div className='flex h-full'>
        <div className='absolute -left-full' ref={ytplayerRef}></div>
        <div className='rounded-full  w-14 h-14 overflow-hidden'>
          <img
            className='rounded-full w-full h-full object-cover object-center'
            src={data.thumbnail}
            alt=''
          />
        </div>
        <div className='flex items-center ml-2'>
          <div>prev</div>
          <div className='cursor-pointer' onClick={togglePlayPause}>
            {renderIcon()}
          </div>
          <div>prev</div>
        </div>
      </div>
      <div className='flex items-center justify-center ml-4'>
        <RangeSlider
          value={volume}
          onChange={(changeEvent) => setVolume(changeEvent.target.value)}
        />
      </div>
    </div>
  );
}
