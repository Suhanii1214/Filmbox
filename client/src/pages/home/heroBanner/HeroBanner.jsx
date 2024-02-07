import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import useFetch from '../../../hooks/useFetch'
import { useSelector } from 'react-redux'
import Img from '../../../components/lazyLoadImage/Img'
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper'

import './style.scss';

export const HeroBanner = () => {
    const [background, setBackground] = useState("")
    const [query, setQuery] = useState("")

    const { url } = useSelector((state) => state.home)

    const {data, loading} = useFetch("/movie/upcoming")

    useEffect(() => {
        const bg = url.backdrop + data?.results?.[Math.floor(Math.random()*20)]?.backdrop_path
        setBackground(bg)
    },[data])

    const navigate = useNavigate();

    const serachQueryHandler = (event) => {
        if(event.key === "Enter" && query.length > 0) {
            navigate(`/search/${query}`)
        }
    }

  return (
    <div className='heroBanner'>
        {!loading && (<div className='backdrop-img'>
            <Img src={background} />
        </div>)}

        <div className='opacity-layer'></div>
        <ContentWrapper>
            <div className='heroBannerContent'>
                <span className='title'>Welcome</span>
                <span className='subTitle'>Millions of movies, tv shows and people to discover. Explore Now</span>
                <div className='searchInput'>
                    <input
                        type='text'
                        placeholder='Search for a movie or TV show'
                        onChange={(e) => setQuery(e.target.value)}
                        onKeyUp={serachQueryHandler}
                    />
                    <button>Search</button>
                </div>
            </div>
        </ContentWrapper>
    </div>
  )
}
