import React from 'react'
import { useEffect, useState } from 'react'
function useFetchPosts(status, pages, currentPage) {
    useEffect(() => {
        if (status === true) {
            fetchPosts(currentPage);
        }
    }, [currentPage, status])
    function fetchPosts(currentPage) {
        // console.log(pages[currentPage])
        pages[currentPage].map((item_id) => {
            try {
                fetch(`http://hn.algolia.com/api/v1/items/${item_id}`)
                    .then(res => {
                        return res.json();
                    })
                    .then(data => console.log(data))
            } catch (e) {
            }
        })
    }
    return (null
    )
}

export default useFetchPosts