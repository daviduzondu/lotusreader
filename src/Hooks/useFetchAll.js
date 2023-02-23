import { useState, useEffect } from 'react';

function useFetchAll(type, page = 1) {
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        fetch(`https://node-hnapi.herokuapp.com/${type}?page=${page}`)
            .then(response => response.json())
            .then(data => {
                setLoading(false);
                setNews(news => [...news, ...data])
            })
            .catch(error => console.log(error));
    }, [page]);
    // console.log(news);

    return { news, type, loading };
}

export default useFetchAll;
