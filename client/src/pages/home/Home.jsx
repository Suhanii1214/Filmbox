import React from 'react'
import './style.scss'
import { HeroBanner } from './heroBanner/HeroBanner'
import { Trending } from './trending/Trending'
import { Popular } from './popular/Popular'
import ContentWrapper from '../../components/contentWrapper/ContentWrapper'
import { TopRated } from './topRated/topRated'
import { Header } from '../../components/Header/Header'
import { Footer } from '../../components/Footer/Footer'

export const Home = () => {
  return (
    <>
      <Header/>
      <div className='homePage'>
      <HeroBanner/>
      <Trending/>
      <Popular/>
      <TopRated/>
    </div>
    <Footer/>
    </>
  )
}
