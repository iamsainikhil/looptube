/** @jsxRuntime classic */
/** @jsx jsx */
import {jsx} from 'theme-ui'
import {useRouter} from 'next/router'
import {Fragment, useState} from 'react'
import he from 'he'
import dayjs from 'dayjs'
import {BiLike, BiDislike, BiShareAlt} from 'react-icons/bi'
import {MdPlaylistAdd} from 'react-icons/md'
import formatNumber from '../utils/formatNumber'
import PlaylistModal from './PlaylistModal'
import ShareModal from './ShareModal'
import {trackGAEvent} from '../utils/googleAnalytics'

const Info = ({data, start, end}) => {
  const {asPath: URL} = useRouter()
  const [showPlaylistModal, setShowPlaylistModal] = useState(false)
  const [showShareModal, setShowShareModal] = useState(false)

  const openModal = (type) => {
    if (type === 'playlist') {
      setShowPlaylistModal(true)
    } else {
      setShowShareModal(true)
    }
    trackGAEvent(type, `clicked on ${URL} page ${type} icon`, 'icon click')
  }

  return (
    <div sx={{mx: 'auto', px: 2, maxWidth: '720px', width: '100%'}}>
      {data.items && (
        <Fragment>
          <div
            sx={{
              mt: '-0.5rem',
              mb: 2,
              display: 'flex',
              flexFlow: 'row nowrap',
              justifyContent: 'space-between',
              alignItems: 'center',
              '@media (max-width: 47.94rem)': {
                flexFlow: 'column nowrap',
                justifyContent: 'center',
              },
            }}>
            <div
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'flex-start',
                maxWidth: '70%',
                '@media (max-width: 47.94rem)': {
                  maxWidth: '100%',
                },
              }}>
              <h2
                sx={{
                  mb: 1,
                  fontSize: [2, 3],
                }}>
                {he.decode(data.items[0].snippet.title)}
              </h2>
              <p
                sx={{
                  mt: 0,
                  fontSize: [1],
                  color: 'gray',
                }}>
                {formatNumber(data.items[0].statistics.viewCount)} views |{' '}
                {dayjs(data.items[0].snippet.publishedAt).format('MMM D, YYYY')}
              </p>
            </div>
            <div
              sx={{
                display: 'flex',
                flexFlow: 'row nowrap',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              {/* <p sx={{mx: 2}}>
                  <BiLike
                    sx={{fontSize: [2], mb: '-0.2rem'}}
                    title='Likes'
                    aria-label='Likes'
                  />
                  &nbsp;
                  <span sx={{fontSize: [1]}}>
                    {formatNumber(data.items[0].statistics.likeCount)}
                  </span>
                </p> */}
              {/* <p sx={{mx: 2}}>
                  <BiDislike
                    sx={{fontSize: [2], mb: '-0.2rem'}}
                    title='Dislikes'
                    aria-label='Dislikes'
                  />
                  &nbsp;
                  <span sx={{fontSize: [1]}}>
                    {formatNumber(data.items[0].statistics.dislikeCount)}
                  </span>
                </p> */}
              <div
                sx={{
                  display: 'flex',
                  flexFlow: 'row nowrap',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                  mx: 2,
                }}>
                <BiShareAlt
                  sx={{fontSize: 3, mt: 1, cursor: 'pointer'}}
                  title='Share'
                  aria-label='Share'
                  onClick={() => {
                    openModal('share')
                  }}
                />
                <p
                  sx={{
                    fontSize: [0, 1],
                    mt: 3,
                    pt: 1,
                    mx: 1,
                    cursor: 'pointer',
                  }}
                  title='Share'
                  aria-label='Share'
                  onClick={() => {
                    openModal('share')
                  }}>
                  SHARE
                </p>
              </div>
              <div
                sx={{
                  display: 'flex',
                  flexFlow: 'row nowrap',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                  mx: 2,
                }}>
                <MdPlaylistAdd
                  sx={{fontSize: 4, mt: 1, cursor: 'pointer'}}
                  title='Add to Playlist'
                  aria-label='Add to Playlist'
                  onClick={() => {
                    openModal('playlist')
                  }}
                />
                <p
                  sx={{
                    fontSize: [0, 1],
                    mt: 3,
                    pt: 1,
                    mx: 1,
                    cursor: 'pointer',
                  }}
                  title='Add to Playlist'
                  aria-label='Add to Playlist'
                  onClick={() => {
                    openModal('playlist')
                  }}>
                  SAVE
                </p>
              </div>
            </div>
            {/* <div
              sx={{
                display: 'flex',
                flexFlow: 'row wrap',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
              }}>
              
              
            </div> */}
          </div>

          <ShareModal
            open={showShareModal}
            close={() => setShowShareModal(false)}
            url={URL}
            name={he.decode(data.items[0].snippet.title)}
          />

          <PlaylistModal
            data={data}
            start={start}
            end={end}
            open={showPlaylistModal}
            close={() => {
              setShowPlaylistModal(false)
            }}
          />
        </Fragment>
      )}
    </div>
  )
}

export default Info
