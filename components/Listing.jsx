/** @jsxRuntime classic */
/** @jsx jsx */
import {jsx, useThemeUI} from 'theme-ui'
import styled from '@emotion/styled'
import {default as NextLink} from 'next/link'
import VideoDetails from './VideoDetails'

const Listing = ({data}) => {
  const {theme} = useThemeUI()

  const GridLayout = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, 325px);
    grid-template-rows: auto;
    grid-gap: 1.25rem;
    justify-content: center;
    margin: auto;
    @media (max-width: ${theme.breakpoints[0]}) {
      grid-template-columns: 1fr;
    }
  `

  const VideoCard = styled.div`
    display: grid;
    grid-template-columns: 325px;
    grid-template-rows: 200px auto;
    grid-gap: 0;
    margin: 0 auto;
    border-radius: 25px;
    cursor: pointer;
    box-shadow: inset -5px -5px 12px ${theme.colors.shade1},
      inset 5px 5px 12px ${theme.colors.shade2};
  `
  return (
    <GridLayout>
      {data.items.map((item, index) => (
        <NextLink
          href={{
            pathname: '/video',
            query: {id: item.id.videoId},
          }}
          key={index}>
          <VideoCard>
            <VideoDetails data={item} />
          </VideoCard>
        </NextLink>
      ))}
    </GridLayout>
  )
}

export default Listing