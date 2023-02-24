import React from 'react'
import { FaArrowCircleUp, FaComments, FaRegClock } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { BsBoxArrowInUpRight } from 'react-icons/bs'
function PostCard({ item }) {


    return (
        <Link to={`/item/${item.id}`} target="_blank">
            <div className='flex hover:cursor-pointer hover:bg-blue-50 border border-t-0 border-b-1 border-r-1 border-gray-700 px-3'>
                <div key={item.id} className='w-full my-2 '>
                    <div className='post-info flex w-full items-center'>
                        <span className='md:text-sm text-base md:p-2 font-bold mr-4 flex-1 w-max'><span className='hover:underline'>{item.user}</span></span>
                        {(item.domain) && <div className='md:hover:underline text-white md:p-0 p-2 md:bg-inherit md:text-blue-900 bg-blue-900 font-semibold md:text-sm text-sm mb-2 w-fit rounded-lg' onClick={() => window.open(item.url)}>{item.domain} <BsBoxArrowInUpRight className='inline' /></div>}
                    </div>
                    <div className='md:text-lg text-2xl md:font-normal font-bold mb-2'>{item.title}</div>
                    <div className='flex'>
                        <div className='flex items-center post-stat w-full '>
                            <span className='flex items-center text-base w-1/6'><FaArrowCircleUp className='mr-2 text-base' />{item.points ? item.points : '0'}</span>
                            <span className='flex items-center text-base w-1/6'><FaComments className='mr-2 text-base' />{item.comments_count ? item.comments_count : '0'}</span>
                            <span className='flex items-center text-base '><FaRegClock className='mr-2 text-base' />{item.time_ago}</span>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default PostCard