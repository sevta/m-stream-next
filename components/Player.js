import { useStoreState } from 'easy-peasy';
import { useEffect, useRef, useState } from 'react';
import YTPlayer from 'yt-player';
import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css';
import RangeSlider from 'react-bootstrap-range-slider';
import ReactAudioPlayer from 'react-audio-player';

export default function Player() {
  const { data } = useStoreState((state) => state.track);
  const [trackState, setTrackState] = useState('pause');
  const [volume, setVolume] = useState(50);
  const [duration, setDuration] = useState(0);
  const [tick, setTick] = useState(0);
  const [seekTo, setSeekTo] = useState(0);
  const ytplayerRef = useRef(null);
  const ytplayer = useRef(null);
  const audioPlayer = useRef(null);
  const [audioPlayerState, setAudioPlayerState] = useState({
    src: '',
    currentTime: 0,
  });

  useEffect(() => {
    data.id !== '' && playTrack(data);
  }, [data]);

  useEffect(() => {
    ytplayer.current?.setVolume(volume);
    if (audioPlayer.current) {
      let _vol = volume / 100;
      console.log(_vol);
      audioPlayer.current.volume = _vol;
    }
  }, [volume]);

  useEffect(() => {
    ytplayer.current?.pause();
  }, []);

  useEffect(() => {
    if (trackState == 'pause') {
      ytplayer.current?.play();
      audioPlayer.current?.play();
    }
    if (trackState == 'playing') {
      ytplayer.current?.pause();
      audioPlayer.current?.pause();
    }
  }, [trackState]);

  useEffect(() => {}, [tick]);

  function ytsetup() {
    ytplayer.current = new YTPlayer(ytplayerRef.current, {
      width: 0,
      height: 0,
    });
    ytplayer.current.load(data.id);
    ytplayer.current.setVolume(volume);
    ytplayer.current.play();
    ytplayer.current.on('playing', () => {
      setDuration(ytplayer.current.getDuration());
    });
    ytplayer.current.on('timeupdate', () => {
      let currentTime = ytplayer.current.getCurrentTime();
      setTick(currentTime);
    });
  }

  function playTrack(data) {
    audioPlayer.current?.pause();
    ytplayer.current?.destroy();
    if (data.type == 'youtube') {
      ytsetup();
    } else if (data.type == 'spotify') {
      audioPlayer.current.src = data.previewUrl;
      audioPlayer.current.volume = volume / 100;
      audioPlayer.current.play();
      setDuration(audioPlayer.current.duration);
      audioPlayer.current.ontimeupdate = () => {
        let _tick = audioPlayer.current.currentTime;

        setTick(_tick);
      };
    }
  }

  function togglePlayPause() {
    setTrackState((prev) => (prev == 'pause' ? 'playing' : 'pause'));
  }

  function rewind() {
    let seekTo = tick - 3;
    if (seekTo !== 0 && seekTo > 0) ytplayer.current?.seek(seekTo);
  }

  function fastForward() {
    let seekTo = tick + 3;
    ytplayer.current?.seek(seekTo);
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
        <div className='absolute -left-full'>
          <ReactAudioPlayer
            controls
            ref={(element) => (audioPlayer.current = element?.audioEl?.current)}
          />
        </div>
        <div className='rounded-full  w-14 h-14 overflow-hidden'>
          <img
            className='rounded-full w-full h-full object-cover object-center'
            src={data.thumbnail}
            alt=''
          />
        </div>
        <div className='flex items-center ml-2'>
          <div className='cursor-pointer' onClick={rewind}>
            <svg
              className='w-6 h-6'
              fill='currentColor'
              viewBox='0 0 20 20'
              xmlns='http://www.w3.org/2000/svg'>
              <path d='M8.445 14.832A1 1 0 0010 14v-2.798l5.445 3.63A1 1 0 0017 14V6a1 1 0 00-1.555-.832L10 8.798V6a1 1 0 00-1.555-.832l-6 4a1 1 0 000 1.664l6 4z'></path>
            </svg>
          </div>
          <div className='cursor-pointer' onClick={togglePlayPause}>
            {renderIcon()}
          </div>
          <div className='cursor-pointer' onClick={fastForward}>
            <svg
              className='w-6 h-6'
              fill='currentColor'
              viewBox='0 0 20 20'
              xmlns='http://www.w3.org/2000/svg'>
              <path d='M4.555 5.168A1 1 0 003 6v8a1 1 0 001.555.832L10 11.202V14a1 1 0 001.555.832l6-4a1 1 0 000-1.664l-6-4A1 1 0 0010 6v2.798l-5.445-3.63z'></path>
            </svg>
          </div>
        </div>
      </div>
      <div className='flex items-center justify-center ml-4'>
        <RangeSlider
          value={volume}
          onChange={(changeEvent) => setVolume(changeEvent.target.value)}
        />
      </div>
      <div className='flex flex-1 items-center justify-center ml-4'>
        <RangeSlider
          value={tick}
          style={{ width: '100%' }}
          max={duration}
          className='w-full'
          onChange={(changeEvent) => setTick(changeEvent.target.value)}
        />
      </div>
    </div>
  );
}
